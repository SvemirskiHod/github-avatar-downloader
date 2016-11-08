require('dotenv').config();
const token = process.env.token;
const userName = process.env.userName; //requiring token as to not push token to gitHub
const gitUtilities = require('./git_utilities');

console.log('Welcome to the GitHub Avatar Downloader');

const input = process.argv.slice(2);
if(input.length !== 2){ //will give error if number of arguments is not equal to 2
  console.log("Error! Specify two arguments: Repo Owner and the Repo Name, in that order");
}
else {
  gitUtilities.getRepoContributors(userName, token, input[0], input[1], function(err, result) { // This runs the program by calling the functions
    result.forEach(function(elm){
      const avatarUrl = elm["avatar_url"];
      const login = elm["login"];
      const path = `./avatars/${login}.jpg`;
      gitUtilities.downloadImageByUrl(avatarUrl, path);
    })
  });
}



