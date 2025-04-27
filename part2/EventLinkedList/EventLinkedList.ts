import { HashTable } from "../../HashTable/HashTable";

enum EventType {
  INSERT = "insert",
  UPDATE = "update",
  DELETE = "delete",
}

interface EventData<T> {
  type: EventType;
  value?: T;
  oldValue?: T;
  isSuccess?: boolean;
}

type EventListerCallback<T> = (event: EventData<T>) => unknown;

interface IEventListeners<T> {
  addEventListener: (type: EventType, cb: EventListerCallback<T>) => void;
  removeEventListener: (type: EventType) => void;
  emitEvent: (type: EventData<T>) => void;
}

interface ILinkedList<T> {
  insert: (data: T) => void;
  update: (oldValue: T, newValue: T) => void;
  remove: (data: T) => void;
}

class Node<T> {
  constructor(public data: T, public next: Node<T> | null = null) {}
}

class EventLinkedList<T> implements IEventListeners<T>, ILinkedList<T> {
  void: any;
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size = 0;
  private listeners: HashTable<EventListerCallback<T>> = new HashTable();

  addEventListener(type: EventType, cb: EventListerCallback<T>) {
    this.listeners.set(type, cb);
  }
  removeEventListener(type: EventType) {
    this.listeners.remove(type);
  }
  emitEvent(eventData: EventData<T>): void {
    const listener = this.listeners.get(eventData.type);
    if (listener) {
      listener(eventData);
    }
  }

  update(oldValue: T, newValue: T): void {
    const findNode = this.findNode(oldValue);
    if (!findNode) return;
    findNode.data = newValue;
    this.emitEvent({
      type: EventType.UPDATE,
      value: newValue,
      oldValue,
      isSuccess: true,
    });
  }

  /**
   * Insert new data at the end
   *
   * @param {T} data
   * @returns {undefined}
   */
  insert(data: T): undefined {
    // create new node
    const newNode = new Node(data);
    // check if head is empty
    if (!this.head) {
      // set head and tail with newNode as it is empty
      this.head = newNode;
      this.tail = newNode;
      // increase size
      this.size++;
      this.emitEvent({
        type: EventType.INSERT,
        value: data,
        isSuccess: true,
      });
      return;
    }
    // set tail.next to newNode
    this.tail!.next = newNode;
    // set tail with newNode
    this.tail = newNode;
    // increase size
    this.size++;
    this.emitEvent({
      type: EventType.INSERT,
      value: data,
      isSuccess: true,
    });
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
      this.emitEvent({
        type: EventType.DELETE,
        value: data,
        isSuccess: false,
      });
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
      this.emitEvent({
        type: EventType.DELETE,
        value: data,
        isSuccess: true,
      });
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
        this.emitEvent({
          type: EventType.DELETE,
          value: data,
          isSuccess: true,
        });
        return;
      }

      // update previous node with current node
      prev = current;
      // move to next node
      current = current.next;
    }
    this.emitEvent({
      type: EventType.DELETE,
      value: data,
      isSuccess: false,
    });
  }

  /**
   * find node with given data
   *
   * @param {T} data -
   * @returns {Node<T> | null}
   */
  findNode(data: T): Node<T> | null {
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
}

const ll = new EventLinkedList<number>();
ll.addEventListener(EventType.INSERT, (eventData) => {
  console.log("DATA INSERTED", eventData);
});

ll.addEventListener(EventType.UPDATE, (eventData) => {
  console.log("DATA UPDATED", eventData);
});
ll.addEventListener(EventType.DELETE, (eventData) => {
  console.log("DATA DELETED", eventData);
});

const arr = [1, 2, 3, 6, 5, 8]; // array to insert in ll

for (let el of arr) {
  ll.insert(el);
}
ll.remove(3);
ll.remove(3);
ll.update(5, 11);
