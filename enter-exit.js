'use strict';

const { initDistanceSensor } = require('./usonic.js');
 
const epsilon = 30;
 
let officeEnterListener = () => console.log('no office enter listener');
let officeExitListener = () => console.log('no office exit listener');
let initialDistances = {
    exit: -1,
    inside: -1,
};
let someoneInRange = {
    exit: false,
    inside: false
};
let lastDistances = {
    exit: -1,
    inside: -1
};

let state = 'idle';

const stateUpdators = {
    idle: updateIdleState,
    enter_start: updateEnterStartState,
    enter_progress: updateEnterProgressState,
    enter_end: updateEnterEndState,
    exit_start: updateExitStartState,
    exit_progress: updateExitProgressState,
    exit_end: updateExitEndState
};

function updateIdleState() {
    if (someoneInRange.exit) {
        state = 'enter_start';
    } else if (someoneInRange.inside) {
        state = 'exit_start';
    }
}

function updateEnterStartState() {
    if (someoneInRange.exit && someoneInRange.inside) {
        state = 'enter_progress';
    } else {
        //console.log('updateEnterStartState');
    }
}

function updateEnterProgressState() {
    if (!someoneInRange.exit && someoneInRange.inside) {
        state = 'enter_end';
    } else {
       // console.log('updateEnterProgressState');
    }
}

function updateEnterEndState() {
    if (!someoneInRange.exit && !someoneInRange.inside) {
        state = 'idle';
        officeEnterListener();
    } else {
       // console.log('updateEnterEndState');
    }
}

function updateExitStartState() {
    if (someoneInRange.exit && someoneInRange.inside) {
        state = 'exit_progress';
    } else {
      //  console.log('updateExitStartState');
    }
}

function updateExitProgressState() {
    if (someoneInRange.exit && !someoneInRange.inside) {
        state = 'exit_end';
    } else {
    //    console.log('updateExitProgressState');
    }
}

function updateExitEndState() {
    if (!someoneInRange.exit && !someoneInRange.inside) {
        state = 'idle';
        officeExitListener();
    } else {
     //   console.log('updateExitEndState');
    }
}

// exit sensor
initDistanceSensor({
	    echoPin: 11,
	    triggerPin: 0,
	    callback: handleExitSensorDistance
	});

// inside sensor
initDistanceSensor({
	    echoPin: 19,
	    triggerPin: 6,
	    callback: handleInsideSensorDistance
	});

function setSomeoneInRange(sensorName, isSomeoneInRange) {
    someoneInRange[sensorName] = isSomeoneInRange;
}

function updateState() {
    stateUpdators[state]();
}

function handleExitSensorDistance(distance) {
    if (initialDistances.exit < 0) {
        initialDistances.exit++;
    } else if (initialDistances.exit == 0) {
            console.log('initialDistances.exit', distance);
        initialDistances.exit = distance;
    }

    lastDistances.exit = distance;

    if (isSomeoneInRange('exit')) {
        setSomeoneInRange('exit', true);
    } else {
        setSomeoneInRange('exit', false);
    }
    
    //console.log('exit', distance);
        //console.log('exit state', someoneInRange.exit);
    updateState();
}
 
function handleInsideSensorDistance(distance) {
    if (initialDistances.inside < 0) {
        initialDistances.inside++;
    } else if (initialDistances.inside == 0) {
        console.log('initialDistances.inside', distance);
        initialDistances.inside = distance;
    }

    lastDistances.inside = distance;

    if (isSomeoneInRange('inside')) {
        setSomeoneInRange('inside', true);
    } else {
        setSomeoneInRange('inside', false);
    }
    //console.log('inside state', someoneInRange.inside);
    //console.log('inside', distance);
    updateState();
}
 
function isSomeoneInRange(sensorName) {
    const distance = lastDistances[sensorName];
    const initialDistance = Math.max(initialDistances.inside, initialDistances.exit);
    //console.log('initialDistance', initialDistance);
    //console.log('distance', distance);
    return Math.abs(distance - initialDistance) > epsilon;
}
 
/*	initialDistances = {
	    exit: readExitSensorDistance(),
	    inside: readInsideSensorDistance()
	};

	setInterval(checkDistances, 100);*/


 

 
function addEnterOfficeListener(listener) {
    officeEnterListener = listener;
}
function addExitOfficeListener(listener) {
    officeExitListener = listener;
}
 
module.exports = {
    addEnterOfficeListener,
    addExitOfficeListener
};
