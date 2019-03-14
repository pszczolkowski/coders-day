'use strict';

const { initDistanceSensor } = require('./usonic.js');
 
const epsilon = 30;
 
let officeEnterListener = null;
let officeExitListener = null;
let initialDistances = {
    exit: -1,
    inside: -1
};
let distancesHasChanged = {
    exit: false,
    inside: false
};

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


function handleExitSensorDistance(distance) {
    if (initialDistances.exit < 0) {
        initialDistances.exit = distance;
        return;
    }

    //console.log('exit', distance);
    if (Math.abs(distance - initialDistances.exit) > epsilon) {
        if (distancesHasChanged.inside) {
            distancesHasChanged = {
                exit: false,
                inside: false
            };
            officeExitListener();
        } else {
            //console.log('EXIT SENSOR');
            distancesHasChanged.exit = true;
        }
    }
}
 
function handleInsideSensorDistance(distance) {
    if (initialDistances.inside < 0) {
        initialDistances.inside = distance;
        return;
    }

    //console.log('inside', distance);
    if (Math.abs(distance - initialDistances.inside) > epsilon) {
        if (distancesHasChanged.exit) {
            distancesHasChanged = {
                exit: false,
                inside: false
            };
            officeEnterListener();
        } else {
            //console.log('INDISE SENSOR');
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
    addEnterOfficeListener,
    addExitOfficeListener
};
