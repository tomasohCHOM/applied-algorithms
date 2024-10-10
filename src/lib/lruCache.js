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

		// Intialize left (lru) and most_recently_used (mru) pointers
		this.least_recently_used = new Node('LRU', 0);
		this.most_recently_used = new Node('MRU', 0);

		// Link left and most_recently_used nodes to form doubly linked list
		this.least_recently_used.next = this.most_recently_used;
		this.most_recently_used.prev = this.least_recently_used;
	}

	remove(node) {
		let prev = node.prev;
		let next = node.next;
		prev.next = next;
		next.prev = prev;
	}

	insert(node) {
		let prev = this.most_recently_used.prev;
		let next = this.most_recently_used;

		prev.next = node;
		node.prev = prev;
		node.next = next;
		next.prev = node;
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
			let lru = this.least_recently_used.next;
			this.remove(lru);
			this.cache.delete(lru.key);
		}
	}

	getAll() {
		let current = this.most_recently_used.prev;
		let result = [];
		while (current !== this.least_recently_used) {
			result.push({ key: current.key, value: current.val });
			current = current.prev;
		}
		return result;
	}
}
