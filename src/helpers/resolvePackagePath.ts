import * as fs from 'fs-extra';
import * as path from 'path';

export default function resolvePackagePath(directory: string): string {
  const possible = path.resolve(directory, 'package.json');
  if (!fs.existsSync(possible)) {
    const parent = path.dirname(directory);
    return resolvePackagePath(parent);
  }

  return directory;
}
