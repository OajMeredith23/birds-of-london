<script lang="ts">
	import { onMount } from 'svelte';
	import type { EBirdResponse } from '../types/e-bird';
	import Map from "../components/Map.svelte";
	import List from "../components/List.svelte";
	
	const {data}: {data: EBirdResponse} = $props();
	console.log("Birds", data.ebird.length);



	// const getBirds = async () => {

	// 	const headers = new Headers();
	// 	headers.append("X-eBirdApiToken", "e9brqjsu4ui8");
		
	// 	console.log("Getting birds client")
	// 	const requestOptions = {
	// 		method: "GET",
	// 		headers: headers,
	// 	};
	// 	try {
	// 	const response = await fetch("https://api.ebird.org/v2/data/obs/GB/recent", requestOptions);
	// 	if (!response.ok) {
	// 	  throw new Error(`HTTP error! status: ${response.status}`);
	// 	}
	// 	const result = await response.json();
	// 	return { data: result };
	//   } catch (error) {
	// 	console.error("Error fetching data:", error);
	// 	return { error: (error as Error).message };
	//   }
	// }
	// onMount(() => {	
	// 	getBirds().then((result) => {
	// 		console.log("Result", result.data.length);
	// 	});
	// });
</script>

<svelte:head>
	<title>Birds of London</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Birds of London
	</h1>

	{#if Object.keys(data).length === 0}
		<p>Loading...</p>
	{:else}
		<List ebird={data.ebird}/>
		<Map ebird={data.ebird}/>
	{/if}
</section>

<style>
</style>
