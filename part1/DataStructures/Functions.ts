import { HashSet } from "./HashSet";
import { HashTable } from "./HashTable";

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

// console.log(isUnique(givenArray));

// union

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
// console.log(intersectionCount(set1, set2));

// clone HashTable with clone

const ht = new HashTable();

[1, 2, 3, 4, 5, 6].forEach((el) => ht.set(el.toString(), el));

const newHt = ht.clone();

console.log(newHt);
