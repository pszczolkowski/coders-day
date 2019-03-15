const { addEnterOfficeListener, addExitOfficeListener } = require('./enter-exit.js');
const { takePhoto } = require('./camera.js');
const fs = require('fs');
const request = require('request');
const FormData = require('form-data');

addEnterOfficeListener(onOfficeEnter);
addExitOfficeListener(onOfficeExit);

function onOfficeEnter() {
    console.log('ENTER TO OFFICE');
	
	takePhoto().then(photoPath => {
    	console.log('photo taken');
        sendPhoto(photoPath, 'ENTER');
    });
}

function onOfficeExit() {
    console.log('LEAVE FROM OFFICE');
	
	takePhoto().then(photoPath => {
    	console.log('photo taken');
        sendPhoto(photoPath, 'ENTER');
    });
}

function sendPhoto(photoPath, eventType) {
    var form = new FormData();
    form.append('file', fs.createReadStream(photoPath));
    form.append('event', eventType);
    form.submit('http://84e7eff1.eu.ngrok.io/event-photo', (err, resp) => {
        if (err) {
            console.log(err);
        } else {
            console.log('photo has been uploaded');
        }
    });
}
