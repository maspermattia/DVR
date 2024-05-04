
var costanti = [[30,20],[20,15]];
var altezze = [0.78, 0.85, 0.93, 1.00, 0.93, 0.85, 0.78, 0.00];
var dislocazioni = [1.00, 0.97, 0.93, 0.91, 0.88, 0.87, 0.85, 0.00];
var distanze = [1.00, 0.83, 0.63, 0.50, 0.45, 0.42, 0.00];
var angoli = [1.00, 0.90, 0.81, 0.71, 0.62, 0.57, 0.00];
var prese = [1.00, 0.90];
var frequenze = [[1.00, 0.94, 0.84, 0.75, 0.52, 0.37, 0.00],
                 [0.95, 0.88, 0.72, 0.50, 0.30, 0.21, 0.00],
                 [0.85, 0.75, 0.45, 0.27, 0.15, 0.00, 0.00]];
var valori = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];

function calcola(){
    var eta = document.querySelector('input[name="eta"]:checked').value;
    valori[0] = document.querySelector('input[name="eta"]:checked').dataset.text;
    var sesso = document.querySelector('input[name="sesso"]:checked').value;
    valori[1] = document.querySelector('input[name="sesso"]:checked').dataset.text;
    var costante = costanti[eta][sesso];
    var altezza = altezze[document.getElementById("altezza").value];
    valori[2] = document.getElementById("altezza").options[document.getElementById("altezza").selectedIndex].text;
    var dislocazione = dislocazioni[document.getElementById("dislocazione").value];
    valori[3] = document.getElementById("dislocazione").options[document.getElementById("dislocazione").selectedIndex].text;
    var distanza = distanze[document.getElementById("distanza").value];
    valori[4] = document.getElementById("distanza").options[document.getElementById("distanza").selectedIndex].text;
    var angolo = angoli[document.getElementById("angolo").value];
    valori[5] = document.getElementById("angolo").options[document.getElementById("angolo").selectedIndex].text;
    var presa = prese[document.querySelector('input[name="presa"]:checked').value];
    valori[6] = document.querySelector('input[name="presa"]:checked').dataset.text;
    var frequenza = document.getElementById("frequenza").value;
    valori[7] = document.getElementById("frequenza").options[document.getElementById("frequenza").selectedIndex].text;
    var durata = document.querySelector('input[name="durata"]:checked').value;
    valori[8] = document.querySelector('input[name="durata"]:checked').dataset.text;
    var relazione = frequenze[durata][frequenza];
    var peso = document.getElementById("peso").value;
    valori[9] = document.getElementById("peso").value;
    
    var limite = costante * altezza * dislocazione * distanza * angolo * presa * relazione;
    var risultato = peso/limite;
    document.getElementById("risultato").innerHTML = risultato;
    document.getElementById("pdf").disabled = false;
}

function createPdf() {
    var doc = new jsPDF();
    
    // Aggiungiamo uno sfondo colorato al titolo con bordi arrotondati
    doc.setFillColor(26, 138, 219);
    doc.setDrawColor(255, 255, 255);
    doc.roundedRect(10, 10, 190, 15, 3, 3, 'F');
    
    // Aggiungiamo il titolo con un font più grande e in grassetto
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.setFontStyle('bold');
    doc.text(20, 20, 'Dati del form:');
    
    var formData = new FormData(document.querySelector('form'));
    var data = {};
    for (var [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    var yPos = 35;
    var i = 0;
    doc.setFontSize(14); // Aumentiamo la dimensione del font per i dati
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            // Coloriamo alternativamente le righe per una migliore leggibilità
            if (i % 2 === 0) {
                doc.setFillColor(240, 240, 240);
                doc.roundedRect(10, yPos - 7, 190, 10, 3, 3, 'F');
            }
            doc.setTextColor(0, 0, 0);
            doc.text(20, yPos, key + ': ');
            
            // Utilizziamo un colore diverso per i valori
            doc.setTextColor(26, 138, 219);
            doc.text(60, yPos, valori[i++]);
            
            yPos += 13;
        }
    }
  
    var indiceRischio = calcolaIndiceRischio(data); // Funzione da implementare
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(20, yPos, 'Indice di Rischio:');
    doc.setTextColor(255, 0, 0);
    doc.text(70, yPos, indiceRischio.toFixed(2));
    
    doc.save('risultato.pdf');
}



function calcolaIndiceRischio(data) {
    var eta = parseInt(data['eta']);
    var sesso = data['sesso'];
    var costante = costanti[eta][sesso];
    var altezza = altezze[data['altezza']];
    var dislocazione = dislocazioni[data['dislocazione']];
    var distanza = distanze[data['distanza']];
    var angolo = angoli[data['angolo']];
    var presa = prese[data['presa']];
    var frequenza = frequenze[data['durata']][data['frequenza']];
    var peso = parseInt(data['peso']);
    
    var limite = costante * altezza * dislocazione * distanza * angolo * presa * frequenza;
    return peso / limite;
}
