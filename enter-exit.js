'use strict';

const { initDistanceSensor } = require('./usonic.js');
 
const epsilon = 10;
 
let officeEnterListener = null;
let officeExitListener = null;
let initialDistances = {
    exit: 0,
    inside: 0
};
let distancesHasChanged = {
    exit: false,
    inside: false
};

// exit sensor
initDistanceSensor({
	    echoPin: 19,
	    triggerPin: 6,
	    callback: handleExitSensorDistance
	});

// inside sensor
initDistanceSensor({
	    echoPin: 19,
	    triggerPin: 6,
	    callback: handleExitSensorDistance
	});


function handleExitSensorDistance(distance) {
    console.log('exit', distance);
    if (Math.abs(distance - initialDistances.exit) > epsilon) {
        if (distancesHasChanged.inside) {
            distancesHasChanged = {
                exit: false,
                inside: false
            };
            officeExitListener();
        } else {
            distancesHasChanged.exit = true;
        }
    }
}
 
function handleInsideSensorDistance(distance) {
    console.log('inside', distance);
    if (Math.abs(distance - initialDistances.inside) > epsilon) {
        if (distancesHasChanged.exit) {
            distancesHasChanged = {
                exit: false,
                inside: false
            };
            officeEnterListener();
        } else {
            distancesHasChanged.inside = true;
        }
    }
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
    addEnterOfficeListener
};
