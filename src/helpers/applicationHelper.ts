export function deepmerge<T>(target: T, source: Partial<T>): T {
  const output = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = target[key];
      const sourceValue = source[key];

      if (
        typeof targetValue === "object" &&
        targetValue !== null &&
        typeof sourceValue === "object" &&
        sourceValue !== null
      ) {
        output[key] = deepmerge(targetValue as any, sourceValue as any);
      } else {
        output[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }

  return output;
}
