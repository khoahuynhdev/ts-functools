// components
// a cache -> object (maybe)
// a hash function -> md5
// decorator wrapper

declare function lruCache<T>(data: T): T;

const EMPTY = null;
const MAX_SIZE = 2;
const storage = {};
// @NOTE: circular doubly linked list, doubly-linked list -> store the last recenly used
// @NOTE: PYTHON WAY: PREV, NEXT, KEY, RESULT = 0, 1, 2, 3
const [PREV, NEXT, KEY, RESULT] = [0, 1, 2, 3] as const;

// @NOTE: root of doubly-linked list, initialized and pointing to self
let root = Array.from(Array(4));
root[PREV] = root;
root[NEXT] = root;
root[KEY] = EMPTY;
root[RESULT] = EMPTY;

function full() {
  return Object.keys(storage).length >= MAX_SIZE;
}
function add(key, val) {
  if (full()) {
    // handle when the queue is full
    const oldRoot = root;
    oldRoot[KEY] = key;
    oldRoot[RESULT] = val;
    // root is at the end of the queue
    // Empty the oldest link and make it the new root.
    root = oldRoot[NEXT];
    const oldKey = root[key];
    console.log("delete oldest key: ", oldKey);
    root[KEY] = EMPTY;

    root[RESULT] = EMPTY;
    delete storage[oldKey];
    storage[key] = oldRoot;
  } else {
    // add new item to the queue
    // Put result in a new link at the front of the queue.
    const last = root[PREV];
    const link = [last, root, key, val];
    last[NEXT] = link;
    root[PREV] = link;
    storage[key] = link;
  }
}

function computeResult(key) {
  return `value_${key}`;
}

function getBy(key) {
  const record = storage[key];
  if (record) return record[RESULT];
  else {
    console.log("inserting new record");
    const result = computeResult(key);
    add(key, result);
    return result;
  }
}

add(1, "value_1");
add(2, "value_2");

console.log(getBy(2));
console.log(getBy(3));
// add(3, 3);
// console.log(root); // <ref *1> [ [Circular *1], [Circular *1], null, null ]
// add(4, 4);
// console.log(root); // <ref *1> [ [Circular *1], [Circular *1], null, null ]
// add(5, 5);
// console.log(root); // <ref *1> [ [Circular *1], [Circular *1], null, null ]
// add(6, 6);
// console.log(root); // <ref *1> [ [Circular *1], [Circular *1], null, null ]
