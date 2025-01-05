<script lang="ts">

    import {ChevronLeft, ChevronRight} from 'lucide-svelte'
    import type { EBirdResponse, Bird } from '../types/e-bird';

    const { ebird }: EBirdResponse = $props();

    let visible = $state(false)

    let groupedBirds = $derived(
        ebird.reduce((acc: {[key: string]: Bird[]}, bird: Bird) => {
            if(!acc[bird.locName]) {
                acc[bird.locName] = [];
            }
            acc[bird.locName].push(bird);
            return acc;
        }, {})
    )
</script>

<aside class="fixed z-[100] top-4 right-4 max-w-1/4 max-h-[calc(100vh-2rem)] bg-slate-50 rounded-md shadow-lg overflow-y-scroll">
        <button class="fixed z-[100] top-4 right-4 bg-slate-50 shadow-lg rounded-full p-2" onclick={() => visible = !visible}>
            {#if visible}
                <ChevronRight/>
            {:else}
                <ChevronLeft/>
            {/if}
        </button>
        {#if visible}
            <ul class="space-y-4 m-4">
                {#each Object.entries(groupedBirds) as [location, birds]}
                <li>
                    <h3 class="font-semibold">{location}</h3>
                    <ul class="space-y-2">
                        {#each birds as bird}
                        <li>{bird.comName}</li>
                        {/each}
                    </ul>
                </li>
                {/each}
            </ul>
        {/if}
</aside>
