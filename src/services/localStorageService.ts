export default class LocalStorageService {
  createObjectStore<T>(key: string, object: T): void {
    const jsonString = JSON.stringify(object);
    localStorage.setItem(key, jsonString);
  }

  getObject<T>(key: string): T | null {
    const jsonString = localStorage.getItem(key);
    return jsonString ? (JSON.parse(jsonString) as T) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
