# NFL_Roster
Fantasy Hand-Egg!!! OK, Football. In case you have never participated in fantasy here is a basic overview from NFL.com:

 `
 Fantasy football, like other fantasy games, puts you in the front office and on the sidelines as General Manager and Coach of your team. You select from a list of the best players in the NFL and they compete on a weekly basis for your team.
`

For this project we will be creating a dynamic roster where you can add/remove players and visualize your team. For now we will be doing this via a form so a player can be added to the roster easily, later we will look at working with an API to get that info.

![NFL Roster](http://i61.tinypic.com/5nvwuq.png)

###Step 1 - Project Setup

1. Create a repository for my-roster.
2. Create the index.html, app.js, and styles.css files.
3. Link the app.js and styles.css into index.html
4. Lastly add your links for Bootstrap and jQuery into index.html

###Step 2 - HTML Wire-frame

*The layout for this project works well with Bootstrap's panel class, however feel free to go around that and make it your own*

1. Add a panel with a header that says "My NFL Roster".
2. Wrap the panel in a div with the class "container".
3. Inside the panel body, create 2 child divs, one with the class "player-roster" and one with the class "player-form".
4. Inside the player-roster div, add another div with the class "player-card". 
  - Set the player-card class to "display: inline-block" and add a "1px solid black" border
  - Add an image to the player card with the src = "http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"
  - Display the player's name, position and number, each on seperate lines
  
###Step 3 - Creating New Players

1. Create a form inside the "player-form" div.
2. Add input fields for playerName, playerPosition, and playerNumber.
3. When the Add button is pressed, it should automatically add a player to the Roster.
  - Since we want all of our players to have all the same attributes. Create a constructor for Player that accepts 3 arguments: name, position, number.
  - When the Add button is pressed, a new Player is created and added to the players array.
6. Use jQuery to target the "player-roster" div, and add the player.


####Challenges
 - All your players shouldn't look the same, add the ability to submit a player image through your form as well?
 - What happens when a user puts in bad data such as a 200 character name, or no data and hits submit? How could you fix that? 
 - Feel free to spend a bit of time on the layout and styles, however don't spend a ton of time with this, as the refactor we will be doing next will alter the layout quite a bit.
