var request = require('request');
var token = require("../token.js");
console.log('Welcome to the GitHub Avatar Downloader');
var require


function getRepoContributors(repoOwner, repoName, cb){

var GITHUB_USER = "SvemirskiHod";
var GITHUB_TOKEN = token.token;
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  request({url: requestURL,
           headers: {'User-Agent': 'request'},
          },
         function(err, response, body) {
    cb(err, JSON.parse(body));
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(elm){
    console.log(elm['avatar_url'])
  });
});
