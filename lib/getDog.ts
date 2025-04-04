type BreedData = {
  name: string;
  breed_group: string;
  temperament: string;
  life_span: string;
  height: {
    imperial: string;
    metric: string;
  };
  weight: {
    imperial: string;
    metric: string;
  };
};

type ImageData = {
  url: string;
};

export async function getDogData(breedId: number): Promise<{ breed: BreedData; image: string | null }> {
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
        throw new Error("API call limit exceeded? Try again later.");
      } else if (breedRes.status >= 500 && breedRes.status < 600) {
        throw new Error("API server currently unavailable. Try again later.");
      } else {
        throw new Error(`Error fetching breed data: ${breedRes.statusText}`);
      }
    }

    const breed: BreedData = await breedRes.json();

    const imageRes = await fetch(
      `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}`,
      { headers: { "x-api-key": API_KEY } }
    );

    if (!imageRes.ok) {
      throw new Error("Error fetching image data.");
    }

    const imageData: ImageData[] = await imageRes.json();
    const image = imageData?.[0]?.url ?? null;

    return { breed, image };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching dog data:", error.message);
      throw error;
    } else {
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred.");
    }
  }
}
