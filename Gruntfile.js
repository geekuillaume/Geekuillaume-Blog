module.exports = function(grunt) {

    var config = {
        coffee: {
            files: {
                "js/script.js": ['js/*.coffee']
            }
        },
        cssmin: {
            combine: {
                files: {
                    'css/styles.css': ['css/*.css']
                }
            }
        },
        shell: {
            jekyll: {
                options: {
                    stdout: true
                },
                command: "rm -rf _site/; jekyll build",
            }
        },
        watch: {
            options: {
                livereload: true
            },
            all: {
                files: ["_posts/**/*", "css/*", "js/*"],
                tasks: ["cssmin", "coffee", "shell:jekyll"]
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

    grunt.registerTask('default', ['cssmin', 'coffee', 'shell:jekyll']);
    grunt.registerTask('server', ['cssmin', 'coffee', 'shell:jekyll', 'connect', 'watch']);
}
