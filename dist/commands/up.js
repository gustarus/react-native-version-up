"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const displayCommandGreetings_1 = __importDefault(require("./../helpers/displayCommandGreetings"));
const displayCommandDone_1 = __importDefault(require("../helpers/displayCommandDone"));
const Package_1 = __importDefault(require("../models/Package"));
const resolveGreaterVersion_1 = __importDefault(require("../helpers/resolveGreaterVersion"));
const Plist_1 = __importDefault(require("../models/Plist"));
const Gradle_1 = __importDefault(require("../models/Gradle"));
const collectOptionValues_1 = __importDefault(require("../helpers/collectOptionValues"));
const resolveOptionValues_1 = __importDefault(require("../helpers/resolveOptionValues"));
const resolveString_1 = __importDefault(require("../helpers/resolveString"));
const displayCommandStep_1 = __importDefault(require("../helpers/displayCommandStep"));
const requiredPath_1 = __importDefault(require("../helpers/requiredPath"));
const requiredFormat_1 = __importDefault(require("../helpers/requiredFormat"));
const execSyncProgressDisplay_1 = __importDefault(require("../helpers/execSyncProgressDisplay"));
function up(program) {
    program
        .command('up')
        .description('Increase requested version inside react native application')
        .arguments('[path]')
        .option('--major', 'Increase major version (x.0.0)')
        .option('--minor', 'Increase minor version (0.x.0)')
        .option('--patch', 'Increase patch version (0.0.x)')
        .requiredOption('--path-to-package <package.json>', 'Path to application `package.json` file', '${path}/package.json')
        .requiredOption('--path-to-plist <Info.plist>', 'Path to ios `Info.plist` file', collectOptionValues_1.default, ['${path}/ios/${name}/Info.plist'])
        .requiredOption('--path-to-gradle <build.gradle>', 'Path to android `build.gradle` file', collectOptionValues_1.default, ['${path}/android/app/build.gradle'])
        .requiredOption(`--build-source <plist|gradle>`, 'Current build number source', 'plist')
        .option('--with-commit', 'Do git commit after version increased', false)
        .option('--commit-message', 'Git commit message', 'release ${version} (${build}): increase versions and build numbers')
        .option('--with-tag', 'Do git tag after commit', false)
        .option('--tag-label', 'Git tag label', 'v${version}')
        .option('--tag-message', 'Git tag message', 'release ${version} (${build})')
        .action(async (path, cmd) => {
        displayCommandGreetings_1.default(cmd);
        const { major, minor, patch, pathToPackage, pathToPlist, pathToGradle, buildSource, withCommit, commitMessage, withTag, tagLabel, tagMessage } = cmd;
        requiredFormat_1.default('build-source', buildSource, /^(plist|gradle)$/);
        const pathResolved = path || process.cwd();
        // resolve path to package
        const pathToPackageResolved = resolveString_1.default(pathToPackage, { path: pathResolved });
        requiredPath_1.default(pathToPackageResolved);
        // resolve package instance
        const info = new Package_1.default({ path: pathToPackageResolved });
        // resolve paths to platform specific files
        const replacements = { path: pathResolved, name: info.name, version: info.version };
        const pathToPlistResolved = resolveOptionValues_1.default(pathToPlist, replacements);
        const pathToGradleResolved = resolveOptionValues_1.default(pathToGradle, replacements);
        [...pathToPlistResolved, ...pathToGradleResolved].map(requiredPath_1.default);
        // resolve next versions
        const majorResolved = resolveGreaterVersion_1.default(info.major, major);
        const minorResolved = resolveGreaterVersion_1.default(info.minor, minor, major);
        const patchResolved = resolveGreaterVersion_1.default(info.patch, patch, major || minor);
        const versionResolved = `${majorResolved}.${minorResolved}.${patchResolved}`;
        if (versionResolved === info.version) {
            displayCommandStep_1.default(cmd, colors_1.default.bold.yellow(`Nothing changed in the version (${versionResolved}): canceled`));
            return;
        }
        // resolve next build number
        const source = ((type) => {
            if (type === 'plist') {
                return new Plist_1.default({ path: pathToPlistResolved[0] });
            }
            else if (type === 'gradle') {
                return new Gradle_1.default({ path: pathToGradleResolved[0] });
            }
        })(buildSource);
        const buildResolved = source.build + 1;
        displayCommandStep_1.default(cmd, colors_1.default.blue.bold('Version and build numbers will be changed'));
        displayCommandStep_1.default(cmd, `- from: ${colors_1.default.yellow(info.version)} (${colors_1.default.yellow(source.build.toString())})`);
        displayCommandStep_1.default(cmd, `- to:   ${colors_1.default.blue(versionResolved)} (${colors_1.default.blue(buildResolved.toString())})`);
        displayCommandStep_1.default(cmd, 'Inside this project files');
        displayCommandStep_1.default(cmd, `- package.json (${pathToPackageResolved});`);
        displayCommandStep_1.default(cmd, `- ios project (${pathToPlistResolved.join(', ')});`);
        displayCommandStep_1.default(cmd, `- android project (${pathToGradleResolved.join(', ')}).`);
        displayCommandStep_1.default(cmd, 'Updating version in package.json...');
        info.major = majorResolved;
        info.minor = minorResolved;
        info.patch = patchResolved;
        info.save();
        displayCommandStep_1.default(cmd, 'Updating version and build number in ios project...');
        for (const _path of pathToPlistResolved) {
            const plist = new Plist_1.default({ path: _path });
            plist.version = versionResolved;
            plist.build = buildResolved;
            plist.save();
        }
        displayCommandStep_1.default(cmd, 'Updating version and build number in android project...');
        for (const _path of pathToGradleResolved) {
            const gradle = new Gradle_1.default({ path: _path });
            gradle.version = versionResolved;
            gradle.build = buildResolved;
            gradle.save();
        }
        if (withCommit || withTag) {
            const variables = {
                version: versionResolved,
                major: majorResolved.toString(),
                minor: minorResolved.toString(),
                patch: pathResolved.toString(),
                build: buildResolved.toString()
            };
            if (withCommit) {
                displayCommandStep_1.default(cmd, 'Doing git commit...');
                const pathsToCommit = [pathToPackageResolved, ...pathToPlistResolved, ...pathToGradleResolved];
                execSyncProgressDisplay_1.default('git', 'add', pathsToCommit.join(' '));
                execSyncProgressDisplay_1.default('git', 'commit', { m: resolveString_1.default(commitMessage, variables) });
            }
            if (withTag) {
                displayCommandStep_1.default(cmd, 'Doing git tag...');
                if (withCommit) {
                    execSyncProgressDisplay_1.default('git', 'tag', {
                        a: resolveString_1.default(commitMessage, variables),
                        m: resolveString_1.default(tagMessage, variables)
                    });
                }
                else {
                    displayCommandStep_1.default(cmd, colors_1.default.yellow.bold('There is no git commit for this version done: git tag skipped'));
                }
            }
        }
        displayCommandDone_1.default(cmd);
    });
}
exports.default = up;
;
