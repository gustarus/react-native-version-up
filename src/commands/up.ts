import { Command } from 'commander';
import colors from 'colors';
import displayCommandGreetings from './../helpers/displayCommandGreetings';
import displayCommandDone from '../helpers/displayCommandDone';
import Package from '../models/Package';
import resolveGreaterVersion from '../helpers/resolveGreaterVersion';
import Plist from '../models/Plist';
import Gradle from '../models/Gradle';
import collectOptionValues from '../helpers/collectOptionValues';
import resolveOptionValues from '../helpers/resolveOptionValues';
import resolveString from '../helpers/resolveString';
import displayCommandStep from '../helpers/displayCommandStep';
import requiredPath from '../helpers/requiredPath';
import requiredFormat from '../helpers/requiredFormat';
import execSyncProgressDisplay from '../helpers/execSyncProgressDisplay';

export default function up(program: Command) {
  program
    .command('up')
    .description('Increase requested version inside react native application')
    .arguments('[path]')
    .option('--major', 'Increase major version (x.0.0)')
    .option('--minor', 'Increase minor version (0.x.0)')
    .option('--patch', 'Increase patch version (0.0.x)')
    .requiredOption('--path-to-package <package.json>', 'Path to application `package.json` file', '${path}/package.json')
    .requiredOption('--path-to-plist <Info.plist>', 'Path to ios `Info.plist` file', collectOptionValues, ['${path}/ios/${name}/Info.plist'])
    .requiredOption('--path-to-gradle <build.gradle>', 'Path to android `build.gradle` file', collectOptionValues, ['${path}/android/app/build.gradle'])
    .requiredOption(`--build-source <plist|gradle>`, 'Current build number source', 'plist')
    .option('--with-commit', 'Do git commit after version increased', false)
    .option('--commit-message', 'Git commit message', 'release ${version} (${build}): increase versions and build numbers')
    .option('--with-tag', 'Do git tag after commit', false)
    .option('--tag-label', 'Git tag label', 'v${version}')
    .option('--tag-message', 'Git tag message', 'release ${version} (${build})')
    .action(async (path, cmd) => {
      displayCommandGreetings(cmd);
      const {
        major,
        minor,
        patch,
        pathToPackage,
        pathToPlist,
        pathToGradle,
        buildSource,
        withCommit,
        commitMessage,
        withTag,
        tagLabel,
        tagMessage
      } = cmd;
      requiredFormat('build-source', buildSource, /^(plist|gradle)$/);
      const pathResolved = path || process.cwd();

      // resolve path to package
      const pathToPackageResolved = resolveString(pathToPackage, { path: pathResolved });
      requiredPath(pathToPackageResolved);

      // resolve package instance
      const info = new Package({ path: pathToPackageResolved });

      // resolve paths to platform specific files
      const replacements = { path: pathResolved, name: info.name, version: info.version };
      const pathToPlistResolved = resolveOptionValues(pathToPlist, replacements);
      const pathToGradleResolved = resolveOptionValues(pathToGradle, replacements);
      [...pathToPlistResolved, ...pathToGradleResolved].map(requiredPath);

      // resolve next versions
      const majorResolved = resolveGreaterVersion(info.major, major);
      const minorResolved = resolveGreaterVersion(info.minor, minor, major);
      const patchResolved = resolveGreaterVersion(info.patch, patch, major || minor);
      const versionResolved = `${majorResolved}.${minorResolved}.${patchResolved}`;
      if (versionResolved === info.version) {
        displayCommandStep(cmd, colors.bold.yellow(`Nothing changed in the version (${versionResolved}): canceled`));
        return;
      }

      // resolve next build number
      const source = ((type: string) => {
        if (type === 'plist') {
          return new Plist({ path: pathToPlistResolved[0] });
        } else if (type === 'gradle') {
          return new Gradle({ path: pathToGradleResolved[0] });
        }
      })(buildSource) as Plist | Gradle;
      const buildResolved = source.build + 1;


      displayCommandStep(cmd, colors.blue.bold('Version and build numbers will be changed'));
      displayCommandStep(cmd, `- from: ${colors.yellow(info.version)} (${colors.yellow(source.build.toString())})`);
      displayCommandStep(cmd, `- to:   ${colors.blue(versionResolved)} (${colors.blue(buildResolved.toString())})`);
      displayCommandStep(cmd, 'Inside this project files');
      displayCommandStep(cmd, `- package.json (${pathToPackageResolved});`);
      displayCommandStep(cmd, `- ios project (${pathToPlistResolved.join(', ')});`);
      displayCommandStep(cmd, `- android project (${pathToGradleResolved.join(', ')}).`);


      displayCommandStep(cmd, 'Updating version in package.json...');
      info.major = majorResolved;
      info.minor = minorResolved;
      info.patch = patchResolved;
      info.save();

      displayCommandStep(cmd, 'Updating version and build number in ios project...');
      for (const _path of pathToPlistResolved) {
        const plist = new Plist({ path: _path });
        plist.version = versionResolved;
        plist.build = buildResolved;
        plist.save();
      }

      displayCommandStep(cmd, 'Updating version and build number in android project...');
      for (const _path of pathToGradleResolved) {
        const gradle = new Gradle({ path: _path });
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
          displayCommandStep(cmd, 'Doing git commit...');
          const pathsToCommit = [pathToPackageResolved, ...pathToPlistResolved, ...pathToGradleResolved];
          execSyncProgressDisplay('git', 'add', pathsToCommit.join(' '));
          execSyncProgressDisplay('git', 'commit', { m: resolveString(commitMessage, variables) });
        }

        if (withTag) {
          displayCommandStep(cmd, 'Doing git tag...');
          if (withCommit) {
            execSyncProgressDisplay('git', 'tag', {
              a: resolveString(commitMessage, variables),
              m: resolveString(tagMessage, variables)
            });
          } else {
            displayCommandStep(cmd, colors.yellow.bold('There is no git commit for this version done: git tag skipped'));
          }
        }
      }

      displayCommandDone(cmd);
    });
};
