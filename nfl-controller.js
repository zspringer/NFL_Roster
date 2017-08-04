function NflController() {
    //Private parts
    var loading = true; //Start the spinner
    var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var nflService = new NflService(apiUrl, ready);
    

    //function ready is the callback and is being called above in the NflService as a variable
    function ready(playerList) {
        drawPlayers(playerList);
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.

    }
    
    function drawPlayers(playersList){
        var template = ''
        var playerElem = document.getElementById('player-roster')
        
        for (var i = 0; i < playersList.length; i++){
        var player = playersList[i];
        template += `
            <div class="col-xs-4 player-card">
                <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt="nfl player">
                <div class="player-name">Player Name:</div>
                <div class="player-position">Player Position:</div>
                <div class="player-team">Player Team:</div>
            </div>
        `
        }
        playerElem.innerHTML = template    
    }
    
    
    
    //Public parts

    //Search button gets this function first
    this.getPlayer = function getPlayer(e) {
        e.preventDefault();
        var player = e.target.player.value;
        debugger
        nflService.getPlayer(player).then(drawPlayers);
    }


    this.getPlayersByTeam = function (teamName) {
        playersData.filter(function (player) {
            if (player.team == teamName) {
                return true;
            }
        });
    }

    this.getPlayersByPosition = function (position) {
        playersData.filter(function (player) {
            if (player.position == position) {
                return true;
            }
        });
    }


}