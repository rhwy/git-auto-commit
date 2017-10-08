#!/usr/bin/env node

require('colors');
var program = require('commander');
var promise = require('promise');
var spawn = require('child_process').spawn;
var pkg = require('./package.json');
var CWD = process.cwd();

var startDate = new Date();
var counter = 1;

program.version(pkg.version)
	.option('-t, --time <n>', 'seconds between two auto commits', parseFloat)
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
function pad(n){ return (n<10) ? "0" + n : n ;} 

function getFormattedDate(date)
{
  return date.getFullYear() + "" +
        pad(date.getMonth()+1) + "" + 
        pad(date.getDate()) + ""+
        pad(date.getHours()) + ""+
        pad(date.getMinutes()) + "";
}

function addAll() {
	return run('git', ['add', '--all']);
}

/** 
 * This action will create a new commit based on all changes.
 * It will apply a message with the following pattern:
 * [GAW]: {date}-{counter}
 * where: 
 *   - GAW is a marker for GIT-AUTO-WORK
 *   - {date} is a textual sortable date in YYYYMMDDHHmm format
 *   - {counter} is the internal counter of this session, starting at 1 */
function commit() {
  return run('git', ['commit', '-m', '[GAW]: ' + getFormattedDate(startDate) + '-' + counter ]);
}

/**
 * This action will push commited work to the specied origin and branch if correctly defined.
 * it has to have the options:
 *   -p (push) with the remote name
 *   -b (branch) with the remote branch name (whereas it will be `master` by default)
 */
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
      var actionDone = "Commit";
      if(program.push !==undefined)
      {
        counter = counter + 1;
        actionDone = "Commit & push";
      }
      console.log(('[GAW]: ' + actionDone + ' success at ' + (new Date()).toString()).green);
    }).catch(function (e) {
      console.log(('[GAW]: ' + e.message).red);
    });
}, (program.time || 300) * 1000);