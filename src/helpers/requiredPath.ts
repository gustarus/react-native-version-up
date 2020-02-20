import fs from 'fs';
import colors from 'colors/safe';

export default function requiredPath(path: string) {
  if (!fs.existsSync(path)) {
    throw new Error(`Unable to locate path '${path}': this path doesn't exist`);
  }
};
