require('dotenv').config();
const request = require('request');
const token = process.env.token;
const userName = process.env.userName; //requiring token as to not push token to gitHub
const fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader');
const input = process.argv.slice(2);

const createUrl = function (userName, token, repoOwner, repoName){
  return requestURL = `https://${userName}:${token}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
}

const downloadImageByUrl = function (url, filePath){
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

const getRepoContributors = function (cb){
  request({
    url: createUrl(userName, token, input[0],input[1]),
    headers: {'User-Agent': 'request'},
  },
  function(err, response, body) {
    if(err) {
      console.log(err);
    } else {
      cb(err, JSON.parse(body));
    }
  }
  );
}

if(input.length !== 2){ //will give error if number of arguments is not equal to 2
  console.log("Error! Specify two arguments: Repo Owner and the Repo Name, in that order");
}
else {
  getRepoContributors(function(err, result) { // This runs the program by calling the functions
    result.forEach(function(elm){
      const avatarUrl = elm["avatar_url"];
      const login = elm["login"];
      const path = "./avatars/" + login + ".jpg";
      downloadImageByUrl(avatarUrl, path);
    })
  });
}



