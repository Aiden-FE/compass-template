const stores = new Map<string | symbol, object>();

export function getStoreById<T extends object>(id: string | symbol) {
  if (stores.has(id)) {
    return stores.get(id) as T;
  }
  return undefined;
}

export function defineStore<T extends object>(
  key: string | symbol,
  store: () => T,
): T {
  const s = getStoreById(key) || store();
  stores.set(key, s);
  return { id: key, ...s } as T;
}
