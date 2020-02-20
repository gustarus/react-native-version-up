export default function resolveGreaterVersion(version: number, increase?: boolean, reset: boolean = false) {
  if (reset) {
    return 0;
  }

  const value = version >= 0 ? version : 0;
  return increase ? value + 1 : value;
}
