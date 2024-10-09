<script>
	import '../globals.css';

	const emojis = [
		'aaronpog',
		'acm',
		'ai',
		'alanpog',
		'capycool',
		'capyprofessional',
		'design',
		'heartalgo',
		'heartmarketing',
		'oss',
		'algo',
		'capyexcite',
		'capyshock',
		'dev',
		'heartdesign',
		'heartoss',
		'specialevents',
		'aaronpog',
		'capyangry',
		'capyflushed',
		'capysmart',
		'gamedev',
		'heartdev',
		'icpc',
		'acm',
		'capyclassy',
		'capyhappy',
		'capysob',
		'heartacm',
		'heartgamedev',
		'marketing',
		'ai',
		'capyconfuzzle',
		'capylove',
		'capyvibe',
		'heartai',
		'hearticpc',
		'nodebuds'
	];
</script>

<h1>CapyCache</h1>

<div>
	{#each emojis as emoji}
		<img src="/{emoji}.webp" alt="Emoji" class="emoji" />
	{/each}
</div>

<div></div>

<style>
	.emoji {
		width: 32px;
	}
</style>
