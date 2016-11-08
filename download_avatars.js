var request = require('request');
var token = require("../token.js"); //requiring token as to not push token to gitHub
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb){
  var GITHUB_USER = "SvemirskiHod";
  var GITHUB_TOKEN = token.token;
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  request({
    url: requestURL,
    headers: {'User-Agent': 'request'},
  },
  function(err, response, body) {
    if(err) {
      console.log(err);
    } else {
      var data = !!body ? JSON.parse(body) : [];
      cb(err, data);
    }
  }
  );
}

getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function(elm){
    var avatarUrl = elm["avatar_url"];
    var login = elm["login"];
    var path = "./avatars/" + login + ".jpg";
    // console.log(path);
    // console.log(avatarUrl);
    downloadImageByUrl(avatarUrl, path);
  })
});

function downloadImageByUrl(url, filePath){
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

