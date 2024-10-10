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

	<p>LRU Cache implementation</p>

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
</main>

<style>
	main {
		max-width: 1024px;
		margin-inline: auto;
	}

	h2 {
		margin: 1rem 0;
	}

	.emoji {
		width: 32px;
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

	/* .cache {
		display: flex;
		align-items: center;
		justify-content: space-between;
	} */
</style>
