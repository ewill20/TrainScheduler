
var config = {
  apiKey: "AIzaSyBmkmUjhFk-Gech0a8XixALdAMMk2qWwl8",
  authDomain: "trainscheduler-f2566.firebaseapp.com",
  databaseURL: "https://trainscheduler-f2566.firebaseio.com",
  projectId: "trainscheduler-f2566",
  storageBucket: "trainscheduler-f2566.appspot.com",
  messagingSenderId: "117555102224"
};

firebase.initializeApp(config);

var database = firebase.database();


// Sets up the variables for the timetable //
// var trainName = "";
// var destination = "";
// var frequency = "";
// var nextArrival = "";
// var minutesAway = "";
// var now = moment()._d;
// var then = $("#traintimeinput" + frequency);

// moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")

// Add click listener for submit button //
$(".addTrain").on("click", function (event) {
  event.preventDefault();

  // moment();

  // Capture user inputed values to check against database //
  var trainName = $("#trainnameinput").val().trim();
  var destination = $("#traindestinationinput").val().trim();
  var frequency = $("#trainfreqinput").val().trim();
  var firstTrain = moment($("#traintimeinput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
  var nextArrival = $("#traintimeinput").val().trim();
  
  
  var addTrain = {
    "trainName": trainName,
    "destination": destination,
    "frequency": frequency,
    "firstTrain": firstTrain,
    "nextArrival": nextArrival,
  };

  console.log(addTrain);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstTrain: firstTrain,
    nextArrival: nextArrival,

  });

  clear();


});

database.ref().on("child_added", function (childSnapshot) {
  // console.log(childSnapshot.val());

  var trName = (childSnapshot.val().trainName);
  var trDestination = (childSnapshot.val().destination);
  var trainTimeInput = (childSnapshot.val().firstTrain);
  var trFrequency = (childSnapshot.val().frequency);
  

  var diffTime = moment().diff(moment.unix(trainTimeInput), "minutes");
  var timeRemainder = moment().diff(moment.unix(trainTimeInput), "minutes") % trFrequency;
  var minutes = trFrequency - timeRemainder;

  var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");
 
   console.log(minutes);
   console.log(nextTrainArrival);
   console.log(moment().format("hh:mm A"));
   console.log(nextTrainArrival);
   console.log(moment().format("X"));
  

  // Appends the table with the data from Firebase //
  $("#trainTable > tbody").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" + trFrequency + "mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>")

});
// Clears the input fields after submitted //
function clear() {
  $("#trainnameinput").val("");
  $("#traindestinationinput").val("");
  $("#traintimeinput").val("");
  $("#trainfreqinput").val("");

  
};
















