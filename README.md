# Friend-Finder

This full-stack site takes in results from users' surveys, then compares their answers with those from other users. The app displays the name and picture of the user with the best overall match to the current user. It is a compatibility-based "FriendFinder" application similar to a dating app. 


The site shows the user a survey with 10 compatibilty questions. Each answer is on a scale of 1 to 5, based on how much the user agrees or disagrees with a question.

This site uses Express to handle routing. The htmlRoutes.js includes two routes:
1) A GET Route to /survey is used to display the survey page.
2) A default, catch-all route that leads to home.html which displays the home page.

The apiRoutes.js file contains two routes:
1) A GET route with the url /api/friends. This is used to display a JSON of all possible friends.
2) A POST routes /api/friends. This is used to handle incoming survey results. This route is also used to handle the compatibility logic.

The app's data is saved in app/data/friends.js as an array of objects. Each of these objects follows the format below:

{

  "name":"Joe",
  
  "photo":"https://photo.jpg",
  
  "scores":[
  
      5,
      
      1,
      
      4,
      
      4,
      
      5,
      
      1,
      
      2,
      
      5,
      
      4,
      
      1
    ]
}


Each user's results are converted into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]). Then the difference between the current user's score is compared to those from other users, question by question. The closest match is the user with the least amount of difference.


Once the site finds the current user's most compatible friend, it displays the result as a modal pop-up containing the name and picture of the closest match.

New Technologies used:
* Nodemon
* Express
* Heroku 



