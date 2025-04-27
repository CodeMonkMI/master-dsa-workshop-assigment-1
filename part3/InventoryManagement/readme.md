# Inventory Management

## Required Features

- Maintain a product catalog.
- Allow quick availability checks and frequent insertions/removals.
- Ensure scalability as inventory grows.

## Choosing DS

In inventory, we don't need data in order or sequence. So we can use HashTable for retrieve data in constant time.

To ensue scalability, follow single responsibility and dry principle. Most the

## Implementation

For availability check, there is stand alone method `getStock` which is use to retrieve available stock quantity. Although stock availability is checked before do main operation.

## Complexity

| Method          | Time Complexity | Space Complexity |
| :-------------- | :-------------- | :--------------- |
| `getAllProduct` | O(n)            | 0(n)             |
| `addProduct`    | O(1)            | 0(1)             |
| `removeProduct` | O(1)            | 0(1)             |
| `buyProduct`    | O(1)            | 0(1)             |
| `addStock`      | O(1)            | 0(1)             |
| `setStock`      | O(1)            | 0(1)             |
| `getStock`      | O(1)            | 0(1)             |
