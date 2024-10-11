<script>
	import { emojis } from '$lib/emojis.js';
	import { LRUCache } from '$lib/lruCache.js';
	import '../globals.css';

	const cacheCapacity = 10;

	let cache = new LRUCache(cacheCapacity);

	function getEmojiFromCache(emoji) {
		if (cache.get(emoji) == -1) {
			cache.put(emoji, emoji);
		}
		cache = cache;
	}
</script>

<main>
	<h1>CapyCache</h1>

	<p>
		A <b>Least Recently Used</b> (LRU) Cache is a caching mechanism where a limited number of items
		are stored and evicts the least recently accessed item when the cache reaches its maximum
		capacity. The cache maintains a list of items, where the most recently accessed items are
		usually placed at the front of the list and the least recently used ones are placed at the end.
		The data structure is often implemented with a <b>doubly linked list</b> and a <b>hash map</b> to
		optimize insertion and update operations.
	</p>

	<p>
		LRU Cache can be applied in a handful of ways. In this example, we are simulating an emoji
		keyboard, where we store the 10 <b>most recent</b> emojis in the cache. Once we reach full capacity,
		the least recent emojis are no longer part of the cache.
	</p>

	<div class="keyboard">
		<h2>Recently Used (Limit: {cacheCapacity})</h2>
		{#key cache}
			<div class="keys">
				{#each cache.getAll() as emoji (emoji)}
					<img src="/{emoji.key}.webp" alt="Emoji" class="emoji" />
				{/each}
			</div>
		{/key}

		<h2>Emojis</h2>
		<div class="keys">
			{#each emojis as emoji}
				<span
					role="button"
					tabindex="0"
					on:click={() => getEmojiFromCache(emoji)}
					on:keydown={() => getEmojiFromCache(emoji)}
					tabIndex="0"
				>
					<img src="/{emoji}.webp" alt="Emoji" class="emoji" />
				</span>
			{/each}
		</div>
	</div>

	<div class="bottom">
		<span>
			Developed with 💚 by <a target="_blank" href="https://github.com/acmcsufoss">acmcsufoss.</a>
		</span>
		<span><a target="_blank" href="https://github.com/tomasohCHOM/capycache">Source Code</a></span>
	</div>
</main>

<style>
	main {
		max-width: 768px;
		margin-inline: 1.5rem;
	}

	h2 {
		margin: 1rem 0;
		font-size: 1.25rem;
	}

	a {
		color: rgb(var(--color-contrast));
		text-underline-offset: 2px;
	}

	.emoji {
		width: 26px;
		cursor: pointer;
	}

	.keyboard {
		width: 100%;
		padding: 1rem;
		background-color: rgb(var(--color-secondary));
		border-radius: 0.75rem;
	}

	.keys {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		align-items: center;
	}

	.bottom {
		margin-block: 1rem;
		display: grid;
	}

	@media screen and (min-width: 768px) {
		main {
			margin-inline: auto;
		}
	}
</style>
