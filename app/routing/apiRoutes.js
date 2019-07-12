var express = require("express");

var router = express.Router();

// Data
var friends = [
    {
      name: "Joe",
      photo: "https://www.tvovermind.com/wp-content/uploads/2018/05/Joe-Dirt-640x360.jpg",
      scores: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
    },
    {
        name: "Milton",
        photo: "http://www.jara-jordan.com/wp-content/uploads/2019/04/9-useless-pieces-of-trivia-about-office-space-simple-ideas-design.png",
        scores: [3, 1, 2, 5, 5, 2, 1, 3, 2, 4]
    },
    {
        name: "Sam",
        photo: "https://www.girlmuseum.org/wp-content/uploads/2018/06/Molly-Ringwald-Sixteen-Candles-300x205.jpg",
        scores: [4, 2, 5, 3, 1, 3, 2, 1, 5, 4]
    },
    {
        name: "Carolyn",
        photo: "https://i-h1.pinimg.com/140x140_RS/1d/59/4c/1d594c82ca900d2d82510217c4bbecc1.jpg",
        scores: [1, 2, 3, 3, 5, 3, 3, 3, 5, 1]
    }
];

router.get("/api/friends", function(req, res) {
    return res.json(friends);
});

router.post("/api/friends", function(req, res) {

    var newFriend = req.body;

    var scores = newFriend.scores.map(Number);

    newFriend.scores = scores;
  
    console.log(newFriend);
  
    friends.push(newFriend);
  
    res.json(newFriend); 
});

router.get("/api/match/:name", function(req, res) {

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

    differences = [];

    if (!(currentUser === friends[i].name)) {
        var compareScores = friends[i].scores;

        for (var j = 0; j < currentUserScores.length; j++) {

            differences.push(Math.abs(currentUserScores[j] - compareScores[j]));
        }
        var currentDiff = differences.reduce(function(total, num){
            return total + num;
        });

        console.log(`\nFriend: ${friends[i].name}. Sum of difference: ${currentDiff}`)

        if (smallestDiffTracker.smallestDiff === undefined || (currentDiff < smallestDiffTracker.smallestDiff)) {

            smallestDiffTracker.smallestDiffUserIndex = i;
            smallestDiffTracker.smallestDiff = currentDiff;

        } 
    } 
}

res.json(friends[smallestDiffTracker.smallestDiffUserIndex])
    
});

// Exporting for server.js
module.exports = router;