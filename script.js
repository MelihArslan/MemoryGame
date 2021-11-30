// Checken of 'infoPuzzel' bestaat
if (document.getElementById("infoPuzzel")) {
	// Als er op infoPuzzel word geklikt word de functie showhide() uitgevoerd
	document.getElementById("infoPuzzel").addEventListener("click", showhide);
}
function showhide() {
	// De lijst die gehide of geshowed moet worden opslaan in 'lijst'
	var lijst = document.getElementById("puzzelLijst");
	// Standaard is de display "". Later kan dit worden gewijzigd naar 'block'
	if (lijst.style.display === "" || lijst.style.display === "block") {
		// Dsisplay naar 'none' zetten 
		lijst.style.display = "none";
		console.log(lijst.style.display);
	} else {
		// Dsisplay naar 'block' zetten 
		lijst.style.display = "block";
		console.log(lijst.style.display);
	}
}

// De variabele moet globaal gescoped zijn zodat deze bestaat als changeColor() niet aan het runnen is
var selectedRow;
function changeColor(row) {
	// Als 'selectedRow' nog geen waarde heeft
	if (selectedRow === undefined) {
		// Maak dan de achtergrond van de rij blauw
		row.style.backgroundColor = "blue";
		// De huidige rij opslaan in selectedRow. 'row' bestaat alleen in de functie
		selectedRow = row;
	// Als selectedRow hetzelfde is als de huidige rij
	} else if (row === selectedRow) {
		// Maak dan de achtergrond van de rij niks
		 row.style.backgroundColor = "";
		 // Aangeven dat er geen rij meer geselecteerd is zodat er een nieuwe rij geselecteerd kan worden
		 selectedRow = undefined;
	// Als er al een rij is geselecteer die niet overeenkomt met de huidige geslecteerde rij
	} else if (row != selectedRow) {
		// Verwijder de kleur van de huidige rij
		selectedRow.style.backgroundColor = "";
		// Maak de kleur van de nieuwe geselecteerde rij blauw
		row.style.backgroundColor = "blue";
		// Schrijf de geselecteerde rij over
		selectedRow = row;
	}
}


let kaartFlipped = false;
let slot = false;
let eersteKaart, tweedeKaart;
// Een lijst met kaarten opslaan in 'kaarten' 
const kaarten = document.querySelectorAll(".kaart");
// Stap 1: Voor elke kaart wordt er naar een click event geluisterd en verwezen naar flipKaart()
kaarten.forEach(kaart => kaart.addEventListener('click', flipKaart));

function flipKaart() {
	// Als 'slot' true is dan mag er niet weer geflipped worden dus functie word beeindigd
	if(slot) return;
	// Voegt een class toe die 'flip' heet
	this.classList.add('flip');

	// Als 'kaartFlipped' false is (als er nog geen kaart is geflipped)
	if(!kaartFlipped) {
		kaartFlipped = true;
		eersteKaart = this;
	} else {
		// Als 'kaartFlipped' niet false is (als er al een kaart is geflipped)
		if (eersteKaart === this) {
			// Verwijde flip class
			this.classList.remove('flip');
			// Kaartflipped weer terug naar false omdat er geen kaart meer is geflipped, oude kaart is teruggedraaid
			kaartFlipped = false;
			return;
		} // Wellicht later de manier verbeteren. Heus wel een manier waarop ik geen nested if statement nodig heb, too lazy atm :P

		kaartFlipped = false;
		tweedeKaart = this;
		checkMatch();
	}
}

function checkMatch() {
	// Als de data-framework attribuut in HTML van de eerste en de tweede kaart hetzelfde zijn
	if (eersteKaart.dataset.framework === tweedeKaart.dataset.framework) {
		// De event listeners voor click verwijderen van de kaarten
		eersteKaart.removeEventListener('click', flipKaart);
		eersteKaart.removeEventListener('click', flipKaart);
	} else { // Als het niet hetzelfde zijn
		 // Zet 'slot' op true (zodat er tussen de timeout niet weer geflipped kan worden)
		slot = true;
		// Voort de volgende functie uit na een timeout van 750ms
		setTimeout(() => {
			// Als het aparte kaarten zijn, verwijder de flip class voor beide kaarten
			eersteKaart.classList.remove('flip');
			tweedeKaart.classList.remove('flip');
			// Zet 'slot' weer op false (zodat er weer geflipped kan worden)
			slot = false;
		}, 750);
	}
}

// Immediatly Invoked Function Expression. Functie word gelijk uitgevoerd.
(shuffle = function() {
	// Voor elke kaart
	kaarten.forEach(kaart => {
		// Sla een willekeurige getal tussen 1 en 12 in 'randomPos'
		let randomPos = Math.floor(Math.random() * 12);
		kaart.style.order = randomPos;
	});
})()

document.getElementById("herstartKnop").addEventListener("click", () => {
	
	// Als eersteKaart bestaat verwijder de flip class
	if (eersteKaart) {
		eersteKaart.classList.remove('flip');
	}
	// Als tweedeKaart bestaat verwijder de flip class
	if (tweedeKaart) {
		tweedeKaart.classList.remove('flip');
	}
	// Er is geen kaart geflipped dus, kaartFlipped op false
	kaartFlipped = false;
	// Slot op false zodat gebruiker kan spelen
	slot = false;
	// Opnieuw shufflen na 750 ms, anders zie je de kaart terug flipped op de nieuwe random positie
	setTimeout(() => {
		shuffle();
	}, 750)
	
})

// MISLUKTE POGINGEN :P
// var alleKaarten = document.getElementById("kaarten").rows;
// console.log(alleKaarten);
// for (var i = 0; i < alleKaarten.length; i++) {
// 	var huidigeRij = alleKaarten[i];
// 	for (var index = 1; index < huidigeRij.children.length + 1; index++) {
// 		var kaart = huidigeRij.children[index];
// 		console.log(index);
// 	}
// }

// if(document.getElementsByClassName("hofRij")) {
// 	var hofRij = document.getElementsByClassName("hofRij")
// 	console.log(hofRij)
// 	for (var i = 0; i < hofRij.length; i++) {
// 		hofRij[i].addEventListener("click", () => {
// 			console.log(i);
// 		})
// 	}
// }

// Bron: https://www.youtube.com/watch?v=ZniVgo8U7ek. Deze video meer gebruikt om een idee te krijgen voor de logica. Uiteindelijk voor een grote deels zelf verwerkt.
// Hierom ook veel comments tussen de codes. Om te laten zien dat ik daadwerkelijk dit begrijp. Ook geniet ik erg veel van JS!