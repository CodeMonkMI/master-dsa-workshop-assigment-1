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
