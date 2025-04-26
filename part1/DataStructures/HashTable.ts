class Node<T> {
  constructor(
    public key: string,
    public value: T,
    public next: Node<T> | null = null
  ) {}
}

/**
 * This a bucket for HashTable Each element
 *
 * @class LinkedList
 * @typedef {LinkedList}
 * @template T
 */
class LinkedList<T> {
  private head: Node<T> | null = null;
  private size = 0;

  /**
   * insert new element to the list
   * @param key
   * @param value
   * @returns undefined
   */
  insert(key: string, value: T): undefined {
    // create new node
    const newNode = new Node(key, value);

    // check if the head is empty
    if (!this.head) {
      // set the new node to head
      this.head = newNode;
      return;
    }
    // set the new node to head
    newNode.next = this.head;
    // set head to the new node
    this.head = newNode;
  }

  /**
   * Find node with given key
   *
   * @param {string} key
   * @returns {(Node<T> | null)}
   */
  findNode(key: string): Node<T> | null {
    // check the head is empty
    if (!this.head) {
      return null;
    }
    // looping through each element in the list
    let current: Node<T> = this.head;
    while (current && current.next) {
      //  check with node key,
      // if match, return the node
      if (current!.key === key) {
        return current;
      }
      // move to next node
      current = current.next;
    }
    // return null if not found
    return null;
  }

  /**
   * Find node value with  given key
   *
   * @param {string} key
   * @returns {(T | null)}
   */
  find(key: string): T | null {
    // use findNode method to retrieve the node
    const node = this.findNode(key);
    /**
     * return node if the node is not null
     * else return null
     */
    return node ? node.value : null;
  }

  /**
   * Generator function to iterate this HashTable
   *
   * @returns {Generator<[string, T]>}
   */
  *entries(): Generator<[string, T]> {
    let current: Node<T> | null = this.head;
    while (current && current.next) {
      yield [current.key, current.value];
      current = current.next;
    }
  }
}

const DEFAULT_TABLE_SIZE = 13;

export class HashTable<T> {
  private table: (LinkedList<T> | null)[];
  private allKeys = new Set<string>();
  private count: number = 0;

  constructor(protected size: number = DEFAULT_TABLE_SIZE) {
    this.table = new Array(size);
  }

  /**
   * return an unique index against key
   *
   * @private
   * @param {string} key
   * @returns {number}
   */
  private hash(key: string): number {
    // seed to generate a hash value
    let hash = 5381;
    // looping through each character of the key
    for (let char of key) {
      // generate hash value using djb2 algorithm
      hash += (hash * 33) ^ char.charCodeAt(0);
    }
    // return the absolute value of hash value
    return Math.abs(hash) % this.size;
  }

  /**
   * resize the HashTable
   *
   * @private
   * @param {number} newSize
   * @returns {undefined}
   */
  private resize(newSize: number): undefined {
    // store old data
    const oldData = this.table;
    // set size with new size
    this.size = newSize;
    // set table with new instance of array with newSize
    this.table = new Array(newSize);
    // set count to 0
    this.count = 0;

    // loop through each element of the old data
    for (let bucket of oldData) {
      if (bucket) {
        // if there  is a bucket then loop through each element of the bucket
        for (let [key, value] of bucket.entries()) {
          // set this new HashTable with new key and value
          this.set(key as string, value as T);
        }
      }
    }
  }

  /**
   * Set new data
   *
   * @param {string} key
   * @param {T} value
   * @returns {undefined}
   */
  set(key: string, value: T): undefined {
    // check if the count is greater than 3/4 of size (table capacity)
    if (this.count / this.size > 0.75) {
      // increase the size to double the current size
      this.resize(this.size * 2);
    }
    // get the index with hash method
    const index = this.hash(key);
    /**
     * checking if the index bucket is empty
     * if the bucket is empty then create a new instance of LinkedList
     */
    if (!this.table[index]) {
      this.table[index] = new LinkedList();
    }
    const bucket = this.table[index];
    // find existing node with the key in bucket
    const existing = bucket.findNode(key);
    // if there is no exiting node , then increase the count and add keys
    if (!existing) {
      this.count++;
      this.allKeys.add(key);
    }
    // insert the value to the bucket
    bucket.insert(key, value);
  }

  /**
   * Get data with given key
   *
   * @param {string} key
   * @returns {(T | null)}
   */
  get(key: string): T | null {
    // get the index with hash method
    const index = this.hash(key);

    // retrieve the bucket with the index
    const bucket = this.table[index];
    // return null if the bucket is empty or not exist
    if (!bucket) return null;
    // return value with the key using find method of the bucket
    return bucket.find(key);
  }

  /**
   * remove data with key
   *
   * @param {string} key
   * @returns {undefined}
   */
  remove(key: string): undefined {
    // get the index with hash method
    const index = this.hash(key);
    // retrieve the bucket with the index
    const bucket = this.table[index];
    // return null if the bucket is empty or not exist
    if (!bucket) return;
    // set the bucket to null
    this.table[index] = null;
    // decrease the count
    this.count--;
  }

  /**
   * Deep copy the HashTable with chaining
   *
   * @template TT
   * @returns {HashTable<TT>}
   */
  clone<TT>(): HashTable<TT> {
    // create a new instance of HashTable with new type
    const newHt = new HashTable<TT>();

    // loop through each element (bucket) of the table
    for (let bucket of this.table) {
      if (bucket) {
        // loop through each element (bucket) of the table
        for (let [key, value] of bucket.entries()) {
          // set this new HashTable with new key and value
          newHt.set(key as any, value as any);
        }
      }
    }
    // return the new HashTable
    return newHt;
  }

  /**
   * Return all the keys
   *
   * @returns {string[]}
   */
  keys(): string[] {
    return Array.from(this.allKeys);
  }

  /**
   * Return all the values
   *
   * @returns {T[]}
   */
  values(): T[] {
    // create an empty array to store all of the values
    const val = [];
    // loop through each element (bucket) of the table
    for (let bucket of this.table) {
      if (bucket) {
        // loop through each element (data) of the bucket
        for (let [_, value] of bucket.entries()) {
          // push the value to the array
          val.push(value);
        }
      }
    }
    // return the array of values
    return val;
  }
  entries() {
    // create an empty array to store all entries
    const all = [];
    // loop through each element (bucket) of the table
    for (let bucket of this.table) {
      if (bucket) {
        // loop through each element (data) of the bucket
        for (let entry of bucket.entries()) {
          // push the entry to the array
          all.push(entry);
        }
      }
    }
    // return the array of entries
    return all;
  }
}
