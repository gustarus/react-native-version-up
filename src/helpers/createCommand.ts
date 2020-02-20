import Command, { CommandSpace } from './../models/Command';
import formatter from './../instances/formatter';

export default function createCommand(parts: CommandSpace.Part[]): Command {
  if (!parts.length) {
    throw new Error('Unable to ensure command: parts are invalid');
  }

  if (parts.length === 1 && parts[0] instanceof Command) {
    return parts[0] as Command;
  }

  return new Command({ formatter, parts });
};
