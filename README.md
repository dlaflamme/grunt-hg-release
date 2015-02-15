# grunt-hg-release

> Release a new version of your Node-based project using hg/Mercurial

Grunt task to automate the following tasks:
- Check for uncommitted changes
- Bump version in package.json
- Commit to HG repo
- Tag HG repo
- Push to default destination

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hg-release --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hg-release');
```

## The "hg_release" task

### Overview
In your project's Gruntfile, add a section named `hg_release` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hg_release: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.commit
Type: `String`
Default value: `'release-<%= version %>'`

#### options.tag
Type: `String`
Default value: `'release-<%= version %>'`

The tag commit message.

#### options.checkUncommittedChanges
Type: `List`
Default value: `[]`

A list of options to be passed to 'hg status' to determine which files are shown (added, removed, deleted, etc.).
If any files match, there are uncommitted changes in the working directory and the release will fail.

#### options.push
Type: `Boolean`
Default value: `false`

If true, push to the default destination.

### Usage Examples


```js
// Project configuration. 
grunt.initConfig({
  hg_release: {
    options: {
      // message to use in commit message when committing changes from version bump
      commit: 'release-<%= version %>',

      // message to use in commit message when adding tag
      tag: 'release-<%= version %>',

      // "hg status" is run with the following options. If any files
      // match, indicating there are uncommitted changes, fail fast
      checkUncommittedChanges: ['--added', '--deleted', '--modified', '--removed'],

      // push changes after committing
      push: true
    }
  }
})

```

#### Patch release:
```js
grunt hg_release
```

or

```js
grunt hg_release:patch
```

#### Minor release:
```js
grunt hg_release:minor
```

#### Major release:
```js
grunt hg_release:major
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014-07-03	v0.2.1	Bumped version after pull request merge.
* 2014-07-03	v0.2.0	Log the new version to the console.
* 2014-01-16	v0.1.1	Fixed commit process.
* 2014-01-16	v0.1.0	Initial release.
