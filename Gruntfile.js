// Gruntfile.js
"use strict";

module.exports = function(grunt) {
    grunt.initConfig({

        // bring in file contents
        pkg: grunt.file.readJSON("package.json"),

        nodemon: {
            dev: {
                script: './app.js'
            }
        },

        // jshint to validate js files
        jshint: {
            files: [
                "**/*.js"
            ],
            options: {
                ignores: [
                    "./node_modules/**",
                    "./build/**",
                    "./Gruntfile.js",
                    "./test/**",
                    "./public/src/js/landing/jqBootstrapValidation.js"
                ],
                reporter: require('jshint-stylish')
            },
        },

        // annotate the angularjs files, because we do not use array syntax
        ngAnnotate: {
            options: {
                singleQuotes: true,
                add: true
            },
            app: {
                files: [{
                    expand: true,
                    src: ['./public/src/**/*.js'],
                }]
            }
        },

        // uglify/minify our files to reduce file size
        uglify: {
            dev: {
                files: {
                    'public/build/dev/min/js/app.min.js': ['public/src/js/*.js'],
                    'public/build/dev/min/js/landing/landing.min.js': ['public/src/js/landing/*.js']
                }
            }
        },

        // minify our css
        cssmin: {
            target: {
                files: {
                    'public/build/dev/min/css/index.min.css': ['public/src/css/*.css'],
                    'public/build/dev/min/css/landing/agency.min.css': ['public/src/css/landing/*.css']
                }
            }
        },

        // copy the rest of the static files so that all static content will be deployed from build
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'public/src/', src: ['libs/**'], dest: 'public/build/dev/'}
                ]
            }
        },

        // cleans build directory
        clean: {
            folder: ['./public/build/**'],
            css: ['./public/build/dev/min/css/*.css'],
            js: ['./public/build/dev/min/js/*.js']
        },

        // watch our static files for change, and then run our tasks on them
        watch: {
            css: {
                files: ['./public/src/css/*.css'],
                task: ['clean:css', 'cssmin']
            },
            js: {
                files: ['./public/src/js/*.js'],
                tasks: ['clean:js', 'jshint', 'ngAnnotate', 'uglify']
            },
            libs: {
                files: ['./public/src/libs/'],
                tasks: ['copy']
            }
        },

        // this allows us to run two concurrent tasks: nodemon, and watch
        concurrent: {
            options: {
                logConcurrentOutput: true
            },

            tasks: ['nodemon', 'watch']
        }
    });

    // load grunt tasks
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    // create tasks
    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('clean' ['clean']);
    grunt.registerTask('dev', ['clean', 'jshint', 'ngAnnotate', 'uglify', 'cssmin', 'copy', 'concurrent']);
    grunt.registerTask('production', ['clean', 'jshint', 'ngAnnotate', 'uglify', 'cssmin', 'copy']);
};