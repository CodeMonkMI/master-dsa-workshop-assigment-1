# Part 2: Custom Data Structures

## Time aware LinkedList

### Feature

- Each node stores timestamp of insertion.
- Add methods to retrieve nodes inserted within last n seconds.

### Implementation

To get all nodes inserted with last n seconds. Then we need to store the timestamp. Then compare the the time is in last n seconds.

Here we are using prepend. Because also save space for tail node or decrease time complexity (if tail not taken). One more important is we retrieving lasted node. When we prepend the node, all the lasted will come forward. It will also decrease unnecessary actions or complexity

### Future

In the future if we want to remove the oldest node, then this implementation won't be suitable at all.

### Complexity

| Method               | Time Complexity | Space Complexity |
| :------------------- | :-------------- | :--------------- |
| `prepend`            | O(1)            | 0(1)             |
| `clear`              | O(1)            | 0(1)             |
| `retrieveLatestNode` | O(n)            | 0(n)             |

## Event LinkedList

### Feature

- Listens to insert/update/delete actions.
- Supports registering external listeners with callbacks.

### Choosing Data Structure

This is a typical LinkedList with eventListener facility. We need all the basic requirement for example head, tail and size. Then we need a container to store all the listeners callback function whose will eventually called by actions.
To store this listener we will use HashTable for constant time complexity.

### Implementation

We need three different method for register, remove and emit a event.

- For registering event, we need two values,
  1. Type (insert/delete/update)
  2. A callback function , which receive some event data
- For removing, just need event type
- For emitting, need event data including event type

For insert/delete/update actions we will call emitEvent method with event data.

### Future

This is very much scalable. it is possible to add more method and event type very easily. Because everything is separate and encapsulated.

### Complexity

For LinkedList Typical method all complexity will be similar. Here i just including new Three methods complexity

| Method                | Time Complexity | Space Complexity |
| :-------------------- | :-------------- | :--------------- |
| `addEventListener`    | O(1)            | 0(1)             |
| `removeEventListener` | O(1)            | 0(1)             |
| `emitEvent`           | O(n)            | 0(n)             |
