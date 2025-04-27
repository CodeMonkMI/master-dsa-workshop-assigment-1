# Part 3: Real-World Problem Solving

## Inventory Management

### Required Features

- Maintain a product catalog.
- Allow quick availability checks and frequent insertions/removals.
- Ensure scalability as inventory grows.

### Choosing DS

In inventory, we don't need data in order or sequence. So we can use HashTable for retrieve data in constant time.

To ensue scalability, follow single responsibility and dry principle. Most the

### Implementation

For availability check, there is stand alone method `getStock` which is use to retrieve available stock quantity. Although stock availability is checked before do main operation.

### Complexity

| Method          | Time Complexity | Space Complexity |
| :-------------- | :-------------- | :--------------- |
| `getAllProduct` | O(n)            | 0(n)             |
| `addProduct`    | O(1)            | 0(1)             |
| `removeProduct` | O(1)            | 0(1)             |
| `buyProduct`    | O(1)            | 0(1)             |
| `addStock`      | O(1)            | 0(1)             |
| `setStock`      | O(1)            | 0(1)             |
| `getStock`      | O(1)            | 0(1)             |

## Blog Management

### Required Features

- Maintain the 10 most recent user posts.
- Support constant-time insertion/removal.
- Preserve chronological order.

### Choosing DS

For constant time insertion and removal , required HashTable. We need to maintain latest 10 post. So we can also achieve this with HashTable. But we also need to main chronological order. For this we need to use a LinkedList as well. It will help use to maintain latest 10 post and chronological order.

We will store posts in HashTable to store posts and use LinkedList to store post id to maintain chronological order. also help use to remove the oldest node with constant time complexity.

### Complexity

| Method          | Time Complexity | Space Complexity |
| :-------------- | :-------------- | :--------------- |
| `addPost`       | O(1)            | 0(1)             |
| `removePost`    | O(n)            | 0(1)             |
| `updatePost`    | O(1)            | 0(1)             |
| `getAllPosts`   | O(n^2)          | 0(n)             |
| `getPost`       | O(1)            | 0(1)             |
| `removeOldPost` | O(1)            | 0(1)             |
