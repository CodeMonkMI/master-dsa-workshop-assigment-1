const DEFAULT_CAPACITY = 13;

export class CustomArray<T> {
  // length to determine the size of the array
  length: number = 0;
  // array to store elements
  arr: T[];
  /**
   *
   * @param capacity number
   */
  constructor(public capacity: number = DEFAULT_CAPACITY) {
    this.arr = new Array<T>(capacity);
  }

  /**
   * this is function is used to add element at the last on this array
   * @param element T is a generic type
   */
  push(element: T): undefined {
    /**
     * checking array capacity
     * if the array length is greater than array capacity then throw an error
     */
    if (this.length >= this.capacity) {
      throw new Error("array capacity is full");
    }
    // set the element (data) at the end of the array.
    this.arr[this.length] = element;
    // increase the length
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

    // returning the element
    return element;
  }
  /**
   *Insert a new element at given index
   * @param index number|
   * @param element T
   */
  insert(index: number, element: T): undefined {
    // check the index to validate
    this.checkValidIndex(index);

    // check if the capacity is not full
    if (this.length >= this.capacity) {
      throw new Error("array capacity exceed");
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
   * Remove element with given index
   * @param index number
   */
  remove(index: number): undefined {
    // validate the index
    this.checkValidIndex(index);
    // check if array is empty
    if (this.length === 0) {
      throw new Error("array is empty");
    }
    // from (index + 1) to end move value to 1 step left
    for (let i = index; i < this.length - 1; i++) {
      this.arr[i] = this.arr[i + 1];
    }
    // decrease the size
    this.length--;
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

// const newArr = new CustomArray<number>();

// newArr.push(0);
// newArr.push(1);
// newArr.push(2);
// newArr.push(3);
// newArr.push(4);
// newArr.push(5);
// newArr.push(6);
