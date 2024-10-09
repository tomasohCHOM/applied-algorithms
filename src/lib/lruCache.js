class Node {
	constructor(key, val) {
		this.key = key;
		this.val = val;
		this.prev = null;
		this.next = null;
	}
}

class LRUCache {
	constructor(capacity) {
		this.cap = capacity;
		this.cache = new Map(); // map key to node

		// Intialize left (lru) and right (mru) pointers
		this.left = new Node(0, 0);
		this.right = new Node(0, 0);

		// Link left and right nodes to form doubly linked list
		this.left.next = this.right;
		this.right.prev = this.left;
	}

	remove(node) {
		let prev = node.prev;
		let next = node.next;
		prev.next = next;
		next.prev = prev;
	}

	insert(node) {
		let prev = this.right.prev;
		let next = this.right;

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
			let lru = this.left.next;
			this.remove(lru);
			this.cache.delete(lru.key);
		}
		console.log(this);
	}
}
