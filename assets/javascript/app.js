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
$("#submit-button").on("click", function () {
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

});

//get data from database
trainRef.on("child_added", function (snapshot) {
    console.log(snapshot.val().TName);
    var tr = $("<tr>");
    var td1 = $("<td>").text(snapshot.val().TName);;
    var td2 = $("<td>").text(snapshot.val().Tdest);
    var td3 = $("<td>").text(snapshot.val().Tfreq);
    var td4 = $("<td>").text(snapshot.val().Ttime);
    var td5 = $("<td>");
    tr.append(td1, td2, td3, td4, td5);
    $("tbody").append(tr);
   
    
});