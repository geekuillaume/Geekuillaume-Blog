module.exports = function(grunt) {

    var config = {
        coffee: {
            files: {
                "tmp/script.js": ['js/*.coffee']
            }
        },
        cssmin: {
            combine: {
                files: {
                    'tmp/styles.css': ['css/*.css']
                }
            }
        },
        shell: {
            jekyll: {
                options: {
                    stdout: true
                },
                command: "jekyll build",
            },
            copyAssets: {
                command: "cp -f tmp/styles.css dist/styles.css; cp -f tmp/script.js dist/script.js; cp -rf images dist/"
            },
            copyFinal: {
                command: "rm -rf dist; mv _site dist/"
            },
            clean: {
                command: "rm -rf tmp"
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
                        cwd: 'dist/',
                        src: ['**/*.html'],
                        dest: 'dist/',
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
                files: ["index.html", "_posts/**/*", "_layouts/**/*", "_config.yml"],
                tasks: ["shell:jekyll", "shell:copyFinal", 'shell:copyAssets', "htmlmin"]
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
                    base: "dist",
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

    grunt.registerTask('default', ['cssmin', 'coffee', 'shell:jekyll', 'shell:copyFinal', 'htmlmin', 'shell:copyAssets', 'shell:clean']);
    grunt.registerTask('server', ['cssmin', 'coffee', 'shell:jekyll', 'shell:copyFinal', 'htmlmin', 'shell:copyAssets', 'connect', 'watch']);
}
