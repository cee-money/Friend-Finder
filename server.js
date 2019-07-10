// Dependencies
var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
var friends = [
    {
      name: "Joe",
      photo: "https://www.tvovermind.com/wp-content/uploads/2018/05/Joe-Dirt-640x360.jpg",
      scores: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
    }
];

// Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});
  
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});
  
// Displays all friends
app.get("/api/friends", function(req, res) {
    return res.json(friends);
});

app.post("/api/friends", function(req, res) {

    var newFriend = req.body;

    var scores = newFriend.scores.map(Number);

    newFriend.scores = scores;
  
    console.log(newFriend);
  
    friends.push(newFriend);
  
    res.json(newFriend); 
});

app.get("/api/match/:name", function(req, res) {

var currentUser = req.params.name;

var currentUserScores = [];

// get current user's scores array
for (var i = 0; i < friends.length; i++) {
  if (currentUser === friends[i].name) {
    currentUserScores = friends[i].scores;
  }
}


var smallestDiffTracker = {
    smallestDiffUserIndex: undefined,
    smallestDiff: undefined
};

var differences = [];

// compare current user's scores array against all other users' scores arrays
for (var i = 0; i < friends.length; i++){

    if (!(currentUser === friends[i].name)) {
        var compareScores = friends[i].scores;

        for (var j = 0; j < currentUserScores.length; j++) {

            differences.push(Math.abs(currentUserScores[j] - compareScores[j]));
        }
        var currentDiff = differences.reduce(function(total, num){
            return total + num;
        });

        if (smallestDiffTracker.smallestDiff === undefined || (currentDiff < smallestDiffTracker.smallestDiff)) {

            smallestDiffTracker.smallestDiffUserIndex = i;
            smallestDiffTracker.smallestDiff = currentDiff;

        } 
    } 
}

res.json(friends[smallestDiffTracker.smallestDiffUserIndex])
    
});



// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});