const roundLength = 2
var remaining = roundLength
var running = false
var fallbackSound = new Audio("fallingback.oga")
var whooshSound = new Audio("whoosh.mp3")
var orphixCount = 1
var activePattern = "A"
var patternTextA = "(123) 321 123"
var patternTextB = "(123) 312 213"
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
	if (remaining < 0) {
		remaining = roundLength
		orphixCount = orphixCount + 1
		updateCurrentNextSpawn()
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
	remaining = roundLength
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
	updateCurrentNextSpawn()
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

document.getElementById("toggle").addEventListener('click', toggleTimer)
document.getElementById("togglePattern").addEventListener('click', togglePattern)

updateTime(remaining)