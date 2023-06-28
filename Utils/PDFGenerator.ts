const PDFDocument = require('pdfkit');
const fs = require('fs');

// Crea un nuovo documento
const doc = new PDFDocument();

// Imposta un flusso di scrittura per salvare il PDF
const stream = fs.createWriteStream('output.pdf');
doc.pipe(stream);

// Aggiungi del testo al documento
doc.text('Ciao, mondo!', 100, 100);

// Termina il documento PDF
doc.end();

// Il PDF verrà salvato quando il flusso di scrittura viene chiuso
stream.on('finish', function() {
    console.log('PDF salvato in output.pdf');
});