import * as path from 'path';
import resolvePackagePath from './helpers/resolvePackagePath';

export const PATH_TO_ROOT = resolvePackagePath(__dirname);
export const PATH_TO_PACKAGE = path.resolve(PATH_TO_ROOT, 'package.json');
