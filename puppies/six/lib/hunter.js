/** 
 * @module hunter 
 * @exports Hunter
 * @version 0.1.0
 */

(function() {
    function Hunter() {
        // where can we find those meddling kids
        this.listpath = "list/"
        this.listglob = "**/*.json";
        
        // globbing up your filesystem
        this.glob = require('glob');
        
        // filesysteming up your filesystem
        this.fs = require('fs');
        
        // this makes readFileSync play nicely
        this.fs_options = {
            encoding: 'utf8'
        };
        
        // where the wild things are
        this.output = {};
    };
    
    /**
     * Trumpet Sounds
     *
     * @param {Object} grunt - our grunt object so we have access to it's helper functions
     */
    Hunter.prototype.hunt = function(options) {
        this.options = options;
        
        // recurse through all the public list files
        // and build ourselves some sweet, sweet outputs
        this.glob.sync(this.options.srcpath + this.listpath + this.listglob).forEach(this._build.bind(this));
        
        return this.output;
    };
    
    /**
     * The one guy at the construction site actually doing anything
     *
     * @param {String} filename
     */
    Hunter.prototype._build = function(filename) {
        var data = JSON.parse(this.fs.readFileSync(filename, this.fs_options)),
            filename_array = filename.split('.');
            
        // get final destination filename
        filename_array.pop();
        var filetype = filename_array.pop();
        
        // build the full filepath, and remove the bit we don't want
        var dest = this.options.destpath + filename_array.join('.');
        dest = dest.replace(this.options.srcpath + this.listpath, "");
        
        var build_options = {
            type: data.type,
            dest: dest,
            files: data.files,
            watch: data.watch
        };
        
        // we always want to at least build things
        this._add_to_output('build', filetype, build_options);
        
        switch (filetype) {
            case 'less':
                this._add_to_output('less', 'css', build_options);
                build_options.files = [dest + '.css'];
                // yes, fall through
            case 'css':
                this._add_to_output('css', 'min.css', build_options);
                break;
            case 'coffee':
                this._add_to_output('coffee', 'js', build_options);
                build_options.files = [dest + '.js'];
                // yes, fall through
            case 'js':
                this._add_to_output('js', 'min.js', build_options);
                break;
        }
    }
    
    /**
     * actually do the adding
     *
     * @param {String} output_type - filetype
     * @param {String} frequency_type "volatile"|"static"
     * @param {String} dest - name of destination file
     * @param {Array} files - which files go into dest
     */
    Hunter.prototype._add_to_output = function(output_type, filetype, options) {
        if (this.output[output_type] === undefined) {
            this.output[output_type] = {"volatile":{"files": {}, "watch": []}, "static": {"files": {}}};
        }
        
        // add files to the propery authority
        var dest_filename = options.dest + '.' + filetype;
        this.output[output_type][options.type].files[dest_filename] = options.files;
        
        // build watch files array
        if (options.type == 'volatile') {
            if (!options.watch) {
                var self = this;
                options.files.forEach(function(file) {
                    self.output[output_type][options.type].watch.push(file);
                });
            } else {
                this.output[output_type][options.type].watch = options.watch;
            }
        }
    }
    
    module.exports = new Hunter();
})();