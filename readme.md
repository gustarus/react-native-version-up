**Please, do create pull requests to the project if you improve something!**
**It will help us to create hight-quality package.**

# React native version upper
Increase `major`, `minor` or `patch` part of the version and build number in your app in package.json and in ios and android projects with one command.
```
node ./node_modules/react-native-version-up/index.js --patch -m 'commit message'
```

With this script you can:
- Increase `major`, `minor` or `patch` part in the version.
- Make a git commit with version changes.
- Make a git tag with new version.

## Example
```bash
> yarn run version:up -- --patch
$ node ./node_modules/react-native-version-up/index.js "--patch"

I'm going to increase the version in:
  - package.json (./package.json);
  - ios project (./ios/happinesstracker/Info.plist);
  - android project (./android/app/build.gradle).

The version will be changed:
  - from: 0.2.2 (9);
  - to:   0.2.3 (10).

Use "0.2.3" as the next version? [y/n] y

Updating versions
  Updating version in package.json...
    Version in package.json changed.
  Updating version in xcode project...
    Version and build number in ios project (plist file) changed.
  Updating version in android project...
    Version and build number in android project (gradle file) changed.

I'm ready to cooperate with the git!
  I want to make a commit with message:
    "release 0.2.3: increase versions and build numbers"
  I want to add a tag:
    "v0.2.3" -m "release 0.2.3: increase versions and build numbers"
  Do you allow me to do this? [y/n] y
  Commit with files added. Run "git push".

Done!
```

## Installation
```
yarn add react-native-version-up
```

Or via npm:
```
npm install react-native-version-up --save
```

## Usage
**1. Add command in the section `scripts` in the `package.json`**
```json
{
  "name": "your-project-name",
  "scripts": {
    "version:up": "node ./node_modules/react-native-version-up/index.js"
  }
}
```

**2. Make sure you have defined the version**
```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "scripts": {
    "version:up": "node ./node_modules/react-native-version-up/index.js"
  }
}
```

**3. Commit the package.json (optional)**
```bash
git add package.json
git commit -m 'version:up command added'
```

**4. Increase version when needed**
```bash
yarn version:up --major
```

Or via npm:
```bash
npm run version:up -- --major
```
## Options
You can pass option name and value with following syntax (remember to put `--` before options if you are using npm, with yarn this is not needed):
```
yarn version:up --flag value
```

| **Option** | **Type** | **Default value** | **Description** |
|------------|----------|-------------------|-----------------|
| **`--major`** | `flag` | | Increase `major` version:<br/>**0**.0.0 -> **1**.0.0 |
| **`--minor`** | `flag` | | Increase `minor` version:<br/>0.**0**.0 -> 0.**1**.0 |
| **`--patch`** | `flag` | | Increase `patch` version:<br/>0.0.**0** -> 0.0.**1** |
| **`--message` or `-m`** | `string` | `"release ${version}: increase versions and build numbers"` | Custom commit message. |
| **`--pathToPackage './path'`** | `string` | `./package.json` | Path to `package.json` file in your project. |
| **`--pathToPlist './path'`** | `string` | `./ios/${package.name}/Info.plist` | Path to `Info.plist` file (ios project). |
| **`--pathToGradle './path'`** | `string` | `./android/app/build.gradle` | Path to `build.gradle` file (android project). |
