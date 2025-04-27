## Time aware LinkedList

### Feature

- Each node stores timestamp of insertion.
- Add methods to retrieve nodes inserted within last n seconds.

### Implementation

To get all nodes inserted with last n seconds. Then we need to store the timestamp. Then compare the the time is in last n seconds.

Here we are using prepend. Because also save space for tail node or decrease time complexity (if tail not taken). One more important is we retrieving lasted node. When we prepend the node, all the lasted will come forward. It will also decrease unnecessary actions or complexity

# Future

In the future if we want to remove the oldest node, then this implementation won't be suitable at all.

# Complexity

| Method               | Time Complexity | Space Complexity |
| :------------------- | :-------------- | :--------------- |
| `prepend`            | O(1)            | 0(1)             |
| `clear`              | O(1)            | 0(1)             |
| `retrieveLatestNode` | O(n)            | 0(n)             |
