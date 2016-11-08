var request = require('request');
var token = require("../token.js"); //requiring token as to not push token to gitHub
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader');
var input = process.argv.slice(2);

if(input.length !== 2){ //will give error if number of arguments is not equal to 2
  console.log("Error! Specify two arguments: Repo Owner and the Repo Name, in that order");
}
else {
  getRepoContributors(input[0],input[1], function(err, result) { // This runs the program by calling the functions
    result.forEach(function(elm){
      var avatarUrl = elm["avatar_url"];
      var login = elm["login"];
      var path = "./avatars/" + login + ".jpg";
      downloadImageByUrl(avatarUrl, path);
    })
  });
}

function getRepoContributors(repoOwner, repoName, cb){
  var GITHUB_USER = "SvemirskiHod";
  var GITHUB_TOKEN = token.token; // implementing token from separate file
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  request({
    url: requestURL,
    headers: {'User-Agent': 'request'},
  },
  function(err, response, body) {
    if(err) {
      console.log(err);
    } else {
      var data = !!body ? JSON.parse(body) : []; // Mentor did this when we were trying to debug something. Probably not necessary, but I kept it.
      cb(err, data);
    }
  }
  );
}

function downloadImageByUrl(url, filePath){
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}