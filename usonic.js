const Gpio = require('pigpio').Gpio;
 
 const interval = 50;
 const HIGH = 1;
 const triggerHighTime = 10;
 
 let lastTriggeredSensorIndex = 0;
 const sensors = [];
 
// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;
 
function initDistanceSensor(config) {
    const trigger = new Gpio(config.triggerPin, {mode: Gpio.OUTPUT});
    const echo = new Gpio(config.echoPin, {mode: Gpio.INPUT, alert: true});
    
    trigger.digitalWrite(0); // Make sure trigger is low
    
    let startTick;
 
  echo.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      config.callback(diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
  
  sensors.push(trigger);
}

// Trigger a distance measurement once per second
    setInterval(() => {
        lastTriggeredSensorIndex = (lastTriggeredSensorIndex + 1) % sensors.length;
    
        const trigger = sensors[lastTriggeredSensorIndex];
    
      trigger.trigger(triggerHighTime, HIGH); // Set trigger high for 10 microseconds
    }, interval);

module.exports = {
    initDistanceSensor
};
