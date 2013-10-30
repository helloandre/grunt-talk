module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            simple: {
                files: {
                    'public/app.min.js': ['src/jquery.js', 'src/app.js']
                }
            }
        } 
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
};