module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd HH:MM:ss') %> */\n"
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    var hunter = require('./lib/hunter'),
        hunted = hunter.hunt(grunt.config('pkg'));
     
    // add any configs found by hunter   
    hunted.build.options = {banner: grunt.config('banner')};
    grunt.config.set('concat', hunted.build);
    
    if (hunted.less) {
        grunt.config.set('less', hunted.less);
    }
    if (hunted.coffee) {
        grunt.config.set('coffee', hunted.coffee);
    }
    if (hunted.css) {
        grunt.config.set('cssmin', hunted.css);
    }
    if (hunted.js) {
        grunt.config.set('uglify', hunted.js);
    }
    
    // only watch volatile stuff
    var watch = {};
    
    if (hunted.less) {
        watch.less = {
            tasks: ['concat:volatile', 'less:volatile', 'cssmin:volatile'],
            files: hunted.less.volatile.watch
        }
    } 
    if (hunted.css) {
        watch.css = {
            tasks: ['concat:volatile', 'cssmin:volatile'],
            files: hunted.css.volatile.watch
        }
    }
    
    // only add one or the other, not both
    if (hunted.coffee) {
        watch.coffee = {
            tasks: ['concat:volatile', 'coffee:volatile', 'uglify:volatile'],
            files: hunted.coffee.volatile.watch
        }
    } 
    if (hunted.js) {
        watch.js = {
            tasks: ['concat:volatile', 'uglify:volatile'],
            files: hunted.js.volatile.watch
        }
    }
    
    grunt.config.set('watch', watch);
    
    // run on everything
    grunt.registerTask('default', function() {
        // step 0 - concat everything
        grunt.task.run('concat');
        
        // step 1 - preprocessors
        if (hunted.less) {
            grunt.task.run('less');
        }
        if (hunted.coffee) {
            grunt.task.run('coffee');
        }
        
        // step 2 - compile/compress
        if (hunted.css) {
            grunt.task.run('cssmin');
        }
        if (hunted.js) {
            grunt.task.run('uglify');
        }
        
        grunt.task.run('watch');
    });
};