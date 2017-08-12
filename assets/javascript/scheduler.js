
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
    var trainName = "";
    var destination = "";
    var frequency = "";
    var nextArrival = "";
    var minutesAway = "";

    // Add click listener for submit button //
    $(".addTrain").on("click", function(event) {
      event.preventDefault();

      // Capture user inputed values to check against database //
      var trainName = $("#trainnameinput").val().trim();
      var destination = $("#traindestinationinput").val().trim();
      var frequency = $("#traintimeinput").val().trim();
      var nextArrival = $("#trainfreqinput").val().trim();
      var addTrain = {
        "trainName": trainName,
        "destination": destination,
        "frequency": frequency,
        "nextArrival": nextArrival,
      };

      console.log(addTrain);

      database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        // dateAdded:
        // firebase.database.ServerValue.TIMESTAMP

      });

      clear();


    });

    database.ref().on("child_added", function(childSnapshot) {

      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().nextArrival);

      var trName = (childSnapshot.val().trainName);
      var trDestination = (childSnapshot.val().destination);
      var trFrequency = (childSnapshot.val().frequency);
      

      var timeFormatted = "HH:mm"
      var now = moment 
      var convertedTime = moment(now, timeFormatted)
      var trNextArrival = (moment().diff(moment(convertedTime), "minutes"
        ));
      $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>")

    });

    function clear() {
      $("#trainnameinput").val("");
      $("#traindestinationinput").val("");
      $("#traintimeinput").val("");
      $("#trainfreqinput").val("");
    };



  












