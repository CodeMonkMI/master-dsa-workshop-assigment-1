import { HashTable } from "../HashTable";

type ID = string;

interface IPost {
  id: ID;
  name: string;
}

type AddPostType = {
  name: string;
};
type UpdatePostType = {
  name: string;
};

interface IBlogManagement {
  addPost: (data: AddPostType) => IPost;
  removePost: (id: ID) => undefined;
  updatePost: (id: ID, data: UpdatePostType) => IPost;
  getAllPosts: () => IPost[];
  getPost: (id: ID) => IPost | null;
  removeOldPost: () => void;
}
class Post implements IPost {
  name: string;
  constructor(data: AddPostType, public id: string = this.generateID()) {
    this.name = data.name;
  }

  private generateID(): ID {
    return "id" + Math.random().toString(16).slice(2);
  }
}

class NewHashTable<T> extends HashTable<T> {
  constructor() {
    super();
  }

  values(): T[] {
    const val: T[] = [];
    for (let bucket of this.table) {
      if (bucket) {
        for (let [_, value] of bucket.entries()) {
          val.push(value as T);
        }
      }
    }
    return val;
  }
}

class Node<T> {
  constructor(public data: T, public next: Node<T> | null = null) {}
}

interface IList<T> {
  append: (data: T) => void;
  pop: () => void;
  remove: (id: ID) => void;
}

class List<T> implements IList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size = 0;

  get size(): number {
    return this._size;
  }

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
      this._size++;
      return;
    }
    // set tail.next to newNode
    this.tail!.next = newNode;
    // set tail with newNode
    this.tail = newNode;
    // increase size
    this._size++;
  }

  /**
   * return head data
   *
   * @param {T} data
   * @returns {undefined}
   */
  peek(): T {
    // Check if list is empty
    if (!this.head) {
      throw new Error("list is empty");
    }

    return this.head.data;
  }
  /**
   * Removes the head
   *
   * @param {T} data
   * @returns {undefined}
   */
  pop(): T {
    // Check if list is empty
    if (!this.head) {
      throw new Error("list is empty");
    }

    // if index is 0 then remove the head node

    const data = this.head.data;
    this.head = this.head.next;
    this._size--;
    return data;
  }

  /**
   * Removes the first occurrence of the specified data
   *
   * @param {T} id
   * @returns {undefined}
   */
  remove(id: ID): undefined {
    // Check if list is empty
    if (!this.head) {
      throw new Error("list is empty");
    }
    // if head is equal to data then remove the head node
    if (this.head.data == id) {
      // set head to next node
      this.head = this.head.next;
      this._size--;
      return;
    }
    // loop through each of the element and find the node and it's previous node
    let prev = this.head;
    let current = this.head.next;
    while (current) {
      // check if the current node data is equal to data
      if (current.data === id) {
        // set previous node next to current node next
        prev.next = current.next;
        this._size--;
        return;
      }
      // update previous node with current node
      prev = current;
      // move to next node
      current = current.next;
    }
  }

  traverse() {
    let current = this.head;
    while (current) {
      console.log(`${current.data} ->`);
      current = current.next;
    }
  }
  toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }
}

class BlogManagement implements IBlogManagement {
  private allPost: NewHashTable<IPost> = new NewHashTable();
  private postIds: List<ID> = new List();
  private _size: number = 0;
  private MAX_SIZE: number = 10;

  addPost(data: AddPostType): IPost {
    if (this._size >= this.MAX_SIZE) {
      this.removeOldPost();
    }

    const newPost = new Post(data);
    this.allPost.set(newPost.id, newPost);
    this.postIds.append(newPost.id);

    this._size++;

    return newPost;
  }
  removePost(id: ID): undefined {
    this.allPost.remove(id);
    this.postIds.remove(id);

    this._size--;
    return;
  }

  updatePost(id: ID, data: UpdatePostType): IPost {
    const post = this.getPost(id);
    if (!post) {
      throw new Error("invalid post id");
    }
    post.name = data.name;

    return post;
  }
  getAllPosts(): IPost[] {
    const data: IPost[] = [];
    console.log(this.postIds.toArray().length);
    if (this.postIds.size === 0) return data;

    for (let id of this.postIds.toArray()) {
      const d = this.getPost(id);
      if (d) data.push(d);
    }
    return data;
  }
  getPost(id: ID): IPost | null {
    return this.allPost.get(id);
  }
  removeOldPost(): void {
    console.log("calling");
    const id = this.postIds.peek();
    this.removePost(id);
  }
  traversePostId() {
    this.postIds.traverse();
  }
  get size() {
    return this._size;
  }
}

const bm = new BlogManagement();

Array.from(new Array(1000)).forEach(async (_, i) => {
  bm.addPost({ name: i.toString() });
  await new Promise((f) => setTimeout(f, 2));
});

console.log(bm.getAllPosts());
