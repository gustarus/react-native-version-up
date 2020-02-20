import colors from 'colors/safe';
import moment from 'moment';
import { Command } from 'commander';

export default function displayCommandStep(cmd: Command, message: string) {
  const timestamp = moment().format('HH:mm:ss');
  console.log(`[${timestamp}] [${colors.blue(cmd.name())}] ${message}`);
};
