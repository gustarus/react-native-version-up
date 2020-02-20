export default function resolveString(value: string, variables: { [key: string]: any } = {}) {
  let result = value;
  for (const name in variables) {
    const expression = new RegExp(`\\$\\{${name}\\}`, 'g');
    result = result.replace(expression, variables[name]);
  }

  return result;
}
