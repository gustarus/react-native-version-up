import resolveString from './resolveString';

export default function resolveOptionValues(value: string[], replacements: { [key: string]: string } = {}) {
  // resolve values if user typed something
  const resolved = value.length === 1 ? value.slice(0) : value.slice(1);
  return resolved.map((string) => resolveString(string, replacements));
}
