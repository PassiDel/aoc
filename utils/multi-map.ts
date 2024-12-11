export class MultiMap<V, K extends unknown[]> extends Map<K[0], any> {
  multiGet(...keys: K): V | undefined {
    const firstKey = keys[0];
    const otherKeys = keys.slice(1);
    if (!this.has(firstKey)) {
      return undefined;
    }

    if (otherKeys.length > 0) {
      return (this.get(firstKey)! as MultiMap<any, any>).multiGet(...otherKeys);
    }
    return this.get(firstKey) as V;
  }

  multiSet(value: V, ...keys: K) {
    const firstKey = keys[0];
    const otherKeys = keys.slice(1);

    if (otherKeys.length > 0) {
      if (!this.has(firstKey)) {
        this.set(firstKey, new MultiMap());
      }
      (this.get(firstKey) as MultiMap<any, any>)!.multiSet(value, ...otherKeys);
    } else {
      this.set(firstKey, value);
    }
  }
}
