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
        var playerElem = document.getElementById('player-roster')
        playerElem.innerHTML = ''
        var playerTemplate = ''

        //Full player team draw function
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

    //My Team player draw function
    function drawTeam(myTeamList) {

        var teamElem = document.getElementById('my-team')
        teamElem.innerHTML = ''
        var myTeamTemplate = ''
        if (myTeamList === null) {
            return
        } else {
            //TODO:  Need to add a remove button when player pushed to my team
            for (var i in myTeamList) {
                var player = myTeamList[i]
                //console.log(player)
                myTeamTemplate += `
            <div class="col-xs-4 player-card">
                <img src="${player.photo}" style=height:100px width:100px alt="nfl player">
                <div class="player-name">Player Name:${player.fullname}</div>
                <div class="player-position">Player Position:${player.position}</div>
                <div class="player-team">Player Team:${player.pro_team}</div>
                <div><button onclick="app.controllers.nflController.getRemoveFromMyTeam(${player.id})">Remove</div>
            `
            }
            teamElem.innerHTML = myTeamTemplate
        }
    }


    //Public parts

    //Search button gets this function first
    this.getPlayer = function getPlayer(e) {
        debugger
        e.preventDefault();
        var player = e.target.player.value
        nflService.getPlayer(player).then(drawTeam);
    }

    this.getAddToMyTeam = function (id) {
        nflService.getAddToMyTeam(id, drawTeam)
    }

    this.getRemoveFromMyTeam = function (id) {
        nflService.getRemoveFromMyTeam(id, drawTeam)
    }

    this.getPlayersByTeam = function (teamName){
        
    }

}