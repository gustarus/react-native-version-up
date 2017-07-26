# React native version upper
Increase `major`, `minor` or `patch` part of the version and build number in your app in package.json and in ios and android projects with one command.
```
node ./node_modules/react-native-version-up/index.js --major --minor --patch
```

With this script you can:
- Increase `major`, `minor` or `patch` part in the version.
- Make a git commit with version changes.
- Make a git tag with new version.

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
yarn run version:up -- --major
```

Or via npm:
```bash
npm run version:up -- --major
```

## Example
```bash
> yarn run version:up -- --patch                                                                        master [56b6724] (!)
yarn run v0.27.5
warning package.json: No license field
$ node ./node_modules/react-native-version-up/index.js "--patch"

I'm going to increase the version in:
  - package.json (/Users/pkondratenko/projects/happinesstracker/application/package.json);
  - ios project (/Users/pkondratenko/projects/happinesstracker/application/ios/happinesstracker/Info.plist);
  - android project (/Users/pkondratenko/projects/happinesstracker/application/android/app/build.gradle).

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
Done in 3.12s.
```
