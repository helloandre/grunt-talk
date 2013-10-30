module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            static: {
                files: {
                    '<%= pkg.destpath %>css/base.css': [
                        '<%= pkg.srcpath %>less/bootstrap/bootstrap.less'
                    ]
                }
            },
            volatile: {
                files: {
                    '<%= pkg.destpath %>css/app.css': [
                        '<%= pkg.srcpath %>less/app.less'
                    ]
                }
            }
        },
        cssmin: {
            static: {
                files: {
                    '<%= pkg.destpath %>css/base.min.css': [
                        '<%= pkg.destpath %>css/base.css'
                    ]
                }
            },
            volatile: {
                files: {
                    '<%= pkg.destpath %>css/app.min.css': [
                        '<%= pkg.destpath %>css/app.css'
                    ]
                }
            }
        },
        watch: {
            css: {
                tasks: ['less:volatile', 'cssmin:volatile'],
                files: ['<%= pkg.srcpath %>less/**', '!<%= pkg.srcpath %>less/bootstrap/**']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['less', 'cssmin', 'watch']);
};