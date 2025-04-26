{
  class Node<T> {
    constructor(public data: T, public next: Node<T> | null = null) {}
  }

  class LinkedList<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private size = 0;

    /**
     * append new data at then end
     *
     * @param {T} data
     * @returns {undefined}
     */
    append(data: T): undefined {
      // create new node
      const newNode = new Node(data);
      // check if head is empty
      if (!this.head) {
        // set head and tail with newNode as it is empty
        this.head = newNode;
        this.tail = newNode;
        // increase size
        this.size++;
        return;
      }
      // set tail.next to newNode
      this.tail!.next = newNode;
      // set tail with newNode
      this.tail = newNode;
      // increase size
      this.size++;
    }

    /**
     * Append node without tail node
     *
     * @param {T} data
     * @returns {undefined}
     */
    appendWithoutTail(data: T): undefined {
      // create new node
      const newNode = new Node(data);
      // check if head is empty
      if (!this.head) {
        // set head and tail with newNode as it is empty
        this.head = newNode;
        this.tail = newNode;
        // increase size
        this.size++;
        return;
      }

      // loop through each of the element and fine last node
      let current = this.head;
      while (current.next !== null) {
        // move the next node
        current = current.next;
      }
      // update last node to next newNode
      current.next = newNode;
    }

    /**
     * At element at beginning
     *
     * @param {T} data
     * @returns {undefined}
     */
    prepend(data: T): undefined {
      // create new node
      const newNode = new Node(data);
      // if the tail node is empty then update tail with new node
      if (!this.tail) {
        this.tail = newNode;
      }
      // set newNode next to head
      newNode.next = this.head;
      // set head to newNode
      this.head = newNode;
      // increase size
      this.size++;
    }

    /**
     * insert element at position
     * @param position
     * @param data
     * @returns {undefined}
     */
    insertAt(position: number, data: T): undefined {
      //  check if the position is out of bound
      if (position > this.size) {
        throw new Error("position is out of bound");
      }
      // if the position is 0 then prepend the element
      if (position === 0) {
        return this.prepend(data);
      }
      // if the position is equal to size then append the element
      if (position === this.size) {
        return this.append(data);
      }

      let current = this.head; // store found node
      let prev = null; // store the previous node of founded node
      let trackPosition = 0; // track the position of the node
      while (current != null && trackPosition < position) {
        // set previous node with current
        prev = current;
        // move the next node
        current = current.next;
        //  increase track position
        trackPosition++;
      }
      // create new node
      const newNode = new Node(data);
      // set newNode next to current node
      newNode.next = current;
      // set previous node next to newNode
      prev!.next = newNode;
    }

    /**
     * Removes the first occurrence of the specified data
     *
     * @param {T} data
     * @returns {undefined}
     */
    remove(data: T): undefined {
      // Check if list is empty
      if (!this.head) {
        throw new Error("list is empty");
      }
      // if head is equal to data then remove the head node
      if (this.head.data == data) {
        // set head to next node
        this.head = this.head.next;
        // decrease size
        this.size--;
        // if the size is 0 then set tail to null
        if (this.size === 0) {
          this.tail = null;
        }
        return;
      }
      // loop through each of the element and find the node and it's previous node
      let prev = this.head;
      let current = this.head.next;
      while (current) {
        // check if the current node data is equal to data
        if (current.data === data) {
          // set previous node next to current node next
          prev.next = current.next;
          // decrease size
          this.size--;
          // if the size is 0 then set tail to null
          if (this.size === 0) {
            this.tail = null;
          }
          return;
        }

        // update previous node with current node
        prev = current;
        // move to next node
        current = current.next;
      }
    }

    removeAt(index: number) {
      // Check if list is empty
      if (!this.head) {
        throw new Error("list is empty");
      }

      // if index is 0 then remove the head node
      if (index === 0) {
        this.head = this.head.next;
        this.size--;
        return;
      }
      // find the previous node with index -1
      const find: Node<T> | null = this.get(index - 1);

      // throw error if node not found
      if (!find) {
        throw new Error("node not found");
      }
      // update previous node next to current node next
      find.next = find.next!.next;
      // decrease size
      this.size--;
    }
    /**
     * Returns a string representation of the list
     *
     * @returns {string}
     */
    get toString(): string {
      // Initialize an empty string
      let str = "";
      // Start from the head node
      let current = this.head;

      // looping through the list
      while (current) {
        // Append node data to string with its index
        str += `${current.data?.toString()}\n`;
        // Move to the next node
        current = current.next;
      }

      // Return the final string
      return str;
    }

    /**
     * find node with given data
     *
     * @param {T} data -
     * @returns {Node<T> | null}
     */
    find(data: T): Node<T> | null {
      // Check if list is empty
      if (!this.head) {
        return null;
      }

      // Start from the head node
      let current: Node<T> | null = this.head;

      // Traverse through the list
      while (current) {
        // If current node contains the data return the node
        if (current!.data === data) {
          return current;
        }
        // Move to the next node
        current = current.next;
      }

      // Return null if node not found
      return null;
    }

    /**
     * find node with given index
     *
     * @param {number} index
     * @returns {Node<T> | null}
     */
    get(index: number): Node<T> | null {
      // Check if index is valid
      if (index >= this.size) {
        throw new Error("position is out of bound");
      }

      // If index is 0, return head
      if (index === 0) {
        return this.head;
      }

      // If index is equal to size, return tail
      if (index === this.size) {
        return this.tail;
      }

      let current = this.head;
      let prev = null;
      let trackPosition = 0;

      // loop through each of the element and find the node and it's previous node
      while (current != null && trackPosition <= index) {
        // set previous node with current
        prev = current;
        // move the next node
        current = current.next;
        //  increase track position
        trackPosition++;
      }

      // Return the previous node
      return prev;
    }

    /**
     * Clear the list
     *
     * @returns {undefined}
     */
    clear(): undefined {
      // set head and tail to null and size to 0
      this.head = null;
      this.tail = null;

      this.size = 0;
    }

    /**
     * Get the size of the list
     *
     * @readonly
     * @type {number}
     */
    get getSize(): number {
      return this.size;
    }

    /**
     * Check if the list is empty
     *
     * @readonly
     * @type {boolean}
     */
    get isEmpty(): boolean {
      return this.size <= 0;
    }

    /**
     * Convert array to LinkedList
     * @param elements T[]
     */
    fromArray(elements: T[]) {
      // loop through each element and append to the list
      for (let el of elements) {
        this.append(el);
      }
    }
  }

  const ll = new LinkedList<number>();

  const arr = [1, 2, 3]; // array to insert in ll
  for (let el of arr) {
    ll.append(el);
  }
}
