#!/usr/bin/env node

require('colors');
var program = require('commander');
var promise = require('promise');
var spawn = require('child_process').spawn;
var pkg = require('./package.json');
var CWD = process.cwd();

var startDate = new Date();
var counter = 0;

program.version(pkg.version)
	.option('-t, --time <n>', 'seconds between two commits', parseFloat)
	.option('-p, --push <n>', 'push to specified remote after commit')
	.option('-b, --branch <n>', 'name of the branch to push')
	.parse(process.argv);

function run(command, args) {
  return new Promise(function(resolve, reject) {
    var task = spawn(command, args, {
    	cwd: CWD
    });
    task.on('close', function(code) {
      if (code !== 0) reject(new Error(command + ' process exited with code ' + code));
      else resolve();
    });
    task.stdout.pipe(process.stdout);
    task.stderr.pipe(process.stderr);
  });
}
function getFormattedDate(date)
{
  return date.getFullYear()+
        pad(d.getMonth())
        pad(d.getDate())+
        pad(d.getHours())+
        pad(d.getMinutes())+
        pad(d.getSeconds());
}
function addAll() {
	return run('git', ['add', '--all']);
}

function commit() {
  counter = counter + 1;
	return run('git', ['commit', '-m', '"[GIT AUTO COMMIT]: ' + new Date().toString() + '"']);
}

function push(){
  if(program.push !== undefined)
  {
    if(program.branch === undefined)
    {
      program.branch = "master";
    }
    return run('git',['push',program.push,program.branch]);
  } else {
    return Promise.resolve();
  }
}

setInterval(function() {
  Promise.resolve()
    .then(addAll)
    .then(commit)
    .then(push)
    .then(function() {
		console.log(('[GIT AUTO COMMIT]: Commit success at ' + (new Date()).toString()).green);
	}).catch(function (e) {
		console.log(('[GIT AUTO COMMIT]: ' + e.message).red);
	});
}, (program.time || 300) * 1000);