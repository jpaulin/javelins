const chalk = require('chalk')

// waitsInRow: how many turns the particular dev has had to skip, waiting for others, or other reason
//
//
let team = [
  { name: 'steve', myBackLog: [], responsibleFor: undefined, waitsInRow: 0, waitsTotalSprint: 0 },
  { name: 'adam', myBackLog: [], responsibleFor: undefined, waitsInRow: 0, waitsTotalSprint: 0 },
  { name: 'amy', myBackLog: [], responsibleFor: undefined, waitsInRow: 0, waitsTotalSprint: 0 },
  { name: 'mia', myBackLog: [], responsibleFor: undefined, waitsInRow: 0, waitsTotalSprint: 0 }
]

// The ongoing software project as a whole.
let currentSprint = {
  sprintLength: undefined, // in abstract units
  currentDay: 0
}

// Statistics for the whole project's lifetime.
let sprintStats = {
  'sprintRoundsTotal': 0, // How many rounds the project has been going on
  'backLogItemsDone': 0
}

// The whole project. Items from this array will be moved to
// be either developers' or backend dev tasks. This var is manipulated only
// by functions named as: rmCamelcase()
let projectRoadmap = []

/*
 * Pushes number of items into the project Roadmap.
 * @param {number} noItems How Many items to generate
 */
function rmGenerate(noItems) {
  for (var t = 0; t < noItems; t++) {
    projectRoadmap.push(t)
  }
}

function rm_hasItems() {
  return (projectRoadmap.length > 0)
}


// Backend Developer's statistics
var backend = {
  stressLevel: 0,
  responsibleFor: undefined,
    myBackLog: []  // What I am doing next
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
 * This function makes the decisions and logic of backend developer's work.
 */
function turnOfBackend() {
  var myDisc = backend.myBackLog.pop
  if (typeof myDisc !== 'number') {
    console.log('Expected a Number as task - aborting. The type is: ' + typeof myDisc)
    return
  }  
  console.log('Backend does task #' + myDisc)
  if (backend.stressLevel > 0) {
    backend.stressLevel -= 1
  }
}

// Utility functions: randomizer
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 * Moves a backend developer's backlog such that task 'whichTask'
 * becomes the top of queue, ie. the last item in the backLog
 * array. This results that the backend dev starts working on that 
 * item next time he is in work cycle.
 */
function moveBackLogToFrontofQueue(whichTask) {
  var rewritten = []
  var curLen = backend.myBackLog.length
  if (curlen < 1) {
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


/* 
 * Call this function, as dev (on their work cycle), to 
 * check whether the dev shall yell at backend developer
 * and try to influence the backend's priority list.
 */
function inspectYelling(devIndex) {
  var me = teamm [devIndex]
  if (me.waitsInRow > 3) {
    tryInfluenceBackend()
    // What happens to waiting? Nothing at here. In work cycle 
    // (function: runSprint ()),
    // if dev has a blocking situation, their stats will be advanced
  }
}


var teamSize = team.length

// Get next N items from backlog, or if the request is longer than there's tasks left,
// give all. Consume the backlog (strip away those items that were returned)
function getNextItems(requested) {
  // get the string of leftmost requested or current backlog length, which
  // ever is smaller
  var n = projectRoadmap.length
  var give = Math.min(n,requested)
  if (give < 0) {
    give = 0
  }
  // Eat the amount of string chars, and return this substring. So we need
  // both mutate the backLog, and returns a chunk of it.
  var tobeGiven = projectRoadmap.slice(0, give)
  for (var tm = 0; tm < give; tm++) {
    projectRoadmap.shift()
    console.log(chalk.yellow('-> projectRoadmap len is ' + projectRoadmap.length))
  }
  return tobeGiven
}

// At beginning of the sprint, call this function to do proper allocation of
// tasks in the backLog, to individual developers (who can then complete
// the tasks).
function allocateWork () {
  // Give the team a chunk
  let chunk = getNextItems(teamSize)
  let roundIndex = 0
  console.log(chalk.red('Extracted ' + chunk.length + ' items from roadmap.'))
  while (chunk.length > 0) {
    let doleOut = chunk.pop()
    console.log(chalk.green('HEAVYDEBUG: new item to assign is ' + doleOut))
    team[roundIndex].myBackLog.push(doleOut)
    console.log('Allocated item to developer: ' + team[roundIndex].name)
    roundIndex += 1
    if (roundIndex > (teamSize - 1)) {
      roundIndex = 0
    }
  }
}

// Does the dev cycle for each team member
function ingestWorkCycles() {
  return
}

// Work cycle loop for the team, for duration of 1 sprint
function runSprint() {
  while (currentSprint.currentDay < (currentSprint.sprintLength - 1)) {
    ingestWorkCycles()
    // print something fun and interesting about sprint!
    let cd = currentSprint.currentDay
    let evtxt = 'NOTHING special happened!'
    console.log(`Now in day ${cd}, and: ${evtxt}`)
    currentSprint.currentDay += 1
  }
}

// Communication is used to solve unknown team situations.
// When devs originally get their responsibility assigned,
// they don't actually know what is required for completion.
function initializeSprint () {
  while (rm_hasItems()) {
    // Set up a sprint, and execute it.
    allocateWork() // Now team members know what they will be doing
    sprintStats.sprintRoundsTotal += 1
    currentSprint.sprintLength = 5 // 1 weeks in workdays Mon..Fri
    currentSprint.currentDay = 0
    runSprint()
  }
  console.log('WHOLE PROJECT FINISHED! Roadmap has 0 items left.')
}

// Tracking finally the efficiency metrics of a software project
// - average allocation of items/developer on a sprint
// - average no. steps (days) required on a sprint to complete all items
// - average no. items completed per sprint
// - varying team size, avg. no items complete per sprint, per team size
rmGenerate(20)
initializeSprint()
