{
  {
    class Node<T> {
      date: number = Date.now();
      constructor(public data: T, public next: Node<T> | null = null) {}
    }

    class LinkedList<T> {
      private head: Node<T> | null = null;
      private size = 0;

      /**
       * At element at beginning
       *
       * @param {T} data
       * @returns {undefined}
       */
      prepend(data: T): undefined {
        // create new node
        const newNode = new Node(data);
        // set newNode next to head
        newNode.next = this.head;
        // set head to newNode
        this.head = newNode;
        // increase size
        this.size++;
      }

      /**
       * Clear the list
       *
       * @returns {undefined}
       */
      clear(): undefined {
        // set head and  size to 0
        this.head = null;
        this.size = 0;
      }

      retrieveLatestNode(seconds: number): T[] {
        // return empty array if there is no node
        if (!this.head) return [];
        // initialize an empty array
        const all: T[] = [];

        let current: Node<T> | null = this.head;

        while (current) {
          // if those nodes inserted in last "seconds" time, push to all array
          if (Date.now() - current.date <= seconds) {
            all.push(current.data);
          }
          current = current.next;
        }

        return all;
      }
    }

    (async () => {
      const ll = new LinkedList<number>();
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // array to insert in ll
      for (let el of arr) {
        ll.prepend(el);
        await new Promise((f) => setTimeout(f, 2));
      }
    })();
  }
}
