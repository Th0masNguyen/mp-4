export async function getDogData(breedId: number) {
  const API_KEY = process.env.DOG_API_KEY;
  if (!API_KEY) {
    throw new Error('DOG_API_KEY is not defined in the env variables');
  }

  try {
    const breedRes = await fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`, {
      headers: { "x-api-key": API_KEY },
    });

    if (!breedRes.ok) {
      if (breedRes.status === 429) {
        throw new Error("API call limit exceeded?. Try again later");
      } else if (breedRes.status >= 500 && breedRes.status < 600) {
        throw new Error("API server is currently unavailable. Try again later");
      } else {
        throw new Error(`Error fetching breed data: ${breedRes.statusText}`);
      }
    }

    const breed = await breedRes.json();

    const imageRes = await fetch(
      `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}`,
      { headers: { "x-api-key": API_KEY } }
    );

    if (!imageRes.ok) {
      throw new Error("Error fetching image data.");
    }

    const imageData = await imageRes.json();
    const image = imageData?.[0]?.url ?? null;

    return { breed, image };
  } catch (error: any) {
    console.error("Error fetching dog data:", error.message);
    throw error;
  }
}
