import { EBIRD_TOKEN } from '$env/static/private';
import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (req) => {
    
  const lat = req.url.searchParams.get('lat');
  const lon = req.url.searchParams.get('lon');
  const headers = new Headers();
  headers.append("X-eBirdApiToken", EBIRD_TOKEN);
  
  console.log({lat, lon});
  
  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  const url = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lon}&dist=20&sort=species&back=30`
  console.log("fetching data from eBird API", url);
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return json({
                ebird: result
            })

            
  } catch (error) {
    console.error("Error fetching data:", error);
    return json({ error: (error as Error).message }, { status: 500 });
  }
}

