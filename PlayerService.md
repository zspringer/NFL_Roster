---
#Players Service & Encapsulation
---
Last Thursday we had an involved lesson in regards to encapsulation, one of the three pillars of object oreinted programming.
We discussed the important role it plays in software development, and how it promotes effecient maintainable code.

While the concept of Encapulation is very broad, we attempted to break it down into a few basic principles.
- Single Responsibility, or as Brandon put it "One function, One job".
  - Do your best to ensure a function doesn't do too much. If it is doing too much
  try to separate(refactor) it out into other smaller functions.

- Encapsulate/WrapUp common behavior.
  - If you have functions(methods) or data(properties) that are similar in behaviour, wrap them up into a single unit, using a class(constructor).
  
- "Keep your private parts private".
  - Use closure to keep functionality specific to an object within the object itself. 

This afternoon, I had a great discussion with Eric. What started off as a question regarding Git branches turned into 
an hour long lesson regarding encapsulation and services. We discussed the player data coming from the CBS API and how we could encapsulate it
into it's own unit. Our proof of concept was very basic.
  - Retrieve player data from an external source.
    - Only load this data one time, then store it to a local variable.
  - Filter player data by certain properties such as Name, Position, Team, etc...
    - To make it simple we started with 2 basic functions.
      - getPlayersByTeam(teamName);
        - this method recieves a name of a team, returns an array of all players on that team.  
      - getPlayersByPosition(position);
        - this method recieves a players position, return an array of all players with that position.
    - Each function relys on the data retrived from the external source.  
 
Because every item in our proof of concept is similar in behavior, we decided to place everything inside a common unit. 
We decided to call it PlayersService. 

PlayersService is just a constructor.
```javascript
  var PlayersService = function(){
    //...
  } 
```

Looking back at our proof of concept, we know our service needs to have player data, and a few functions.

  ```javascript
    var PlayersService = function(){
      var playersData = [];
      
      this.getPlayersByTeam = function(teamName){
        //return all an array of all players that match the given teamName.
      }
      
      this.getPlayersByPosition = function(position){
        //return all an array of all players that match the given position.
      }
    } 
  ``` 

Once we had the skeleton laid out, it was time to implement the functionality.
We will use a new method called .filter(), an explination of it can be found at the bottom of this post.

  ```javascript
    var PlayersService = function(){
      var playersData = [];
      
      this.getPlayersByTeam = function(teamName){
        playersData.filter(function(player){
          if(player.team == teamName){
            return true;
        });
      }
      
      this.getPlayersByPosition = function(position){
        playersData.filter(function(player){
          if(player.position == position){
            return true;
        });
      }
    } 
  ```

Now we just need to write the function to get the player data from the API. And call
that function every time we create a new Players Service. Since we don't want to hard code
a url to the API in the service, we are accepting it as a constructor parameter.

  ```javascript
    var PlayersService = function(endpointUri){
      var playersData = [];
      
      this.getPlayersByTeam = function(teamName){
        playersData.filter(function(player){
          if(player.team == teamName){
            return true;
        });
      }
      
      this.getPlayersByPosition = function(position){
        playersData.filter(function(player){
          if(player.position == position){
            return true;
        });
      }
      
      function loadPlayersData(){
        $.getJSON(endpointUri,function(data){
          playersData = data.body.players; //maybe play with this
        });
	     };	
       
	     loadPlayersData(); //call the function above every time we create a new service
    } 
  ```

And there you have it. A basic, easy to use Players Service. To make it work, all we need to do is...
  ```javascript
    var apiUrl = "api.cbs.com......";
    var playerService = new PlayerService(apiUrl);
    ​
    $('some-button').on('click',function(){
      var teamSF = playerService.getPlayersByTeam("SF");
    }
  ```

If you have any questions or would like some clarification, please message me, Jake, or one of the other mentors....
Better yet,just message Eric!!! (just kidding...)

Happy CODING!  
 
---

#Array.Filter
---
In its simplest form, Array.filter is a way to filter a large array intto a smaller array. 


Let's look at the following example of filtering an array using Array.forEach();
In the exmples below, our goal is to filter on all the players on the team "SF".
  ```javascript
    var playersData = [] //Assume this is a large collection of players.
    var filterdPlayers = [];
    playersData.forEach(function(player){
        if(player.team === "SF"){ //check to see if they are on the team SF
          filteredPlayers.push(player); //if they are, add them to the array.
        }
    });
    
    console.log(filteredPlayers); //this should be all players that are on SF.
  ```

That's not too much code, and pretty easy to follow, however, javascript has an easier, cleaner way
to filter arrays. This is where we use Array.filter() instead of Array.forEach().

  ```javascript
    var playersData = [] //Assume this is a large collection of players.
    
    var filterdPlayers = playersData.filter(function(player){ //replace forEach with filter.
        if(player.team === "SF"){ //check to see if they are on the team SF
          return true; //instead of adding it to an array, just return true.
        }
    });
    
    console.log(filteredPlayers); //this should be all players that are on SF.
  ```

The code is very similar, but we do not need to push any objects to a temporary array.
Array.filter() works by looking at the response from the callback. If we return TRUE inside 
the callback it will add the current item to the filtered list, if we return FALSE or nothing, 
then it will excluded the current item from the filtered list.

Note, it does not modify the original array, instead it creates a new one.
