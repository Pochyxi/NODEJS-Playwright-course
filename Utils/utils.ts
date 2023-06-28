const {exec} = require('child_process');
const {resolve} = require("path");
const {copyAndRenameTrace} = require('./traceManager')
const {expect} = require("@playwright/test");

function executePlayWrightCommand(pwCommand) {
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
    });
}

function showReport() {
    executePlayWrightCommand("show-report --port=0")
}

function showUiTestRunner() {
    executePlayWrightCommand("test --ui")
}

function showTraces() {
    console.log("SI RICORDA DI RICERCARE LA CARTELLA 'myTraces' nel finder")
    executePlayWrightCommand("show-trace")
}

function execCodeGen() {
    executePlayWrightCommand("codegen")
}


async function checkWhileConditionAndExpect(page, cssSelector, propertyToCheck, propertyToCompare, exepectationCheck = true) {
    let count = 0
    while (true) {
        console.log("Eseguo verifica della presenza del selettore [" + cssSelector + "] e il contenuto del suo [" + propertyToCheck + "] che deve essere uguale a [" + propertyToCompare + "]")
        console.log("Check numero '" + count + "'")

        await page.waitForTimeout(3000)
        console.log("Attesa di 3 secondi avvenuta")

        let checkValue = await page.$eval(
            cssSelector,
            (el, {pTCh, pTCo}) => el[pTCh] === pTCo,
            {pTCh: propertyToCheck, pTCo: propertyToCompare}
        )

        console.log("Il risultato della verifica è '" + checkValue + "'")

        count++

        if (count < 6 && checkValue) {
            console.log("Preverifica effettuata, eseguo expect e chiudo la verifica")
            if (exepectationCheck) {
                await expect(await page.$eval(
                    cssSelector,
                    (el, pTCh) => el[pTCh],
                    propertyToCheck
                )).toBe(propertyToCompare)
            }

            break
        } else if (count === 6 && !checkValue) {
            throw new Error("Value " + propertyToCheck + " non trovato")
        }
    }
}

module.exports = {
    showUiTestRunner,
    executePlayWrightCommand
};
