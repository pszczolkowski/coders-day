const { initDistanceSensor } = require('./usonic.js');
 
const epsilon = 50;
 
 const initialDistancesMeasures = {
    exit: [],
    inside: []
 };
 
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
    if (someoneInRange.inside) {
        state = 'enter_progress';
    } else {
        //console.log('updateEnterStartState');
    }
}

function updateEnterProgressState() {
    if (!someoneInRange.exit) {
        state = 'enter_end';
    } else {
       // console.log('updateEnterProgressState');
    }
}

function updateEnterEndState() {
    if (!someoneInRange.inside) {
        state = 'idle';
        officeEnterListener();
    } else {
       // console.log('updateEnterEndState');
    }
}

function updateExitStartState() {
    //if (someoneInRange.exit && someoneInRange.inside) {
    if (someoneInRange.inside) {
        state = 'exit_progress';
    } else {
      //  console.log('updateExitStartState');
    }
}

function updateExitProgressState() {
    if (!someoneInRange.inside) {    //if (someoneInRange.exit && !someoneInRange.inside) {
        state = 'exit_end';
    } else {
    //    console.log('updateExitProgressState');
    }
}

function updateExitEndState() {
    if (!someoneInRange.exit) {
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
	    callback: onExitSensorRead
	});

// inside sensor
initDistanceSensor({
	    echoPin: 19,
	    triggerPin: 6,
	    callback: onInsideSensorRead
	});

function setSomeoneInRange(sensorName, isSomeoneInRange) {
    someoneInRange[sensorName] = isSomeoneInRange;
}

let lastState = '';
function updateState() {
    stateUpdators[state]();
    //console.log(lastDistances.inside, lastDistances.exit);
    if (lastState !== state) {
        //console.log(state);
        lastState = state;
    }
}

function onExitSensorRead(distance) {
    onSensorRead(distance, 'exit');
}
 
function onInsideSensorRead(distance) {
    onSensorRead(distance, 'inside');
}

function onSensorRead(distance, sensorName) {
    if (initialDistances[sensorName] < 0) {
        initialDistances[sensorName] = distance;
        console.log(sensorName + ' initial distance set to', distance);
        return;
    }

    lastDistances[sensorName] = distance;

    if (isSomeoneInRange(sensorName)) {
        setSomeoneInRange(sensorName, true);
    } else {
        setSomeoneInRange(sensorName, false);
    }
    updateState();
}
 
function isSomeoneInRange(sensorName) {
    const distance = lastDistances[sensorName];
    return Math.abs(distance - initialDistances[sensorName]) > epsilon;
}
 
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
