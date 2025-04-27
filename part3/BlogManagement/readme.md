# Blog Management

## Required Features

- Maintain the 10 most recent user posts.
- Support constant-time insertion/removal.
- Preserve chronological order.

## Choosing DS

For constant time insertion and removal , required HashTable. We need to maintain latest 10 post. So we can also achieve this with HashTable. But we also need to main chronological order. For this we need to use a LinkedList as well. It will help use to maintain latest 10 post and chronological order.

We will store posts in HashTable to store posts and use LinkedList to store post id to maintain chronological order. also help use to remove the oldest node with constant time complexity.

## Complexity

| Method          | Time Complexity | Space Complexity |
| :-------------- | :-------------- | :--------------- |
| `addPost`       | O(1)            | 0(1)             |
| `removePost`    | O(n)            | 0(1)             |
| `updatePost`    | O(1)            | 0(1)             |
| `getAllPosts`   | O(n^2)          | 0(n)             |
| `getPost`       | O(1)            | 0(1)             |
| `removeOldPost` | O(1)            | 0(1)             |
