const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");

let width, height;
const snowflakes = [];

function resizeCanvas() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
}

function createSnowflake() {
	return {
		x: Math.random() * width ,
		y: Math.random() * height,
		radius: Math.random() * 4 + 2,
		speed: Math.random() * 1 + 0.5,
		opacity: Math.random(),
	};
}

function updateSnowflakes() {
	snowflakes.forEach((flake) => {
		flake.y += flake.speed;
		if (flake.y > height) {
			flake.y = -flake.radius;
			flake.x = Math.random() * width;
		}
	});
}

function drawSnowflakes() {
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "white";
	snowflakes.forEach((flake) => {
		ctx.beginPath();
		ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
		ctx.globalAlpha = flake.opacity;
		ctx.fill();
	});
	ctx.globalAlpha = 1.0; // Reset przezroczystości
}

function loop() {
	updateSnowflakes();
	drawSnowflakes();
	requestAnimationFrame(loop);
}

function init() {
	resizeCanvas();
	snowflakes.length = 0;
	for (let i = 0; i < 150; i++) {
		snowflakes.push(createSnowflake());
	}
	loop();
}


window.addEventListener("resize", resizeCanvas);
init();
