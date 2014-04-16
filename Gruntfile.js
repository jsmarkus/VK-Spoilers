module.exports = function(grunt) {

  grunt.initConfig({

    dirTmp: '.tmp/',
    dirRelease: 'build/release/',
    dirDebug: 'build/debug/',

    uglify: {
      prod: {
        files: {
          '<%= dirRelease %>content.js': '<%= dirTmp %>content.js',
          '<%= dirRelease %>background.js': '<%= dirTmp %>background.js',
          '<%= dirRelease %>popup.js': '<%= dirTmp %>popup.js'
        }
      }
    },

    browserify: {
      options: {
        alias: [
          'bower_components/ground/ground.js:ground'
        ]
      },
      dev: {
        files: {
          '<%= dirDebug %>content.js': 'src/content.js',
          '<%= dirDebug %>background.js': 'src/background.js',
          '<%= dirDebug %>popup.js': 'src/popup.js'
        },
        options: {
          debug: true
        }
      },
      prod: {
        files: {
          '<%= dirTmp %>content.js': 'src/content.js',
          '<%= dirTmp %>background.js': 'src/background.js',
          '<%= dirTmp %>popup.js': 'src/popup.js'
        },
        options: {}
      }
    },

    watch: {
      dev: {
        files: [
          './src/**/*.js',
          './src/**/*.json',
          './src/**/*.html',
          './src/**/*.png',
          './src/**/*.less'
        ],
        tasks: [
          'browserify:dev',
          'less:dev',
          'copy:dev'
        ],
        options: {
          livereload: true,
          spawn: false,
          atBegin: true
        }
      }
    },

    less: {
      dev: {
        options: {
          compress: false,
          ieCompat: false,
          cleancss: true
        },
        files: {
          '<%= dirDebug %>popup.css': 'src/popup.less'
        }
      }
    },


    connect: {
      dev: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    copy: {
      dev: {
        files: [{
          expand: true,
          filter: 'isFile',
          cwd: 'src',
          src: '*.png',
          dest: '<%= dirDebug %>'
        }, {
          expand: true,
          filter: 'isFile',
          cwd: 'src',
          src: '*.html',
          dest: '<%= dirDebug %>'
        }, {
          src: 'src/manifest-debug.json',
          dest: '<%= dirDebug %>manifest.json'
        }]
      }
    }
  });



  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('debug', [
    'browserify:dev',
    'copy:dev'
  ]);

  grunt.registerTask('server', [
    'connect:dev',
    'watch:dev'
  ]);

  grunt.registerTask('release', [
    'browserify:prod',
    'uglify:prod'
  ]);

  grunt.registerTask('default', [
    'debug'
  ]);
};