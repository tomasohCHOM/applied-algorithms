<script>
	import { emojis } from '$lib/emojis.js';
	import { LRUCache } from '$lib/lruCache.js';
	import '../globals.css';

	const cache = new LRUCache(5);
</script>

<main>
	<h1>CapyCache</h1>

	<p>LRU Cache implementation</p>

	<div class="keyboard">
		<h2>Recently Used</h2>
		<div class="keys"></div>

		<h2>Emojis</h2>
		<div class="keys">
			{#each emojis as emoji}
				<img
					src="/{emoji}.webp"
					alt="Emoji"
					class="emoji"
					on:click={() => {
						cache.put(emoji, emoji);
					}}
				/>
			{/each}
		</div>
	</div>

	<div class="cache">
		<div class="head">HEAD</div>
		<div class="tail">TAIL</div>
	</div>
</main>

<style>
	main {
		max-width: 1024px;
		margin-inline: auto;
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
		justify-content: center;
	}

	.cache {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
