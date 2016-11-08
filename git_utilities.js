const request = require('request');
const fs = require('fs');

const createUrl = function (userName, token, repoOwner, repoName){
  return requestURL = `https://${userName}:${token}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
}

const downloadImageByUrl = function (url, filePath){
  request.get(url)
    .pipe(fs.createWriteStream(filePath));
}

const getRepoContributors = function (userName, token, repoOwner, repoName, cb){
  request({
    url: createUrl(userName, token, repoOwner, repoName),
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

module.exports = {
  getRepoContributors: getRepoContributors,
  downloadImageByUrl: downloadImageByUrl
}
