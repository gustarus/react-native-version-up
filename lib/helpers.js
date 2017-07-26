'use strict';

const fs = require('fs');
const exec = require('child_process').exec;

module.exports = {
  versions(raw) {
    return typeof raw === 'string'
      ? raw.split('.') : [];
  },

  version(raw, flag) {
    const parsed = parseInt(raw);
    const value = parsed >= 0 ? parsed : 0;
    return flag ? value + 1 : value;
  },

  getPackageInfo(pathToFile) {
    return JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
  },

  getBuildNumberFromPlist(pathToPlist) {
    const content = fs.readFileSync(pathToPlist, 'utf8');
    const match = content.match(/(<key>CFBundleVersion<\/key>\s+<string>)([\d\.]+)(<\/string>)/);
    if (match && match[2]) {
      return parseInt(match[2]);
    }

    return 1;
  },

  changeVersionInPackage(pathToFile, version) {
    let packageContent = fs.readFileSync(pathToFile, 'utf8');
    packageContent = packageContent.replace(/("version":\s*")([\d\.]+)(")/g, `$1${version}$3`);
    fs.writeFileSync(pathToFile, packageContent, 'utf8');
  },

  changeVersionAndBuildInPlist(pathToFile, version, build) {
    let content = fs.readFileSync(pathToFile, 'utf8');
    content = content.replace(/(<key>CFBundleShortVersionString<\/key>\s*<string>)([\d\.]+)(<\/string>)/g, `$1${version}$3`);
    content = content.replace(/(<key>CFBundleVersion<\/key>\s+<string>)([\d\.]+)(<\/string>)/g, `$1${build}$3`);
    fs.writeFileSync(pathToFile, content, 'utf8');
  },

  changeVersionAndBuildInGradle(pathToFile, version, build) {
    let content = fs.readFileSync(pathToFile, 'utf8');
    content = content.replace(/(\s*versionName\s+["']?)([\d\.]+)(["']?\s*)/g, `$1${version}$3`);
    content = content.replace(/(\s*versionCode\s+["']?)(\d+)(["']?\s*)/g, `$1${build}$3`);
    fs.writeFileSync(pathToFile, content, 'utf8');
  },

  commitVersionIncrease(version, message, pathsToAdd = []) {
    return new Promise((resolve, reject) => {
      exec(`git add ${pathsToAdd.join(' ')} && git commit -m '${message}' && git tag -a v${version} -m '${message}'`, error => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
};
