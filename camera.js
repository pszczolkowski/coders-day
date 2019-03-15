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
 
function randomString() {
    return Math.random().toString(36).substring(7);
}
 
//Creates webcam instance
 

 
 var Webcam = NodeWebcam.create(opts);
//Will automatically append location output type

function takePhoto() {
    return new Promise((resolve, reject) => {
        Webcam.list(list => {
            opts.device = list[0];
            Webcam = NodeWebcam.create(opts);
            const fileName = randomString();
            Webcam.capture(fileName, function( err, fileNameResult ) {
                if (err) {
                        reject(err);
                } else {
                    resolve(fileNameResult);
                }
            } );

        });
    }); 
}

module.exports = {
    takePhoto
};

 


