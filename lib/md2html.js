const fs = require('fs');
const marked = require('marked');

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (error, data) => {
            if (!!error) {
                reject(error);
                return;
            }
            resolve(data.toString());
        });
    });
}

function mdToHTML(md, options) {
    return marked(md, options);
}

function convert(filePath, options) {
    return readFile(filePath)
        .then(str => mdToHTML(str, options));
}

exports.convert = convert;