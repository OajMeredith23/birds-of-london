<script lang="ts">
	import { onMount } from 'svelte';
	import type { EBirdResponse } from '../types/e-bird';
	import Map from "../components/Map.svelte";
	import List from "../components/List.svelte";
	import { PUBLIC_LAT, PUBLIC_LON } from '$env/static/public';
	
	let {lat, lon} = $state({lat: PUBLIC_LAT, lon: PUBLIC_LON});

	let data: EBirdResponse = $state({ebird: []})
	async function getBirdData(): Promise<EBirdResponse>{
		const res = await fetch(`/birds?lat=${lat}&lon=${lon}`, );
		const data: EBirdResponse = await res.json();
		console.log("Birds from api", data);
		return data;
	}

	onMount(async () => {
		data = await getBirdData();
	})

	
</script>

<svelte:head>
	<title>Birds of London</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Birds of London
	</h1>

	
	<Map ebird={data.ebird}/>
	{#if Object.keys(data.ebird).length === 0}
		<p>Loading...</p>
	{:else}
		<List ebird={data.ebird}/>
		<!-- <Map ebird={data.ebird}/> -->
	{/if}
</section>

<style>
</style>
