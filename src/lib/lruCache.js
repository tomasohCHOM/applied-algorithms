class Node {
	constructor(key, val) {
		this.key = key;
		this.val = val;
		this.prev = null;
		this.next = null;
	}
}

export class LRUCache {
	constructor(capacity) {
		this.cap = capacity;
		this.cache = new Map(); // map key to node

		// Intialize head (mru) and tail (lru) pointers
		this.mostRecentlyUsed = new Node('MRU', 0);
		this.leastRecentlyUsed = new Node('LRU', 0);

		// Link head and tail nodes to form doubly linked list
		this.mostRecentlyUsed.next = this.leastRecentlyUsed;
		this.leastRecentlyUsed.prev = this.mostRecentlyUsed;
	}

	remove(node) {
		let prev = node.prev;
		let next = node.next;
		prev.next = next;
		next.prev = prev;
	}

	insert(node) {
		let prevMRU = this.mostRecentlyUsed.next;

		// Insert the node to the front (as the MRU item)
		prevMRU.prev = node;
		node.next = prevMRU;
		node.prev = this.mostRecentlyUsed;
		this.mostRecentlyUsed.next = node;
	}

	get(key) {
		if (this.cache.has(key)) {
			// Move the node to the most recently used position
			this.remove(this.cache.get(key));
			this.insert(this.cache.get(key));
			return this.cache.get(key).val;
		}
		return -1;
	}

	put(key, value) {
		if (this.cache.has(key)) {
			this.remove(this.cache.get(key));
		}
		// Insert the new node and add it to the cache
		let newNode = new Node(key, value);
		this.insert(newNode);
		this.cache.set(key, newNode);

		if (this.cache.size > this.cap) {
			let lru = this.leastRecentlyUsed.prev;
			this.remove(lru);
			this.cache.delete(lru.key);
		}
	}

	getAll() {
		let current = this.mostRecentlyUsed.next;
		const result = [];
		while (current !== this.leastRecentlyUsed) {
			result.push({ key: current.key, value: current.val });
			current = current.next;
		}
		return result;
	}
}
