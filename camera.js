var NodeWebcam = require( "node-webcam" );
 
//Default options
var opts = {
 
    //Picture related
    width: 1280,
    height: 720,
    quality: 100,
 
    //Delay to take shot
    delay: 0,
 
    //Save shots in memory
    saveShots: true,
 
    // [jpeg, png] support varies
    // Webcam.OutputTypes
    output: "jpeg",
 
    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    device: false,
 
 
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "location",
 
    //Logging
    verbose: false
 
};
 
 
//Creates webcam instance
 
var Webcam = NodeWebcam.create(opts);
 
 
//Will automatically append location output type

function takePhoto() {
    return new Promise((resolve, reject) => {
        Webcam.capture( "test_picture", function( err, data ) {
            if (err) {
                    reject(err);
            } else {
                resolve(data);
            }
        } );
    }); 
}

module.exports = {
    takePhoto
};

 


