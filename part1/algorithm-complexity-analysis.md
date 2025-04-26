# Part 1: Algorithm Complexity Analysis

# Algorithms

1. Insert at the beginning of a dynamic array.
1. Insert at the end of a linked list.
1. Search for an element in a hash set.
1. Rehash a hash table after crossing load factor.
1. Delete a node from a singly linked list by value.
1. Check if an array contains all unique values.
1. Count common elements in two hash sets.
1. Convert an array into a linked list.
1. Clone a hash table with chaining.
1. Compare array vs. hash set lookup performance.

# 1.Insert at the beginning of a dynamic array

Array is contiguous data structure which means each item of array will assign in memory one after one. Array take fixed number of item. We need to specify that during creation of an array.
If we want to insert at beginning,

1. fist we need to check if the array capacity is not exceeded. if the capacity is exceeded then grow the array capacity by calling the `grow` method. This will increase the array capacity
2. we need to move the 1 step right. To move this we need to start from end index to 0 index. If we move from the beginning data will be loss. Then the 0th index will available to set the new element.
3. Need to increase the array length

## Code

```ts
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
```

This generalize method is used to insert element in any position. If we want to insert at the beginning, we need to call method with index 0. For Better usage we can create a method `insertAtFirst` which will call the insert method with index = 0 and given element;

```ts
/**
 * Insert element at the first index
 *
 * @param {T} element
 * @returns {undefined}
 */
insertAtFirst(element: T): undefined {
  this.insert(0, element);
}
```

## Complexity

### Time Complexity

`insert` = O(1) + O(1) + O(n) = O(n)
`insertAtFirst` = O(1) (without insert method)
Final TC = O(n) + O(1) = O(n)

So the Time Complexity will be O(n), Linear Time Complexity

### Space Complexity

Both of the function didn't taken any additional space So the time complexity will be `O(1)` , Constant Space Complexity

# 2.Insert at the end of a linked list

In Linked list element (node) point to next element (node). Each node hold data and pointers.

## Process

There will be two process to insert at the end of a linked list

1. with tail node
2. without tail node

## with tail node

In this process we just need to update the tail node.

1. Need to create a node with `Node` class
2. If there is no node then set `head` and `tail` with newly create node and return
3. Set `tail.next` value to newly crated node
4. Update `tail` node with new node

### Code

```ts
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

```

### Time Complexity

`append` = O(1)
Final TC = O(1)

So the Time Complexity will be O(n), Constant Time Complexity

### Space Complexity

Both of the function didn't taken any additional space So the time complexity will be `O(1)` , Constant Space Complexity

## without tail node

1. Need to create a node with `Node` class
2. If there is no node then set `head` with newly create node and return
3. traverse and find the last node
4. Update lastNode.next with newly created node

### Code

```ts
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
```

### Time Complexity

`appendWithoutTail` = O(1) + O(1) + O(n) + O(1) = O(n)  
So the Time Complexity will be O(n), Linear Time Complexity

### Space Complexity

this function didn't taken any additional space. So the time complexity will be `O(1)`, Constant Space Complexity

## Final Thoughts

If we don't use `tail` node, then TC will be `O(n)`. On the other size, if we use `tail` node then time complexity will be `O(1)`. Although we need to take space to keep `tail` node. But this tail node memory won't increase. Constant time complexity is best solution for any program.

# 3.Search for an element in a hash set.

## Input

1. value

## Process

We will use `HashSet`. There will be a method called `has` which is use to check existence of give value.

## Code

```ts
/**
* check if the value is present in the set
*
* @param {T} value
* @returns {boolean}
*/
has(value: T): boolean {
  return !!this.data.get(value as string);
}
```

## Complexity

### Time Complexity

| Method       | Best Case | Average Case | Worst Case |
| :----------- | :-------- | :----------- | :--------- |
| `has(value)` | O(1)      | O(1)         | O(n)       |

### Space Complexity

Both of the function didn't taken any additional space So the time complexity will be `O(1)` , Constant Space Complexity

# 4.Rehash a hash table after crossing load factor.

Here load factor is the capacity of a hash table. In simple word we need need resize the hash table when capacity full. Also need to make sure all of the data is safe.

## Input

1. newSize or capacity

## Algorithm

1. Copy all previous data
2. Set `size` with `newSize`
3. Set `count` to 0;
4. Set `table` with a blank array of `newSize` length
5. Insert old values one by one with loop and `set` method.

## Code

```ts
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
```

## Complexity

### Time Complexity

`resize()` = O(n \* m) = O(n) // here n and m are proportional.
`set()` = 0(1)

The Time Complexity will be `O(n)`, Linear Time Complexity

### Space Complexity

Here we need to store all `n` numbers of previous data. The Space Complexity will be `O(n)`

# 5.Delete a node from a singly linked list by value.

## Algorithm

1. Check if linked is not empty
2. if the node is head node, then remove and set head.next node as new head nod
3. Find node with given data and also the previous node
4. Update `previous node next` with `current node next`
5. Decrease the size.

