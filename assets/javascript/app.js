// Initialize Firebase
var config = {
    apiKey: "AIzaSyDitwYbZKuU6ushRbnJhvGQwLet0zTPGsk",
    authDomain: "train-scheduler-e6406.firebaseapp.com",
    databaseURL: "https://train-scheduler-e6406.firebaseio.com",
    projectId: "train-scheduler-e6406",
    storageBucket: "",
    messagingSenderId: "213274866428"
};
firebase.initializeApp(config);
// reference to database
var database = firebase.database().ref();
var trainRef = database.child("TrainSchedule");
// test if the input data is displayed using jquery on submit 
$("#submit-button").on("click", function (event) {
    // prevent default behaviour of submitting form
    event.preventDefault();
    //get the input field values from user train-name destination train-time frequency 
    var trainName = $("#train-name").val();
    var trainTime = $("#train-time").val();
    var destination = $("#destination").val();
    var frequency = $("#frequency").val();
    // displaying the values to the table
    // write the data to the database
    trainRef.push({
        TName: trainName,
        Tdest: destination,
        Ttime: trainTime,
        Tfreq: frequency
    });
    $("#train-name").val("");
    $("#train-time").val("");
    $("#destination").val("");
    $("#frequency").val("");
});

//get data from database
trainRef.on("child_added", function (snapshot) {
    console.log(snapshot.val().TName);
    var tr = $("<tr>");
    var td1 = $("<td>").text(snapshot.val().TName);
    var td2 = $("<td>").text(snapshot.val().Tdest);
    var td3 = $("<td>").text(snapshot.val().Tfreq);
    var time = snapshot.val().Ttime;
    var freq = snapshot.val().Tfreq;
    // arrivalTime(time);
    var firstTime = time;
    var tFrequency = freq;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var td4 = $("<td>").text(nextTrain);
    var td5 = $("<td>").text(tMinutesTillTrain);
    tr.append(td1, td2, td3, td4, td5);
    $("tbody").append(tr);
   
});



   


