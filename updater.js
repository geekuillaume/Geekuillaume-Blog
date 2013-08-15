var exec        = require('child_process').exec;
var http        = require('http');
var https       = require('https');
var querystring = require('querystring');

var PORT       = 8042 // Replace with a specific port
var cloudFlare = { // This section is optionnal, if you don't use CloudFlare just ignore it
    email: "", // Replace with your CloudFlare email
    token: "", // Replace with your CloudFlare API token
    domain: "besson.co", // Replace with the domain of your blog
    files: "http://blog.besson.co/*" // Optionnal, if you want to purge only some file(s)
}

var regenerateSite = function(callback) {
    gitPull(function() {
        gruntBuild(function() {
            purgeCloudFlare(function() {
                callback && callback()
            })
        })
    })
}

var gitPull = function (callback) {
    console.log("Pulling repo from Github");
    exec("git pull origin master", function(error, stdout, stderr) {
        console.log("Repo updated")
        callback && callback()
    });
}

var gruntBuild = function (callback) {
    console.log("Building site");
    exec("grunt", function(error, stdout, stderr) {
        console.log("Site built in _site directory")
        callback && callback()
    });
}

var purgeCloudFlare = function(callback) {
    if (!cloudFlare.email || !cloudFlare.token || !cloudFlare.domain)
        return callback && callback()
    console.log("Purge cache from CloudFlare")
    var post_data = querystring.stringify({
        a: "fpurge_ts",
        tkn: cloudFlare.token,
        email: cloudFlare.email,
        z: cloudFlare.domain,
        v: "1"
    })
    if (cloudFlare.files)
    {
        post_data.a = "zone_file_purge"
        post_data.url = cloudFlare.files
    }
    var req = https.request({
        hostname: "www.cloudflare.com",
        path: "/api_json.html",
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length
        }
    })
    req.write(post_data);
    req.end();
    console.log("Cache purged");
    callback && callback();
}

var server = http.createServer();

server.on('request', function(request, response) {
    console.log("========== Webhook request received ==============")
    regenerateSite()
    response.end()
});

server.listen(PORT)

console.log("Server listening on port : %s", PORT);
