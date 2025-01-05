<script lang="ts">
    import type { EBirdResponse, Bird } from '../types/e-bird';
    import {BirdMarker} from '../components/bird-marker.ts';

    import { PUBLIC_LAT, PUBLIC_LON } from '$env/static/public';
    
    const { ebird }: EBirdResponse = $props();


    let groupedBirds = $derived(
        ebird.reduce((acc: {[key: string]: Bird[]}, bird: Bird) => {
            if(!acc[bird.locName]) {
                acc[bird.locName] = [];
            }
            acc[bird.locName].push(bird);
            return acc;
        }, {})
    )
    
    // const groupedBirds = $derived(
    //     ebird.reduce((acc: Bird[], bird: Bird) => {
    //         if (!acc[bird.locName]) {
    //             acc[bird.locName] = [];
    //         }
    //         acc[bird.locName].push(bird);
    //         return acc;
    //     }, {})
    // );
</script>

<aside class="fixed z-[100] top-4 right-4 bottom-4 w-1/4 bg-slate-50 rounded-md shadow-lg p-4 overflow-y-scroll">
    <ul class="space-y-4">
        {#each Object.entries(groupedBirds) as [location, birds]}
            <li>
                <h3 class="font-semibold">{location}</h3>
                <ul class="space-y-2">
                    {#each birds as bird}
                        <li>{bird.comName}</li>
                        <li>
                            {bird.lat}, {bird.lng}
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul>
</aside>
