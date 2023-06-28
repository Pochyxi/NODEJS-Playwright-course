const {resolve} = require("path");
const {exec} = require("child_process");
// const {copyAndRenameTrace} = require("./traceManager.ts");



/**
 * Esegue tutti i test o un singolo test all'interno dei file .spec.js situati nella cartella /tests
 * @param {String} testName - Il nome del file o del singolo test da eseguire
 * @param {Boolean} {single} - Default false - Specifica se il nome dato è un singolo test oppure un file
 * @param {Boolean} {show} - Default false - Se specificato apre la finestra e visualizza il test in esecuzione
 * PREREQUISITI - Login
 */

executeTest(
    "example",
    {
        show: true,
        single: false
    })

function executeTest(testName, params) {
    let checkedSingle = params?.single ? params.single : false
    let checkedShow = params?.show ? params.show : false

    if (checkedSingle) {
        let conditionalTestName = checkedShow ? testName + " --reporter=allure-playwright,line,./my-awesome-reporter.ts" + " --headed" : testName + " --reporter=allure-playwright,line,./my-awesome-reporter.ts"
        console.log("ESEGUO SINGOLO TEST DI NOME '" + testName + "'")
        executeTestCommand("test -g " + conditionalTestName)
        console.log("Eseguo comando -> " + "test " + conditionalTestName)
    } else {
        let conditionalTestName = checkedShow ? testName + " --reporter=allure-playwright,line,./my-awesome-reporter.ts" + " --headed" : testName + " --reporter=allure-playwright,line,./my-awesome-reporter.ts"
        console.log("ESEGUO TUTTI I TEST NEL GRUPPO TEST DI NOME '" + testName + "'")
        executeTestCommand("test " + conditionalTestName)
        console.log("Eseguo comando -> " + "test " + conditionalTestName)
    }

}

function executeTestCommand(pwCommand) {
    const command = 'npx playwright ' + pwCommand
    const options = {
        cwd: resolve(__dirname, '../'),
    };

    const childProcess = exec(command, options);

    childProcess.stdout.on('data', (data) => {
        console.log(`Output del comando:\n${data}`);
    });

    childProcess.stderr.on('data', (data) => {
        console.error(`Errore durante l'esecuzione del comando:\n${data}`);
    });

    childProcess.on('close', (code) => {
        console.log(`Completato con codice di uscita ${code}`);

        executeAllureReport()
    });
}

function executeAllureReport() {
    // const command = "npm run allure-report"

    const command = "npx allure generate ./allure-results --clean"

    const childProcess = exec(
        command,
        {
            cwd: resolve(__dirname, '../'),
        });

    childProcess.stdout.on('data', (data) => {
        console.log(`Output del comando:\n${data}`);
    });

    childProcess.stderr.on('data', (data) => {
        console.error(`Errore durante l'esecuzione del comando:\n${data}`);
    });

    childProcess.on('close', (code) => {
        console.log(`Completato con codice di uscita ${code}`);

        // executeCommand("npx allure open")
        // copyAndRenameTrace()
    });
}

function executeCommand(command) {

    const options = {
        cwd: resolve(__dirname, '../'),
    };

    const childProcess = exec(command, options);

    childProcess.stdout.on('data', (data) => {
        console.log(`Output del comando:\n${data}`);
    });

    childProcess.stderr.on('data', (data) => {
        console.error(`Errore durante l'esecuzione del comando:\n${data}`);
    });

    childProcess.on('close', (code) => {
        console.log(`Completato con codice di uscita ${code}`);
    });
}



