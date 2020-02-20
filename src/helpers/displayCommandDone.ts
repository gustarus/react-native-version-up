import colors from 'colors/safe';
import { Command } from 'commander';
import displayCommandStep from './displayCommandStep';

export default function displayCommandDone(cmd: Command) {
  displayCommandStep(cmd, colors.green('The task was successful'));
};
