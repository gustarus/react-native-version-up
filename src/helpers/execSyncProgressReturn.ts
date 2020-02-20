import execSyncProgress from './execSyncProgress';
import { CommandSpace } from '../models/Command';

export default function execSyncProgressReturn(...parts: CommandSpace.Part[]): any {
  return execSyncProgress(parts, 'return');
};
