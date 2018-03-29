$(document).ready(function () {
    // refresh web page every 1 min 
    setInterval(function () {
        window.location.reload();
    }, 60000); 
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
        console.log(moment(trainTime, "HH:mm"));
        console.log(moment(trainTime, "HH:mm").isValid());
        // validation for the first time input field
        // if user enters a wrong time format otherthan HH:mm throw alert and empty fields
        if (!moment(trainTime, "HH:mm").isValid()) {
            alert("enter a valid HH:mm time format");
            empty();
        }
        // if the input is right then push values to firbase
        else {
            trainRef.push({
                TName: trainName,
                Tdest: destination,
                Ttime: trainTime,
                Tfreq: frequency
            });
            empty();
        }
    });
    // empty input fields function
    function empty() {
        $("#train-name").val("");
        $("#train-time").val("");
        $("#destination").val("");
        $("#frequency").val("");
    }
    //get data from database
    trainRef.on("child_added", function (snapshot) {
        var tr = $("<tr>");
        var td1 = $("<td>").text(snapshot.val().TName);
        var td2 = $("<td>").text(snapshot.val().Tdest);
        var td3 = $("<td>").text(snapshot.val().Tfreq);
        var time = snapshot.val().Ttime;
        var freq = snapshot.val().Tfreq;
        var firstTime = time;
        var tFrequency = freq;
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // Current Time
        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm A"));
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var td4 = $("<td>").text(moment(nextTrain).format("hh:mm A"));
        var td5 = $("<td>").text(tMinutesTillTrain);
        tr.append(td1, td2, td3, td4, td5);
        $("tbody").append(tr);

    });
});






