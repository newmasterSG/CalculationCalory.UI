export function getEnumByLabel<T extends string | number>(
    label: string,
    enumLabels: { [key in T]: string }
  ): T | undefined {
    const entry = Object.entries(enumLabels).find(([key, value]) => value === label);
    return entry ? (parseInt(entry[0], 10) as T) : undefined;
  }