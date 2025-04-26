const DEFAULT_CAPACITY = 13;

export class DynamicArray<T> {
  length: number = 0;
  arr: T[];
  /**
   *
   * @param capacity number
   */
  constructor(private capacity: number = DEFAULT_CAPACITY) {
    this.arr = new Array<T>(capacity);
  }

  private resize(newCapacity: number): undefined {
    // check if the new capacity is not equal to the current capacity
    if (newCapacity == this.capacity) return;
    // create a new instance of the array with new capacity
    const newArray = new Array(newCapacity);
    // loop through the each element of the current array and copy to the newArray from index 0 to length - 1
    for (let i = 0; i < this.length; i++) {
      newArray[i] = this.arr[i];
    }
    // set the new array to the current array
    this.arr = newArray;
    // update the current capacity with new capacity
    this.capacity = newCapacity;
  }
  /**
   * Method to increase or grow array capacity
   */
  private grow(): undefined {
    // update the current capacity to double the current capacity
    this.capacity *= 2;
    // resize the array with new capacity
    this.resize(this.capacity);
  }
  /**
   * Method to shrink or decrease array capacity
   * if the array length is half or less then the capacity will decrease to half
   * it won't go below the default capacity
   * @returns undefined
   */
  private shrink(): undefined {
    // checking if the array length is less than half of the capacity
    if (this.capacity / 2 < this.length) return;
    /**
     * set the new capacity
     * if the new capacity is less then the default capacity then set the default capacity
     *
     */

    this.capacity = Math.max(DEFAULT_CAPACITY, Math.floor(this.capacity / 2));
    // resize the array with new capacity
    this.resize(this.capacity);
  }
  /**
   * this is function is used to add element at the last on this array
   * @param element T is a generic type
   */
  push(element: T): undefined {
    /**
     * checking array capacity
     * if the array capacity is full then increase array capacity
     */
    if (this.length == this.capacity) {
      this.grow();
    }
    this.arr[this.length] = element;
    this.length++;
  }

  /**
   * This method is used to retrieve and remove last element on this array
   * @returns T
   */
  pop(): T {
    /**
     * checking array if array is empty
     * if the array empty, then throw an error
     */
    if (this.length == 0) {
      throw new Error("Array is empty");
    }

    // save the element to return
    const element: T = this.arr[this.length - 1];
    // decrease the length.
    this.length--;

    // shrink the array
    if (this.length < this.capacity / 3) {
      this.shrink();
    }
    // return the element
    return element;
  }
  /**
   * Insert a new element at given index
   * Time complexity: O(n) - we need to shift the elements to the right for n time at worst case
   * @param index number - index to insert the element
   * @param element T
   */
  insert(index: number, element: T): undefined {
    // check the index
    this.checkValidIndex(index);
    // grow array if the capacity is full
    if (this.length == this.capacity) {
      this.grow();
    }
    // from index to end move value to 1 step right
    for (let i = this.length; i > index; i--) {
      this.arr[i] = this.arr[i - 1];
    }
    // set value to the index
    this.arr[index] = element;
    // increase the length
    this.length++;
  }

  /**
   * Insert element at the first index
   *
   * @param {T} element
   * @returns {undefined}
   */
  insertAtFirst(element: T): undefined {
    this.insert(0, element);
  }
  /**
   * Remove element with given index
   * @param index number
   * @returns T
   */
  remove(index: number): T {
    // validate the index
    this.checkValidIndex(index);
    // check if array is empty
    if (this.length === 0) {
      throw new Error("array is empty");
    }
    // save the element to return
    const element = this.arr[index];
    // from (index + 1) to end move value to 1 step left
    for (let i = index; i < this.length - 1; i++) {
      this.arr[i] = this.arr[i + 1];
    }
    // decrease the length
    this.length--;

    // shrink the array
    if (this.length < this.capacity / 3) {
      this.shrink();
    }
    // return the saved element
    return element;
  }

  /**
   * Get element with given index
   * @param index number
   * @returns T | undefined
   */
  get(index: number): T | undefined {
    // validate the index
    this.checkValidIndex(index, true);
    // return the element at given index
    return this.arr[index];
  }
  /**
   * Method to update element data with given index and data
   * @param index number
   * @param element T
   */
  set(index: number, element: T): undefined {
    // validate the index
    this.checkValidIndex(index, true);
    // update the array with new element data
    this.arr[index] = element;
  }
  /**
   * Method to find the index of the element
   * @param element T
   * @returns number
   */
  indexOf(element: T): number {
    // looping through each element of the array
    for (let i = 0; i < this.length; i++) {
      // if the element is matched then return the index
      if (this.arr[i] === element) {
        return i;
      }
    }
    // if there is no match then return -1
    return -1;
  }
  /**
   * Check if the element is present in the array or not
   * @param element T
   * @returns boolean
   */
  contains(element: T): boolean {
    /**
     * use indexOf method to find the index of the element
     * if the index is not -1 then the element is present
     * if index is -1 then the element is not present
     */
    return this.indexOf(element) !== -1;
  }
  /**
   * Method to clear the array
   * @returns undefined
   */
  clear(): undefined {
    // set new Array instance with default capacity
    this.arr = new Array<T>(DEFAULT_CAPACITY);
    // set the length to 0
    this.length = 0;
    // set the capacity to default capacity
    this.capacity = DEFAULT_CAPACITY;
  }

  /**
   * Validate the given index
   * @param index number
   * @param isExact boolean | if true then check the exact index (0 to length-1) otherwise check the range of index (0 to length)
   * @returns undefined
   */
  private checkValidIndex(index: number, isExact: boolean = false): undefined {
    if (index < 0 || index > this.length - (isExact ? 1 : 0)) {
      throw new Error("index is out of bound");
    }
  }
}

{
  const newArr = new DynamicArray<number>();

  newArr.push(1);
  newArr.push(2);
  newArr.push(3);
  newArr.push(4);
  newArr.push(5);
  newArr.push(6);
  newArr.push(7);
  newArr.push(8);
  newArr.push(9);
  newArr.push(10);
  newArr.push(11);
  newArr.push(12);
  newArr.push(13);
}
