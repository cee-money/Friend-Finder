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
  
    console.log(newFriend);
  
    friends.push(newFriend);
  
    res.json(newFriend); 
  });


// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});