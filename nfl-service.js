function NflService(apiUrl, callback) {
    //Private parts
    var playersData = []
    var myTeam = []


    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback(playersData);
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "http://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback()
        });
    }

    loadPlayersData()


    function saveMyTeam(){
        localStorage.setItem('myTeam', JSON.stringify(myTeam))
    }

    //public parts


    //Pushes player selected to MyTeam array
    this.getAddToMyTeam = function (id, callback) {
        //TODO: char might need to be changed to player or player to char
        var player = playersData.find(char => char.id == id)

        if (myTeam.indexOf(player) == -1) {
            myTeam.push(player)
            callback(myTeam)
        }
            saveMyTeam()
    }

    //Removes selected player via the remove button.
    //Checks to see if the player exists then splices the player from the array
    //recalls myteam
    this.getRemoveFromMyTeam = function (id, callback) {
        var player = playersData.find(char => char.id == id)
        var position = myTeam.indexOf(player);
        if (position != -1) {
            myTeam.splice(position, 1)
        }
        callback(myTeam)
    }

    this.getPlayersByTeam = function (teamName) {
        var list = playersData.filter(function (player) {
            if (player.pro_team.toLowerCase() == teamName) { //added value pro_team instead of team
                return true;
            }
        });
    }

    this.getPlayersByName = function(playerName){
        var list = playersData.filter(function (player) {
            //console.log(player)
            // if (player.fullname == playerName || player.firstname == playerName|| player.lastname == playerName) { //added value pro_team instead of team
            //     console.log(player)
            //     return true;
            // }
            if (player.firstname.toLowerCase() == playerName) {
                console.log(player)
                return true;
            }
            if (player.lastname.toLowerCase() == playerName) {
                console.log(player)
                return true;
            }
            if (player.fullname.toLowerCase() == playerName) {
                console.log(player)
                return true;
            }
        });
        console.log(list)
        return list
    }

    this.getPlayersByPosition = function (position) {
        var list = playersData.filter(function (player) {
            if (player.position.toLowerCase() == position) {
                return true;
            }
        });
        return list
    }
}