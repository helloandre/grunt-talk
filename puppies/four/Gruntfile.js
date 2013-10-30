module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            static: {
                files: {
                    '<%= pkg.destpath %>base.min.js': [
                        '<%= pkg.srcpath %>lib/jquery.js',
                        '<%= pkg.srcpath %>lib/bootstrap.js'
                    ]
                }
            },
            volatile: {
                files: {
                    '<%= pkg.destpath %>app.min.js': [
                        '<%= pkg.srcpath %>app.js'
                    ]
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
};