const roundLength = 90
var remaining = roundLength
var running = false
var fallbackSound = new Audio("fallingback.oga")
var whooshSound = new Audio("whoosh.mp3")
var orphixCount = 1
var activePattern = "A"
var patternTextA = "Pattern: (123) 321 123"
var patternTextB = "Pattern: (123) 312 213"
var rotationsIntial = [1, 2, 3]
var rotationsA = [3, 2, 1, 1, 2 , 3]
var rotationsB = [3, 1, 2, 2, 1 , 3]

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
	if (remaining < 1) {
		resetTime()
		orphixCount = orphixCount + 1
		updateView()
	}
	if (remaining == 15) {
		fallbackSound.play()
	}
	if (remaining < 5) {
		whooshSound.play()
	}

	updateView()
}

function resetTime() {
	remaining = roundLength
	updateView()
}

function startTimer() {
	resetTime()
	interval = setInterval(tick, 1000)
	running = true
	document.getElementById("button").innerHTML = "Stop"
}

function stopTimer() {
	clearInterval(interval)
	resetTime()
	orphixCount = 1
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

function togglePattern() {
	if (activePattern == "A") {
		activePattern = "B"
	} else {
		activePattern = "A"
	}
	setPatternText()
	updateView()
}

function setPatternText() {
	if (activePattern == "A") {
		document.getElementById("patternText").innerHTML = patternTextA
	} else {
		document.getElementById("patternText").innerHTML = patternTextB
	}
}

function updateCurrentNextSpawn() {
	var pattern
	if (activePattern == "A") {
		pattern = rotationsA
	} else {
		pattern = rotationsB
	}

	var current
	var next
	// Current spawn
	if (orphixCount <= 3) {
		current = rotationsIntial[orphixCount - 1]
	} else {
		i = (orphixCount - 3) % 6
		current = pattern[i]
	}
	
	// Next spawn
	if (orphixCount < 3) {
		next = rotationsIntial[orphixCount]
	} else {
		i = (orphixCount - 3) % 6 + 1
		if (i > 5) {
			i = 0
		}
		next = pattern[i]
	}

	// Update text
	document.getElementById("current").innerHTML = current
	document.getElementById("next").innerHTML = next
}

function updateOrphixCount() {
	document.getElementById("orphixDestroyed").innerHTML = orphixCount - 1
}

function updateView() {
	updateCurrentNextSpawn()
	updateOrphixCount()
	updateTime(remaining)
}

function sync() {
	clearInterval(interval)
	remaining = roundLength - 1
	interval = setInterval(tick, 1000)
	updateTime(remaining)
}

function plusOrphixDestroyed() {
	orphixCount = orphixCount + 1
	updateView()
}

function minusOrphixDestroyed() {
	orphixCount = orphixCount - 1
	if (orphixCount < 1) {
		orphixCount = 1
	}
	updateView()
}


document.getElementById("toggle").addEventListener('click', toggleTimer)
document.getElementById("togglePattern").addEventListener('click', togglePattern)
document.getElementById("sync").addEventListener('click', sync)
document.getElementById("plusDestroyed").addEventListener('click', plusOrphixDestroyed)
document.getElementById("minusDestroyed").addEventListener('click', minusOrphixDestroyed)

updateTime(remaining)