/**
 * Created by stavr on 18-Jan-17.
 */


const converter = require("../core/converter");
const {dialog} = require('electron').remote;

const vCardFileInput = document.getElementById("vCardFileInput");

var fs = require('fs');

let output;
let input;
let results;

function saveDestination() {


    dialog.showSaveDialog(function (outputFileName) {
            if (outputFileName === undefined) return;
            output = outputFileName;
            const saveFile = document.getElementById("convert");
            saveFile.style.display = "block";
        }
    )
}

function openFile() {

    dialog.showOpenDialog(function (fileNames) {

        if (fileNames === undefined) return;

        const saveFile = document.getElementById("saveFile");
        saveFile.style.display = "block";

        input = fileNames[0];


    });

}

function convert() {


    results = converter.vCardTCSV(input, output + ".csv");


    document.getElementById("success").innerHTML =
        "Contancts converted: " + results.success + "/" + results.total;

    document.getElementById("errors").innerHTML = "Errors occured: " + results.errors;

    var errList = "";
    for (var i = 0; i < results.errorList.length; i++) {
        errList += "<li>" + results.errorList[i] + "</li>";
    }

    document.getElementById("errorList").innerHTML = errList;


}
