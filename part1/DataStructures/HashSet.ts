import { HashTable } from "./HashTable";

export class HashSet<T> {
  data = new HashTable<Boolean>();
  count = 0;

  /**
   * Add new element to the set
   * @param value T
   * @returns undefined
   */
  add(value: T): undefined {
    /**
     * check if the value is null or undefined
     * check if the value is already present in the set
     * if any of this true then return undefined
     */
    if (!value || this.has(value)) return;

    // set the value to the data
    this.data.set(value.toString(), true);
    // increase the count
    this.count++;
  }
  delete(value: T) {
    /**
     * check if the value is null or undefined
     * check if the value is already present in the set
     * if any of this true then return undefined
     */
    if (!value || !this.has(value)) return;
    // remove the value from the data
    this.data.remove(value.toString());
    // decrease the count
    this.count--;
  }

  /**
   * check if the value is present in the set
   *
   * @param {T} value
   * @returns {boolean}
   */
  has(value: T): boolean {
    return !!this.data.get(value as string);
  }

  /** clear the set */
  clear() {
    // set data to new instance of HashTable
    this.data = new HashTable();
    // set count to 0
    this.count = 0;
  }

  /**
   * return the number of elements in the set
   *
   * @returns {number}
   */
  size(): number {
    return this.count;
  }

  /**
   * return all the values in the set
   *
   * @returns {[]}
   */
  keys(): string[] {
    return this.data.keys();
  }
}
