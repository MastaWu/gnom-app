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

        targethtml: {
            dist: {
                files: {
                    'public/dist/index.html': 'views/index.html'
                }
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
                    "./dist/**",
                    "./Gruntfile.js",
                    "./test/**",
                    "./public/src/landing/js/*.js"
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
                    'public/dist/js/app.min.js': ['public/src/js/**/*.js'],
                    'public/dist/js/landing/index.min.js': ['public/src/landing/js/**/*.js']
                }
            }
        },

        // minify our css
        cssmin: {
            target: {
                files: {
                    'public/dist/css/index.min.css': ['public/src/css/**/*.css'],
                    'public/dist/css/landing/index.min.css': ['public/src/landing/css/**/*.css']
                }
            }
        },

        // copy the rest of the static files so that all static content will be deployed from build
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'views/', src: ['views/**'], dest: 'public/dist/'},
                    { expand: true, cwd: 'public/src/', src: ['img/**'], dest: 'public/dist/'}
                ]
            }
        },

        // cleans build directory
        clean: {
            folder: ['./public/dist/**'],
            css: ['./public/dist/css/**/*.css'],
            js: ['./public/dist/js/**/*.js']
        },

        // watch our static files for change, and then run our tasks on them
        watch: {
            css: {
                files: ['./public/src/css/**/*.css'],
                task: ['cssmin']
            },
            js: {
                files: ['./public/src/js/**/*.js'],
                tasks: ['clean:js', 'jshint', 'ngAnnotate', 'uglify']
            },
            img: {
                files: ['./public/src/img/**'],
                tasks: ['copy']
            },
            html: {
                files: ['./views/index.html', './views/**/*.html'],
                options: {
                    livereload: true
                },
                tasks: ['targethtml', 'copy']
            }
        },

        // this allows us to run two concurrent tasks: nodemon, and watch
        concurrent: {
            options: {
                logConcurrentOutput: true
            },

            tasks: ['watch', 'nodemon']
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
    grunt.loadNpmTasks('grunt-targethtml');

    // create tasks
    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('clean' ['clean']);
    grunt.registerTask('build', ['clean', 'jshint', 'ngAnnotate', 'uglify', 'cssmin', 'copy', 'targethtml']);
    grunt.registerTask('dev', ['clean', 'jshint', 'ngAnnotate', 'uglify', 'cssmin', 'copy', 'targethtml', 'concurrent']);
    grunt.registerTask('production', ['clean', 'jshint', 'ngAnnotate', 'uglify', 'cssmin', 'copy', 'targethtml']);
};