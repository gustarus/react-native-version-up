import { Command } from 'commander';
import colors from 'colors/safe';

export default function requiredFormat(name: string, value: string, format: RegExp) {
  if (!value.match(format)) {
    throw new Error(`Property '${name}' value '${value}' is in invalid format: should be ${format.toString()}`);
  }
};
