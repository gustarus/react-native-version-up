import colors from 'colors/safe';
import { Command } from 'commander';
import moment from 'moment';

export default function displayCommandGreetings(cmd: Command) {
  const timestamp = moment().format('HH:mm:ss');
  console.log(`[${timestamp}] [${colors.blue(cmd.name())}] ${cmd.description()}`);
};
