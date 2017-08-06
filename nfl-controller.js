function NflController() {
    //Private parts
    var loading = true; //Start the spinner
    var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var nflService = new NflService(apiUrl, ready);


    //function ready is the callback and is being called above in the NflService as a variable
    function ready(playerList) {
        drawPlayers(playerList, []);//TODO: MAY NEED TO MOVE THE ARRAY
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.

    }

    function drawPlayers(playersList) {
        //var template = ''
        var playerElem = document.getElementById('player-roster')


        var playerTemplate = ''


        for (var i = 0; i < playersList.length; i++) {
            var player = playersList[i];
            playerTemplate += `
            <div class="col-xs-4 player-card">
                <img src="${player.photo}" style=height:100px width:100px alt="nfl player">
                <div class="player-name">Player Name:${player.fullname}</div>
                <div class="player-position">Player Position:${player.position}</div>
                <div class="player-team">Player Team:${player.pro_team}</div>
                <div><button onclick="app.controllers.nflController.getAddToMyTeam(${player.id})">Add</div>
            </div>
        `
        }
        playerElem.innerHTML = playerTemplate
    }

    // function drawToMyTeam(myTeamList) {
    //     var myTeamTemplate = ''
    //     var teamElem = document.getElementById('my-team') 
    //         console.log("hello")

    //     for (var i = 0; i < myTeamList.length; i++){
    //         var player = myTeamList[i]
    //         console.log(myTeamList)
    //         myTeamTemplate += `
    //         <div class="col-xs-4 player-card">
    //             <img src="${player.photo}" style=height:100px width:100px alt="nfl player">
    //             <div class="player-name">Player Name:${player.fullname}</div>
    //             <div class="player-position">Player Position:${player.position}</div>
    //             <div class="player-team">Player Team:${player.pro_team}</div>
    //             <div><button onclick="app.controllers.nflController.getAddToMyTeam(${player.id})">Add</div>
    //         </div>
    //     `
    //     }
    //     teamElem.innerHTML = myTeamTemplate
    // }


    //Public parts

    //Search button gets this function first
    this.getPlayer = function getPlayer(e) {
        e.preventDefault();
        var player = e.target.player.value;
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

    //TODO:  MAKE A SERVICE FUNCTION THAT DRAWS PLAYER TO MY TEAM ARRAY
    this.getAddToMyTeam = function (id) {
        nflService.getAddToMyTeam(id)
        drawToMyTeam(id)
    }


}