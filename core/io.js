/**
 * Created by stavr on 17-Jan-17.
 */

'use strict';

const fs = require('fs');

exports.readvCard = (filename) => {

    return fs.readFileSync(filename, 'utf8');
};

exports.writeCSV = (filename, data) => {
    let cvsFile = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i][0]) {

            cvsFile += data[i][0] + "," + data[i][1] + "\n";
        }
    }
    fs.writeFileSync(filename, cvsFile, 'utf8');

};

exports.writeLogFile = (filename,data, options) => {
    fs.writeFileSync(filename, data, options);
};