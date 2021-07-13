var Countdown = require('countdown-js')

// setup end datetime for timer
var ten_days = 1000 * 60 * 60 * 24 * 10
var end = new Date(new Date().getTime() + ten_days)

var timer = Countdown.timer(end, function(timeLeft) {
    console.log(timeLeft)
    console.log(timeLeft.days)
    console.log(timeLeft.hours)
    console.log(timeLeft.minutes)
    console.log(timeLeft.seconds)
}, function() {
    console.log("Countdown Finished!")
})