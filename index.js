const { addEnterOfficeListener, addExitOfficeListener } = require('./enter-exit.js');

addEnterOfficeListener(() => {
	console.log('WE HAVE AN ENTER MOTHERFUCKER');
});

addExitOfficeListener(() => {
	console.log('OMG SOMEONE IS LEAVING US');
});
