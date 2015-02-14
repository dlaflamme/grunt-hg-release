/*
 * grunt-hg-release
 * https://github.com/accordionpeas/grunt-hg-release
 *
 */

'use strict';

module.exports = function(grunt) {

	grunt.registerTask('hg_release', 'Release a new version of your Node-based project using hg/Mercurial', function(type) {
	
		type = type || 'patch';
		var done = this.async(),
			options = this.options({
				commit: 'release-<%= version %>',
				tag: 'release-<%= version %>',
				checkUncommittedChanges: [],
				push: false
			});
			
		checkForUncommittedChanges();

		function checkForUncommittedChanges() {
			if (options.checkUncommittedChanges.length === 0) bump();
			grunt.util.spawn({ cmd: "hg", args: ["status"].concat(options.checkUncommittedChanges) }, function(err, result) {
				if (err) grunt.fail.fatal(err);
				var uncommitted = result.stdout;
				if (uncommitted.length > 0) {
				    var message = "\"checkUncommittedChanges\" is set and there are uncommitted changes"
					+ " in the working directory:\n" + uncommitted;
				    grunt.fail.fatal(message);
				}
				bump();
			});
		}

		function bump() {
			grunt.util.spawn({ cmd: "npm", args: [ "version", type ] }, function(err, result){
				if (err) grunt.fail.fatal(err);
				var version = result.stdout.substr(1);
				commit(version);
			});
		}
		
		function commit(version){
			var commit = getMessage(options.commit, version);
			grunt.util.spawn({ cmd: "hg", args: [ "commit", "-m", "\"" + commit + "\"" ] }, function(err, result){
				if (err) grunt.fail.fatal(err);
				tag(version);
			});
		}
		
		function tag(version){
			var tag = getMessage(options.tag, version);
			grunt.util.spawn({ cmd: "hg", args: [ "tag", tag ] }, function(err, result){
				if (err) grunt.fail.fatal(err);
				grunt.log.ok('Bumped to version: ' + version);
				push();
			});
		}
		
		function push(){
			if (options.push === false) done();
			grunt.util.spawn({ cmd: "hg", args: [ "push" ] }, function(err, result){
				if (err) grunt.fail.fatal(err);
				grunt.log.ok('Pushed changes:');
				grunt.log.writeln(result.stdout);
				done();
			});
		}

		function getMessage(template, version){
			return grunt.template.process(template, {data: {version: version}});
		}
	
	});
	
};
