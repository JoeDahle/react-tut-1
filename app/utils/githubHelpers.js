var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo(username){
  return axios.get('https://api.github.com/users/' + username + param)
}

function getRepos(username){
  return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100')
}

function getStars(repos){
  // calc total stars a user has
  return repos.data.reduce(function(prev, current){
    return prev + current.stargazers_count
  }, 0)
}

function getPlayerData(player){
  // get tepos
  // get total stars
  // return obj with that data
  return getRepos(player.login)
    .then(getStars)
    .then(function(totalStars){
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
}

function calcScores(player){
  return [
    player[0].followers * 3 + player[0].totalStars,
    player[1].followers * 3 + player[1].totalStars
  ]
}

var helpers = {
  getPlayersInfo: function(players){
    return axios.all(player.map(function(username){
      return getUserInfo(username)
    })).then(function(info){
      return info.map(function(user){
        return user.data
      })
    }).catch(function(err){
      console.warn('Error in getPlayersInfo', err)
    })
  },
  battle: function(players){
    var playerOneData = getPlayerData(players[0]);
    var playerTwoData = getPlayerData(players[1])

    return axios.all([playerOneData, playerTwoData])
      .then(calcScores)
      .catch(function(err) {console.warn('Err in getPlayersInfo: ', err);})
  }
};

module.exports = helpers;
