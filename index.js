const { addEnterOfficeListener, addExitOfficeListener } = require('./enter-exit.js');

addEnterOfficeListener(() => {
	console.log('WE HAVE AN ENTER MOTHERFUCKER');
});

addExitOfficeListener(() => {
	console.log('OMG SOMEONE IS LEAVING US');
});

/*const { takePhoto } = require('./camera.js');

takePhoto().then(photoPath => {
   sendPhoto(photo); 
});*/
/*const fs = require('fs');
const request = require('request');
var FormData = require('form-data');
sendPhoto(__dirname + '/test_picture.jpg');

function sendPhoto(photoPath) {
    var form = new FormData();
    form.append('file', fs.createReadStream(photoPath));
    form.submit("http://3e96b120.ngrok.io/confluence/rest/usersresource/1.0/users/photo", (err, resp) => {
        console.log(err, resp);
    });*/
    
    //var req = request.post("http://3e96b120.ngrok.io/confluence/rest/usersresource/1.0/users/photo", function (err, resp, body) {
      
/*       request.post({url:"http://3e96b120.ngrok.io/confluence/rest/usersresource/1.0/users/photo", formData: form}, function optionalCallback(err, httpResponse, body) {
          if (err) {
            return console.error('upload failed:', err);
          }
          console.log('Upload successful!  Server responded with:', body);
        }); */
//}
