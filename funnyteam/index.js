// waitsInRow: how many turns the particular dev has had to skip, waiting for others, or other reason
//
//
var team = [
 { name: "steve", "responsibleFor": undefined, waitsInRow: 0, waitsTotalSprint: 0},
 { name: "adam", "responsibleFor": undefined, waitsInRow: 0, waitsTotalSprint: 0},
 { name: "amy", "responsibleFor": undefined, waitsInRow: 0, waitsTotalSprint: 0},
 { name: "mia", "responsibleFor": undefined, waitsInRow: 0, waitsTotalSprint: 0},
]

// Backend Developer's statistics
var backend = {
	stressLevel: 0,
	responsibleFor: undefined,
    myBackLog: []	// What I am doing next
}


/* 
 * Advance a dev's work. If they have wait, increment counters. 
 * The dependency of a dev task to other's work is determined by a 
 * lookup table. When dev has a dependency, they push the work index
 * to 
 * Yelling function is not invoked from here. 
 */
function advanceIfPossible(devIndex) {
	// Small out of bounds check 
	var me = team[devIndex]
	// The logic of what is possible to do:
	// inject dependencies of the backend's work here
	// Raise dev wait counters if they are polling busy
	console.log('I am done!' + team[devIndex].name)
}


/* 
 * He's got a bit of different work order.
 */
function turnOfBackend() {
	console.log('I am not yet implemented, oO backend.')
}	


// Utility functions: randomizer
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function moveBackLogToFrontofQueue(whichTask) {
	var rewritten = []
	var curLen = backend.myBackLog.length
	if (curlen  1) {
		return true
	}
	// Write 
	for (tqx = 0; tqx < curLen; tqx++) {
		var pickItem = backend.myBackLog[tqx]
		// We reconstruct the array by pushing each item, except the one that 
		// is being moved to front of queue. Note the 'front' means the
		// last item in array
		if (pickItem != whichTask) {
			rewritten.push(pickItem)
		}
	}
	// Finally the newly priorititzeditem	
	rewritten.push(whichTask)
	backend.myBackLog = rewritten
}


function showBackendBacklog() {
	if (backend.myBackLog.length < 1) {
		console.log('[Queue empty]')
		return
	}
	console.log(backend.myBackLog.join(','))
}



/* This is the yelling function. Here a dev shouts out to 
 * backend dev, trying to persuade that the backend 
 * takes their taskPointer task now in front of the backend queue. 
 * Returns: {boolean} Result 'true' => backend log was changed! false => no effect.
 */
function tryInfluenceBackend (taskPointer)
{
	// 1 point for being interrupted and shouted at
	backend.stressLevel += 1
	// 2 points more if the backend dev has to change their priority in backlog
	if (getRandomNumber(0,9) == 6) {
		// OK, you won! I will move the priority of your item to be
		// the first in my queue. Ie the next time I will do your item!
		backend.stressLevel += 3
		moveBackLogToFrontofQueue(taskPointer)
		console.log('BACKEND- My queue is now:')
		showBackendBacklog()
		return true
	}
	return false
}


function inspectYelling(devIndex) {
	var me = teamm [devIndex]
	if (me.waitsInRow > 3) {
		tryInfluenceBackend()

	}
}



// Rules for the backend developer
// ----------------------------------------------------------
// push a item to his myBackLog => stressLevel += 1
// manipulate the myBackLog any other way => stressLevel += 3

var teamSize = team.length;

var projectBacklog = ["5713456849442105"]
// the backlog is eaten by developers, one char at time
// each developer now gets assigned the responsibility  

// Get next N items from backlog, or if the request is longer than there's tasks left,
// give all. Consume the backlog (strip away those items that were returned)
function getNextItems(requested) {
	// get the string of leftmost requested or current backlog length, which
	// ever is smaller
	var n = projectBacklog.length
	var give = Math.min(n,requested) // Minimum of the 2 is right: either what is available, or required
	// Safety check, we will not try to give a slice() with negative parameter
	if (give < 0 ) {
		give = 0
	}
	// Eat the amount of string chars, and return this substring. So we need 
	// both mutate the backLog, and returns a chunk of it.
	var tobeGiven = projectBacklog.slice(give)
	return tobeGiven
}

// Tests

// The ongoing project as a whole
var currentSprint = {
	sprintLength: undefined
}

// At beginning of the sprint, call this function to do proper allocation of 
// tasks in the backLog, to individual developers (who can then complete
// the tasks). 
function allocateWork( ) {
	console.log('PROJECT BEGINS!')
	// Give the team a chunk
	var chunk = projectBacklog
	teamSize
}


// Communication is used to solve unknown team situations.
// When devs originally get their responsibility assigned, 
// they don't actually know what is required for completion.
//  

function initializeSprint () {

}
// Yelling means calling attention to your own project. 
// If you manage to expedite the development, your poor backend dev
// has to push a project to their own queue, and it loses some 
// power.

// Backend dev Projects have properties
// power: how good flow backend has with the project right now

