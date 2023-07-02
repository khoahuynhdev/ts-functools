// components
// a cache -> object (maybe)
// a hash function -> md5
// decorator wrapper

// ref: https://github.com/python/cpython/blob/9e335860188229a7985fe9a8b72ee62c684aa9eb/Lib/functools.py#L432
// https://www.geeksforgeeks.org/insertion-in-doubly-circular-linked-list/
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
  if (record) {
    // push the record to the front queue
    const [linkPrev, linkNext, key, result] = record;
    linkPrev[NEXT] = linkNext;
    linkNext[PREV] = linkPrev;
    const last = root[PREV];
    last[NEXT] = record;
    root[PREV] = record;
    record[PREV] = last;
    record[NEXT] = root;
    return record[RESULT];
  } else {
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
//
// const EMPTY = null;
// const [PREV, NEXT, KEY, RESULT] = [0, 1, 2, 3] as const;

// class LRUCache {
//     private readonly MAX_SIZE;
//     private readonly storage;
//     private root;
//     constructor(capacity: number) {
//         this.MAX_SIZE =capacity;
//         this.storage = {};
//         this.root = Array.from(Array(4));
//         this.root[PREV] = this.root;
//         this.root[NEXT] = this.root;
//         this.root[KEY] = EMPTY;
//         this.root[RESULT] = EMPTY;
//     }

//     public get full() {
//         return Object.keys(this.storage).length >= this.MAX_SIZE;
//     }

//     get(key: number): number {
//         const record = this.storage[key];
//         if (record) {
//             // push the record to the front queue
//             const [linkPrev, linkNext, _key, result] = record;
//             linkPrev[NEXT] = linkNext;
//             linkNext[PREV] = linkPrev;
//             const last = this.root[PREV];
//             last[NEXT] = record;
//             this.root[PREV] = record;
//             record[PREV] = last;
//             record[NEXT] = this.root;
//             return result;
//         } else {
//             return -1;
//         }

//     }

//     put(key: number, value: number): void {
//         const record = this.storage[key];
//         if (record) {
//             // when we update here, make sure to put it at the front of queue
//             record[RESULT] = value;
//             const [linkPrev, linkNext, _key, result] = record;
//             linkPrev[NEXT] = linkNext;
//             linkNext[PREV] = linkPrev;
//             const last = this.root[PREV];
//             last[NEXT] = record;
//             this.root[PREV] = record;
//             record[PREV] = last;
//             record[NEXT] = this.root;
//             return;
//         }
//         if (this.full) {
//         // handle when the queue is full
//         const oldRoot = this.root;
//         oldRoot[KEY] = key;
//         oldRoot[RESULT] = value;
//         // root is at the end of the queue
//         // Empty the oldest link and make it the new root.
//         this.root = oldRoot[NEXT];
//         const oldKey = this.root[KEY];
//         this.root[KEY] = EMPTY;
//         this.root[RESULT] = EMPTY;
//         delete this.storage[oldKey];
//         this.storage[key] = oldRoot;
//     } else {
//         // add new item to the queue
//         // Put result in a new link at the front of the queue.
//         const last = this.root[PREV];
//         const link = [last, this.root, key, value];
//         last[NEXT] = link;
//         this.root[PREV] = link;
//         this.storage[key] = link;
//         }
//     }
// }

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
