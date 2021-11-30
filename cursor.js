const cursorTag = document.querySelector("div.cursors");
const balls = cursorTag.querySelectorAll("div");
// Alles classes met als naam kaart opslaan in images
const images = document.querySelectorAll(".kaart");
const span = document.getElementById("onHover");

let aimX = 0;
let aimY = 0;

balls.forEach((ball, index) => {
	let currentX = 0;
	let currentY = 0;
	let speed = 0.3 - index * 0.015;

	const animate = function() {
		currentX += (aimX - currentX) * speed;
		currentY += (aimY - currentY) * speed;

		ball.style.left = currentX + "px";
		ball.style.top = currentY + "px";

		requestAnimationFrame(animate);
	}
	animate();
})

document.addEventListener("mousemove", (e) => {
	aimX = e.pageX;
	aimY = e.pageY;
})

// Voor elke element die kaart als class heeft luisteren naar een mouseover en mouseout
images.forEach(image => { 
	image.addEventListener("mouseover", () => {
		// Verander de innerHTML van span naar klik hier!
		span.innerHTML = "Klik hier!";
	})

	image.addEventListener("mouseout", () => {
		// Verander de innerHTML van span naar niks
		span.innerHTML = "";
	})
})

// De trail vond ik wel mooi om erbij toe te voegen, qua CSS zijn er nog wat punten wat ik hierover niet goed begrijp
// De trail is niet vereist hierom heb ik geen uitleg gegeven om te bewijzen dat ik het begrijp
// Bron: https://www.youtube.com/watch?v=uprZMdVl-aQ