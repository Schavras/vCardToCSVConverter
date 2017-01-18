/**
 * Created by stavr on 17-Jan-17.
 */

const io = require('./io');

exports.vCardTCSV = (input, output) => {
    const vCard = io.readvCard(input);
    var contacts = splitContacts(vCard);
    // console.log(contacts);
    var result = [];
    var  errors = 0;
    var errorList = [];
    for (var i = 0; i < contacts.length; i++) {

        var tempEmail = extractEmail(contacts[i]);
        result[i] = [];
        if (validateEmail(tempEmail)) {

            result[i].push(tempEmail);
            result[i].push(extractName(contacts[i]));
        } else {
            errorList.push(contacts[i]);
            errors++;
        }

    }

    // console.log("Success: "+ (result.length - errors) + "/" + contacts.length);
    // // console.log("Results: "+result.length);
    // console.log("Errors: "+ errors);
    // console.log(errorList);

    io.writeCSV(output, result);
    var resultJSON = {};
    resultJSON.total = result.length;
    resultJSON.success = result.length - errors;
    resultJSON.errors = errors;
    resultJSON.errorList = errorList;
    // console.log(resultJSON);
    io.writeLogFile("./log.json",JSON.stringify(resultJSON),'utf8');
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
    return " ";
};