## Code

```ts
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

```

## Complexity

### Time Complexity

`remove` = O(n)

So the Time Complexity will be O(n), Linear Time Complexity

### Space Complexity

Both of the function didn't taken any additional space So the time complexity will be `O(1)` , Constant Space Complexity

# 6.Check if an array contains all unique values.

## Input

1. an array of items

## Algorithm

HashSet store unique values. So we will use `HashSet` and compare with array length and HashSet size. if they match, that's mean each item of the array are unique

## Code

```ts
import { HashSet } from "./HashSet";

/**
 * check if each element in the array in unique or not
 *
 * @param {any[]} arr
 * @returns {boolean}
 */
const isUnique = (arr: any[]): boolean => {
  // create a new instance of HashSet
  const hs = new HashSet();
  // loop through each element of the array
  for (let val of arr) {
    // add each element to the HashSet
    hs.add(val.toString());
  }
  // check if the size of the array is qual to hs size then return true
  return hs.size() === arr.length;
};

const givenArray = [1, 2, 3, 4];

console.log(isUnique(givenArray)); // true
```

## Complexity

### Time Complexity

`isUnique` = O(n)

### Space Complexity

Space complexity will be O(n)

# 7.Count common elements in two hash sets.

## Input

1. take two `Set`

## Algorithm

HashSet store unique values. So we will use `HashSet` and compare with array length and HashSet size. if they match, that's mean each item of the array are unique

## Code

```ts
import { HashSet } from "./HashSet";
/**
 * return the common element of two HashSet
 *
 * @template T
 * @param {HashSet<T>} setA
 * @param {HashSet<T>} setB
 * @returns {number}
 */
function intersectionCount<T>(setA: HashSet<T>, setB: HashSet<T>): number {
  // create a instance of HashSet
  const result = new HashSet();

  // loop through all the element of setA
  for (let val of setA.keys()) {
    // check if val is exist on setB,
    // if yes, then add result
    if (setB.has(val as T)) result.add(val);
  }
  // return the result size
  return result.size();
}

const set1 = new HashSet();
const set2 = new HashSet();
[1, 2, 3, 4, 5, 6].forEach((el) => set1.add(el.toString()));
[1, 2, 5, 7, 6].forEach((el) => set2.add(el.toString()));
console.log(intersectionCount(set1, set2)); // 4
```

## Complexity

### Time Complexity

`interSectionCount` = O(n)

### Space Complexity

this function took an instance of HashSet, which can store `n` number of data. So Space complexity will be `O(n)`

# 8.Convert an array into a linked list.

## Input

1. An array of element

## Process

We can achieve this in two way

1. We create a method, take array as parameter, then loop and push each element
2. Loop Outside the `LinkedList` class and push each element

## Code

```ts
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


```

or

```ts
const ll = new LinkedList<number>();

const arr = [1, 2, 3]; // array to insert in ll
// loop through each element and append to the list
for (let el of arr) {
  ll.append(el);
}
```

## Complexity

### Time Complexity

`append` = O(1)
`fromArray` = O(n) where n is the numbers of element in array
TC = O(1) + O(n) = O(n)

Both approach will take O(n) time complexity.

### Space Complexity

Both of the function didn't taken any additional space So the time complexity will be `O(1)` , Constant Space Complexity

## Suggestions

Both approach will take `O(n)` time complexity. We need to decide what we need. if we need to convert an array several time then we can implement and use `fromArray` method. It will reduce code duplication

# 9.Clone a hash table with chaining.

## Process

We can achieve this in two way

1. We create a method, take array as parameter, then loop and push each element
2. Loop Outside the `LinkedList` class and push each element

## Code

```ts
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

```

or

```ts
const ht = new HashTable();

[1, 2, 3, 4, 5, 6].forEach((el) => ht.set(el.toString(), el));

const newHt = ht.clone();

console.log(newHt);
```

## Complexity

### Time Complexity

`set` = O(1)
`clone` = O(n \* m) = O(n)

> n is the numbers of element and m is size in HashTable. n an m are proportional

TC = O(1) + O(n) = O(n)

The Time complexity is O(n), Linear time complexity.

### Space Complexity

Here we need to store n number of element in `HasTable`. So the space complexity will be `O(n)`

```

```

# 10.Compare array vs. hash set lookup performance.

## Theory

| Array                                                                                     | HashSet                                                                                            |
| :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| An array is a linear data structure that stores elements in a contiguous block of memory. | A HashSet is a set where HashTable is used to store data and main Set's feature like unique values |
| index is used to access element                                                           | key (value itself) is used to check if the value exist                                             |
| Array is built in data structure almost every programming language                        | HashSet use HashTable and HashTable use array to implement feature                                 |

## Time Complexity

| Method   | Array  | HashSet |
| :------- | :----- | :------ |
| `insert` | `O(n)` | `0(1)`  |
| `delete` | `O(n)` | `0(1)`  |
| `find`   | `O(n)` | `0(1)`  |
| `update` | `O(n)` |         |
