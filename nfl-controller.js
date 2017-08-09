function NflController() {
    //Private parts
    var loading = true; //Start the spinner
    var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var nflService = new NflService(apiUrl, ready);


    //function ready is the callback and is being called above in the NflService as a variable
    function ready(playersList, myTeam) {
        drawPlayers(playersList);
        drawTeam(myTeam)
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
        e.preventDefault();
        var form = event.target
        var name = e.target.player.value.toLowerCase()
        console.log(name)
        var list = nflService.getPlayersByName(name);
        drawPlayers(list)
        form.reset()
        
    }

    this.getAddToMyTeam = function (id) {
        nflService.getAddToMyTeam(id, drawTeam)
    }

    this.getRemoveFromMyTeam = function (id) {
        nflService.getRemoveFromMyTeam(id, drawTeam)
    }

    this.getPlayersByTeam = function getPlayersByTeam(e) {
        e.preventDefault();
        var form = event.target
        var team = e.target.team.value.toLowerCase()
        //console.log(team)
        var list = nflService.getPlayersByTeam(team)
        drawPlayers(list)
        form.reset()

    }

    this.getPlayersByPosition = function getPlayersByPosition(e){
        e.preventDefault();
        var form = event.target
        var position = e.target.position.value.toLowerCase()
        var list = nflService.getPlayersByPosition(position)
        drawPlayers(list)
        form.reset()
    }

}