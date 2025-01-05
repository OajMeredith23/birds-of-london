import { EBIRD_TOKEN } from '$env/static/private';
import { PUBLIC_LAT, PUBLIC_LON } from '$env/static/public';

// export const prerender = false;


export async function load(){
  // console.log("fetching data");
  const headers = new Headers();
  headers.append("X-eBirdApiToken", EBIRD_TOKEN);
  
  
  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  const url = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${PUBLIC_LAT}&lng=${PUBLIC_LON}&dist=20&sort=species&back=30`
  console.log("fetching data from eBird API", url);
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return { 
              ebird: result
            } 
            
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: (error as Error).message };
  }

}
  