module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	jshint: {
    	all: ['src/utils.js'],
		options : {
			esversion : 6
		}
	},
	babel: {
	    options: {
	      sourceMap: true,
		  compact : false,
		  presets: ['babel-preset-es2015']
	    },
	    dist: {
	      files: {
	        "dist/utils.js": "src/utils.js"
	      }
	    }
	}, 
	jsdoc : {
        dist : {
            src: ['src/utils.js'],
            options: {
                destination: 'documentation'
            }
        }
    },
	  watch: {
		  scripts: {
		    files: ['src/*.js'],
		    tasks: ['jshint', 'babel'],
		    options: {
		      spawn: false,
		    },
		 },
	},
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch'], ['test']);
  grunt.registerTask('dev', ['jsdoc', 'babel']);

};