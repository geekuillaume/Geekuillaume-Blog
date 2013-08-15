var exec = require('child_process').exec;
var http = require('http');

var PORT = 8042

var gitPull = function (callback) {
    console.log("Pulling repo from Github");
    exec("git pull origin master", function(error, stdout, stderr) {
        console.log("Repo up-to-date");
        callback && callback();
    });
}

var gruntBuild = function (callback) {
    console.log("Building site");
    exec("grunt", function(error, stdout, stderr) {
        console.log("Site built in _site directory");
        callback && callback();
    });
}

var server = http.createServer();

server.on('request', function(request, response) {
    gitPull(gruntBuild);
    response.end();
});

server.listen(PORT);
