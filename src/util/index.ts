export function getKeyByValue<T>(dataObj: T, value: number): keyof T | null {
  for (const key in dataObj) {
    if (dataObj[key] === value) {
      return key;
    }
  }
  return null;
}
