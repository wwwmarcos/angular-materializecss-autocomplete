module.exports = function(grunt) {
  grunt.initConfig({
    // insert the bower files in your index.html
    wiredep: {
      target: {
        src: 'index.html'
      }
    }
  });
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.registerTask('default', ['wiredep']);
};