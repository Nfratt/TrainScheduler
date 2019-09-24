$(document).ready(function () {
var firebaseConfig = {
    apiKey: "AIzaSyDuuNCtVM4v6Aqak_KfPWW91J4uxMbd9Ys",
    authDomain: "nickstrainscheduler.firebaseapp.com",
    databaseURL: "https://nickstrainscheduler.firebaseio.com",
    projectId: "nickstrainscheduler",
    storageBucket: "nickstrainscheduler.appspot.com",
    messagingSenderId: "847124028890",
    appId: "1:847124028890:web:364dc5689db975ba6df4e3"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Capture Button Click
$("#addTrain").on("click", function (event) {
    event.preventDefault();

    // values from text boxes
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var freq = $("#interval").val().trim();

    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: freq
    });
  });



  database.ref().on("child_added", function (childSnapshot) {

    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;

    // inital time  Time (pushed back 1 year to make sure it comes before current time) just like in classwork 
    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

    // sets current time 
    var currentTime = moment();

    // moment Js to calc difference 
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    // Time apart with remainder 
    var tRemainder = diffTime % newFreq;

    // adding mins till next train 
    var tMinutesTillTrain = newFreq - tRemainder;

    // var for Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    // adds a Display to the  Page
    $("#all-display").append(
      ' <tr><td>' + newTrain +
      ' </td><td>' + newLocation +
      ' </td><td>' + newFreq +
      ' </td><td>' + catchTrain +
      ' </td><td>' + tMinutesTillTrain + ' </td></tr>');

    // to clear Clear input fields
    $("#trainName, #destination, #firstTrain, #interval").val("");
    return false;
  },
    // Handle the errors
    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
});
 //end document ready

// var tFrequency = 3;


// // Time is 3:30 AM
// var firstTime = "03:30";

// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));