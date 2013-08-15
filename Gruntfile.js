module.exports = function(grunt) {

    var config = {
        coffee: {
            files: {
                "script.js": ['js/*.coffee']
            }
        },
        cssmin: {
            combine: {
                files: {
                    'styles.css': ['css/*.css']
                }
            }
        },
        shell: {
            jekyll: {
                options: {
                    stdout: true
                },
                command: "rm -rf _site/; jekyll build",
            },
            copyAssets: {
                command: "cp -f styles.css _site/styles.css; cp -f script.js _site/script.js; cp -rf images _site/"
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true, // tell Grunt where to find our images and where to export them to.
                        cwd: '_site/',
                        src: ['**/*.html'],
                        dest: '_site/',
                        ext: '.html'
                    }
                ]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            jekyll: {
                files: ["index.html", "_posts/**/*", "_layouts/**/*"],
                tasks: ["shell:jekyll", 'shell:copyAssets', "htmlmin"]
            },
            css: {
                files: ["css/*.css"],
                tasks: ["cssmin", "shell:copyAssets"]
            },
            coffee: {
                files: ["js/*.coffee"],
                tasks: ["coffee", "shell:copyAssets"]
            },
            assets: {
                files: ["images/**/*"],
                tasks: ['shell:copyAssets']
            }
        },
        connect: {
            server: {
                options: {
                    base: "_site",
                    hostname: "*"
                }
            }
        }
    }

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['cssmin', 'coffee', 'shell:jekyll', 'htmlmin', 'shell:copyAssets']);
    grunt.registerTask('server', ['cssmin', 'coffee', 'shell:jekyll', 'shell:copyAssets', 'connect', 'watch']);
}
