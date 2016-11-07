var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader');



function getRepoContributors(repoOwner, repoName, cb){

var GITHUB_USER = "SvemirskiHod";
var GITHUB_TOKEN = "f9e45c29a26822f62459d5a506e6b091fce71bd8";
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
console.log(requestURL);

  request({url: requestURL,
           headers: {'User-Agent': 'request'},
          },
         function(err, response, body) {
    cb(err, JSON.parse(body));
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

  // auth: {
           //  'user': 'SvemirskiHod',
           //  'pass': 'f9e45c29a26822f62459d5a506e6b091fce71bd8',
           //  }