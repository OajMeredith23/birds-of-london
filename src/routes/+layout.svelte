<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="space-y-4">
	<Header />

	<main>
		{@render children()}
	</main>

</div>

<style>
</style>
