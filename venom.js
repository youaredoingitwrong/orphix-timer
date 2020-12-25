var remaining = 90
var running = false
var fallbackSound = new Audio("fallingback.oga")
var whooshSound = new Audio("whoosh.mp3")

function pad(num) {
	let s = "0" + num;
	return s.substr(s.length-2);
}

function updateTime(secondsLeft) {
	let minutes = Math.floor(secondsLeft/60)
	let seconds = secondsLeft % 60
	document.getElementById("timer").innerHTML = pad(minutes) + ":" + pad(seconds)
}

function tick() {
	remaining = remaining - 1
	if (remaining < 0) {
		remaining = 90
	}
	if (remaining == 15) {
		fallbackSound.play()
	}
	if (remaining < 5) {
		whooshSound.play()
	}

	updateTime(remaining)
}

function resetTime() {
	remaining = 90
	updateTime(remaining)
}

function startTimer() {
	resetTime()
	interval = setInterval(tick, 1000)
	running = true
	document.getElementById("button").innerHTML = "Reset"
}

function stopTimer() {
	clearInterval(interval)
	resetTime()
	running = false
	document.getElementById("button").innerHTML = "Start"
}

function toggleTimer() {
	if (running) {
		stopTimer()
	} else {
		startTimer()
	}
}

document.getElementById("toggle").addEventListener('click', toggleTimer)