Geekuillaume Blog
=================

This repository host my personal blog built with Jekyll.
Much more to come, stay tuned !

Dependancies
------------

- [Ruby](http://www.ruby-lang.org/en/) to use [Jekyll](http://jekyllrb.com/) for site building
- [Node.js](http://nodejs.org/) to use [Grunt](http://gruntjs.com/)
- [optipng](http://optipng.sourceforge.net/) and [jpegtran](http://jpegclub.org/jpegtran/) for image optimization

Installation
------------

- Install Jekyll with `gem install jekyll`
- Run `npm install` to install all Node.js dependancies
- Install Grunt CLI with `npm install -g grunt-cli` (as root or with sudo)
- On Debian / Ubuntu and other, use `apt-get install optipng libjpeg libjpeg-progs` to install optipng and jpegtran. On other plateforms, see respectives sites to installation instructions

Usage
-----

- Use `grunt` to lauch the optimization of assets (css / js / images) and site building with Jekyll
- The site is now ready and stored in the _site directory. You just have to serve it with you favorite Web server (like [nginx](http://nginx.org/))

You can also use the `grunt server` command to watch for changes in your files or posts and automatically rebuild what's need to be rebuilt and serve it on the 8000 port (accessible on the addres http://127.0.0.1:8000/).
