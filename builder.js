/**
 * Created by stavr on 19-Jan-17.
 */


// var electronInstaller = require('electron-winstaller');
//
// resultPromise = electronInstaller.createWindowsInstaller({
//     appDirectory: './dist/win-unpacked',
//     outputDirectory: './dist/build/installer64',
//     authors: 'Lizard Solutions',
//     exe: 'vCardToCSV.exe',
//     name: 'vCardToCSV',
//     iconUrl: 'https://raw.githubusercontent.com/Schavras/vCardToCSVConverter/master/assets/win/logo.ico',
//     setupIcon: "./build/icon.ico",
// });
//
// resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));

const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')
const rimraf = require('rimraf')

deleteOutputFolder()
    .then(getInstallerConfig)
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig () {
    const rootPath = path.join(__dirname, '.')
    const outPath = path.join(rootPath, 'out')

    return Promise.resolve({
        appDirectory: path.join(outPath, 'vCardToCSV-win32-ia32'),
        iconUrl: 'https://raw.githubusercontent.com/Schavras/vCardToCSVConverter/master/assets/win/logo.ico',

        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        setupExe: 'vCardToCSV.exe',
        setupIcon: path.join(rootPath, 'build', 'icon.ico'),
        skipUpdateIcon: true
    })
}

function deleteOutputFolder () {
    return new Promise((resolve, reject) => {
        rimraf(path.join(__dirname, '..', 'out', 'windows-installer'), (error) => {
            error ? reject(error) : resolve()
        })
    })
}