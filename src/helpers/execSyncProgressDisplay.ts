import execSyncProgress from './execSyncProgress';
import { CommandSpace } from '../models/Command';

export default function execSyncProgressDisplay(...parts: CommandSpace.Part[]): any {
  return execSyncProgress(parts, 'display');
};
