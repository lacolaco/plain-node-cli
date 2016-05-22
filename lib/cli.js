const program = require('commander');
const md2html = require('./md2html');

const DEFAULT_OPTIONS = {
    gfm: true,
    breaks: false,
    sanitize: false,
};

function exec(args) {
    program
        .usage('[options] <file>')
        .option('-n --no-gfm', 'Use plain markdown parser')
        .option('-b --breaks', 'Enable GFM line breaks')
        .option('-s --sanitize', 'Ignore any HTML')
        .parse(args);
    
    if (program.args.length !== 1) {
        console.error(`Too much inputs: ${program.args}`);
        process.exit(1);
        return;
    }
    const options = Object.assign({}, DEFAULT_OPTIONS, {
        gfm: !program.noGfm,
        breaks: program.breaks,
        sanitize: program.sanitize,
    });
    md2html.convert(program.args[0], options)
        .then(html => {
            console.log(html);
        })
        .catch(error => {
            console.error(error.message);
        });
}

exports.exec = exec;
