module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            simple: {
                files: {
                    '<%= pkg.destpath %>app.min.js': ['<%= pkg.srcpath %>app.js']
                }
            }
        } 
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
};