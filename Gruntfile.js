/* global module:false */
module.exports = function(grunt) {
    var port = grunt.option('port') || 8000;
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        qunit: {
            files: [ 'test/*.html' ]
        },

        uglify: {
            build: {
                src: 'reveal.js/js/reveal.js',
                dest: 'reveal.js/js/reveal.min.js'
            }
        },

        cssmin: {
            compress: {
                files: {
                    'reveal.js/css/reveal.min.css': [ 'reveal.js/css/reveal.css' ],
                    'reveal.js/css/preso.min.css': [ 'reveal.js/css/preso.css' ],
                }
            }
        },

        exec: {
          generate: {
            cmd: 'slides generate'
          }
        },

        sass: {
            main: {
                files: {
                    // 'css/theme/default.css': 'css/theme/source/default.scss',
                    // 'css/theme/beige.css': 'css/theme/source/beige.scss',
                    // 'css/theme/night.css': 'css/theme/source/night.scss',
                    // 'css/theme/serif.css': 'css/theme/source/serif.scss',
                    // 'css/theme/simple.css': 'css/theme/source/simple.scss',
                    // 'css/theme/sky.css': 'css/theme/source/sky.scss',
                    // 'css/theme/moon.css': 'css/theme/source/moon.scss',
                    // 'css/theme/solarized.css': 'css/theme/source/solarized.scss',
                    // 'css/theme/blood.css': 'css/theme/source/blood.scss',
                    'css/preso.css': 'sass/preso.scss',
                }
            }
        },

        jshint: {
            options: {
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                expr: true,
                globals: {
                    head: false,
                    module: false,
                    console: false,
                    unescape: false
                }
            },
            files: [ 'Gruntfile.js', 'js/reveal.js' ]
        },

        connect: {
            server: {
                options: {
                    port: port,
                    base: '.'
                }
            }
        },

        // zip: {
        //     'presentation-church-history.zip': [
        //         'index.html',
        //         'css/**',
        //         'js/**',
        //         'lib/**',
        //         'images/**',
        //         'plugin/**'
        //     ]
        // },

        watch: {
            main: {
                files: [ 'Gruntfile.js', 'js/reveal.js', 'css/reveal.css', '*.adoc', 'src/slides/*.adoc' ],
                tasks: 'default'
            },
            theme: {
                files: [ 'css/theme/source/*.scss', 'css/theme/template/*.scss' ],
                tasks: 'themes'
            },
            sass: {
                files: [ 'sass/*.scss' ],
                tasks: ['sass', 'cssmin']
            },
        }

    });

    // Dependencies
    grunt.loadNpmTasks( 'grunt-contrib-qunit' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    // grunt.loadNpmTasks( 'grunt-zip' );
    grunt.loadNpmTasks( 'grunt-exec' );

    // Default task
    grunt.registerTask( 'default', [ 'exec:generate' ] );
    // grunt.registerTask( 'default', [ 'jshint', 'cssmin', 'uglify', 'exec:generate' ] );

    // Theme task
    grunt.registerTask( 'themes', [ 'sass' ] );

    // Package presentation to archive
    // grunt.registerTask( 'package', [ 'default', 'zip' ] );

    // Serve presentation locally
    grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

    // Run tests
    grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

};
