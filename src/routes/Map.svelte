<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import mapboxgl from 'mapbox-gl';
  
    
    let map: mapboxgl.Map;
    let mapContainer: HTMLDivElement;
    let lng: number, lat: number, zoom: number;
  
    lng = 0.002;
    lat = 51.505412;
    zoom = 12;
  
    function updateData() {
      zoom = map.getZoom();
      lng = map.getCenter().lng;
      lat = map.getCenter().lat;
    }
  
    onMount(() => {
      const initialState = { lng: lng, lat: lat, zoom: zoom };
  
        map = new mapboxgl.Map({
            container: mapContainer,
            accessToken: "pk.eyJ1Ijoib2FqbWVyZWRpdGgiLCJhIjoiY201anJ1cXphMTA2dDJtc2dhdDc5aWVxZCJ9.ffJzP_PQVeKmR5wu-Udoeg",
            style: `mapbox://styles/mapbox/light-v11`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });
      
      map.setMinZoom(10);
      
      new mapboxgl.Marker()
        .setLngLat([initialState.lng, initialState.lat])
        .addTo(map);

      map.on('move', () => {
        updateData();
      });
    });
  
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
    <div class="sidebar">
      Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom:
      {zoom.toFixed( 2 )}
    </div>
    <div class="map-wrap">
      <div class="absolute w-full h-full" bind:this="{mapContainer}" ></div>
    </div>
  </section>
  
  <style>
    .sidebar {
      background-color: rgb(35 55 75 / 90%);
      color: #fff;
      padding: 6px 12px;
      font-family: monospace;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      margin: 12px;
      border-radius: 4px;
    }
  </style>