/**
 * Created by stavr on 17-Jan-17.
 */

const io = require('./io');

exports.vCardTCSV = (input, output) => {
    const vCard = io.readvCard(input);
    var contacts = splitContacts(vCard);
    // console.log(contacts);
    var result = [["email", "name"]];
    var errors = 0;
    var errorList = [];
    var nameField;
    for (var i = 0; i < contacts.length; i++) {

        var tempEmail = extractEmail(contacts[i]);
        result[i + 1] = [];
        if (validateEmail(tempEmail)) {

            result[i + 1].push(tempEmail);
            nameField = extractName(contacts[i]);
            if (nameField) {
                result[i + 1].push(nameField);
            } else {
                result[i + 1].push(tempEmail);
            }
        } else {
            errorList.push(contacts[i]);
            errors++;
        }

    }


    io.writeCSV(output, result);
    var resultJSON = {};
    resultJSON.total = result.length - 1;
    resultJSON.success = result.length - errors - 1;
    resultJSON.errors = errors;
    resultJSON.errorList = errorList;
    // console.log(resultJSON);
    io.writeLogFile("./log.json", JSON.stringify(resultJSON), 'utf8');
    return resultJSON;

};

var splitContacts = (rawData)=> {
    var conntacts = rawData.split("END:VCARD");
    conntacts.pop();
    return conntacts;
};

var extractEmail = (input) => {
    // input = input.replace(" \n\n","\n");
    let infos = input.split("\n");

    var data = [];
    var tempEmail;
    for (var i = 0; i < infos.length; i++) {
        if (infos[i].startsWith("EMAIL")) {
            tempEmail = infos[i].substring(infos[i].indexOf(":") + 1);
            tempEmail = tempEmail.replace("\r", "");
            tempEmail = tempEmail.replace("\n", "");

            return tempEmail;
        }
    }
    // console.log(infos);
    return " ";
};

var validateEmail = (email)=> {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regex)) {
        return true;
    } else {
        return false;
    }
};

var extractName = (input) => {
    let infos = input.split("\n");
    var data = [];
    var tempEmail;
    for (var i = 0; i < infos.length; i++) {
        if (infos[i].startsWith("FN")) {
            tempEmail = infos[i].substring(infos[i].indexOf(":") + 1);

            tempEmail = tempEmail.replace("\r", "");
            tempEmail = tempEmail.replace("\n", "");
            return tempEmail;
        }
    }
    return false;
};