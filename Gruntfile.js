module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                beautify: {
                    ascii_only: true
                }
            },
            build: {
                src: 'lib/micro-loader.js',
                dest: 'lib/micro-loader.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};