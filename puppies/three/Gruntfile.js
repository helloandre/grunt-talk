module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            simple: {
                files: {
                    '<%= pkg.srcpath %>css/bootstrap.css': [
                        '<%= pkg.srcpath %>less/bootstrap.less'
                    ]
                }
            }
        },
        cssmin: {
            simple: {
                files: {
                    '<%= pkg.destpath %>css/bootstrap.min.css': [
                        '<%= pkg.srcpath %>css/bootstrap.css'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['less', 'cssmin']);
};