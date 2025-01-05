<script lang="ts">


    import type { EBirdResponse } from '../types/e-bird';
    import {BirdMarker} from '../components/bird-marker.ts';

    import { onMount, onDestroy } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import { PUBLIC_MAPBOX_TOKEN, PUBLIC_LAT, PUBLIC_LON } from '$env/static/public';
    
    const { ebird }: EBirdResponse = $props();

    let map: mapboxgl.Map;
    let mapContainer: HTMLDivElement;
    let lng: number = $state(+PUBLIC_LON)
    let lat: number = $state(+PUBLIC_LAT)
    let zoom: number = $state(2);
  
    function updateData() {
      zoom = map.getZoom();
      lng = map.getCenter().lng;
      lat = map.getCenter().lat;
    }
  
    onMount(() => {
      const initialState = { lng: lng, lat: lat, zoom: zoom };
  
        map = new mapboxgl.Map({
            container: mapContainer,
            accessToken: PUBLIC_MAPBOX_TOKEN,
            style: `mapbox://styles/oajmeredith/cm5jtgwh5002u01pka9h84ssd`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });

        setTimeout(() => {
          map.flyTo({
            center: [initialState.lng, initialState.lat],
            zoom: 10,
            speed: 0.8,
          });
        }, 1000)

      map.on('move', () => {
        updateData();
      });
    });
  
    $effect(() => {
      for(let bird of ebird) {
        const marker = new BirdMarker(bird);
        
        new mapboxgl.Marker(marker.render())
          .setLngLat([bird.lng, bird.lat])
          .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${bird.comName}</h3><p>${bird.locName}</p>`
            )
        )
          .addTo(map);
      }
    })
    onDestroy(() => {
    //   map.remove();
    });
  </script>
  
  <svelte:head>
    <link
      href="https://api.tiles.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css"
      rel="stylesheet"
    />
  </svelte:head>
  
  <section class="fixed top-0 z-1  h-screen w-screen">
    <div class="bg-slate-500 text-slate-50 p-2 absolute top-4 left-4 z-10 rounded-md font-mono">
      Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom:
      {zoom.toFixed( 2 )}
    </div>
    <div class="map-wrap">
      <div class="absolute w-full h-full" bind:this="{mapContainer}" ></div>
    </div>
  </section>
