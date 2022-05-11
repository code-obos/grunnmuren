type Input = Record<string | number | symbol, unknown>;

// TODO: Figure out some TS magic for the return type.
// For instance, if property `a` is optional in the destination, and it is assigned
// a default value, we want the return type to no longer show it as optional

/**
 * Shallowly assign default properties. Useful for handling defaultProps in React.
 */
export function defu<T>(baseObj: T, defaults: Input = {}): T {
  const obj = Object.assign({}, defaults);

  for (const key in baseObj) {
    const val = baseObj[key];
    if (val !== undefined) {
      obj[key] = val;
    }
  }

  // @ts-expect-error Figure out some typescript magic that infers the correct type...
  return obj;
}
