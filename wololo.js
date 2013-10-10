#!/usr/bin/env node
/*
 * Convert the origin of a Git repository, from Bitbucket to GitHub or GitHub to Bitbucket.
 *
 * @author Fernando A. Damião <me@fadamiao.com>
 * @note Created At: 2013-10-03 14:05
 * @note Last Update: 2013-10-04 16:05
 * @license BSD 3-Clause License
 *
 */


var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var repo_from, repo_to;

function grabRepo(error, stdout, stderr) {
    if (error !== null) {
        console.log('Error in grab the repository URL, please report the error!');
        process.exit(1);
    }

    var buff = stdout.split('\n'), repo;
    buff = trim(buff[0]).split(' ');
    repo = buff[1].replace(repo_from, repo_to);
    exec('git remote set-url origin ' + repo, setRepo)
}

function trim(string) {
    return string.replace(/\s+/g,' ');
}

function setRepo(error, stdout, stderr) {
    if (error !== null) {
        console.log('Error in change the repository, please report the error!');
        process.exit(1);
    }

    console.log('Wololo');
    process.exit(0);
}

if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.log('Error: This is not a Git repository!');
    process.exit(1);
}

if (args.length != 1) {
    console.log('Syntax: wololo <-g|--github | -b|--bitbucket>');
    process.exit(1);
}

if (args == '-b' || args == '--bitbucket') {
    repo_from = 'github.com';
    repo_to = 'bitbucket.org';
} else if (args == '-g' || args == '--github') {
    repo_from = 'bitbucket.org';
    repo_to = 'github.com';
} else {
    console.log('Syntax: wololo <-g|--github | -b|--bitbucket>');
    process.exit(1);
}

exec('git remote -v', grabRepo);
