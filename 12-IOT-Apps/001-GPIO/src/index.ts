import * as GPIO from 'rpi-gpio';

const GatePin = 26;
const PIRSensorPin = 12;
const LEDPin = 16;

GPIO.setup(GatePin, GPIO.DIR_LOW, (error) => {
    GPIO.write(GatePin, true, (err) => {
        if (err) throw err;
        console.log('Written to pin');
    });
});

GPIO.setup(PIRSensorPin, GPIO.DIR_IN, (error) => {

});


GPIO.setup(LEDPin, GPIO.DIR_OUT, (error) => {

});