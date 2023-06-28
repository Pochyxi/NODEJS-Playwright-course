const fs = require ( 'fs' );
const path = require ( 'path' );
const {resolve} = require ( "path" );
const {exec} = require ( "child_process" );

function copyAndRenameTrace() {
    let baseDestinationFolder = "./myTraces";
    const testOriginPath = "./test-results";
    let arrOfTraceNames = getSubfolderNames(testOriginPath);
    let arrOfTracesToOpen = [];

    for (const originalPath of arrOfTraceNames) {
        const currentDate = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        // @ts-ignore
        const formatter = new Intl.DateTimeFormat('it-IT', options);
        const formattedDate = formatter.format(currentDate).split('/');
        const year = formattedDate[2].split(",")[0];
        const month = formattedDate[1];
        const day = formattedDate[0];
        // @ts-ignore
        const time = formattedDate[2].split(",")[1].trim().replaceAll(':', '-');
        const destinationFolder = path.join(baseDestinationFolder, originalPath);
        const datePath = path.join(destinationFolder, year, month, day);
        if (!fs.existsSync(datePath)) {
            fs.mkdirSync(datePath, { recursive: true });
        }

        const folderName = path.basename(path.dirname("./test-results/" + originalPath + "/trace.zip"));
        const newFileName = `${folderName}___${year}-${month}-${day}___${time}`;
        const newPath = path.join(datePath, newFileName);

        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath);
        }

        fs.readdirSync(path.join("./test-results", originalPath)).forEach(file => {
            const extension = path.extname(file);

            if (['.zip', '.png', '.webm'].includes(extension)) {
                const newFile = path.join(newPath, path.basename(file));
                const oldFile = path.join("./test-results", originalPath, file);
                arrOfTracesToOpen.push(newFile);

                fs.copyFile(oldFile, newFile, (error) => {
                    if (error) {
                        console.error(`Errore durante la copia del file: ${error}`);
                        return;
                    }
                    console.log(`Traccia copiata e rinominata come: ${newFile}`);
                });
            }
        });
    }

    // console.log(arrOfTracesToOpen);
    // // ora si spiega l'errore che appare in console
    // for (const filePath of arrOfTracesToOpen) {
    //     if (filePath.endsWith('.zip')) {
    //         openTraces(filePath);
    //     }
    // }


}

function openTraces(filePath) {
    setTimeout ( () => {
        const command = 'npx playwright show-trace ' + filePath
        const options = {
            cwd : resolve ( __dirname , '../' ) ,
        };

        const childProcess = exec ( command , options );

        childProcess.stdout.on ( 'data' , (data) => {
            console.log ( `Output del comando:\n${ data }` );
        } );

        childProcess.stderr.on ( 'data' , (data) => {
            console.error ( `Errore durante l'esecuzione del comando:\n${ data }` );
        } );

        childProcess.on ( 'close' , (code) => {
            console.log ( `Completato con codice di uscita ${ code }` );
        } );
    } , 3000 )
}

function getSubfolderNames(destinationFolder) {
    const folderNames = [];

    fs.readdirSync ( destinationFolder ).forEach ( (item) => {
        const itemPath = path.join ( destinationFolder , item );
        if ( fs.statSync ( itemPath ).isDirectory () ) {
            folderNames.push ( item );
        }
    } );

    return folderNames;
}


module.exports = {
    copyAndRenameTrace
}



