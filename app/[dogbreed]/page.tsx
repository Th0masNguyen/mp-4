import { getDogData } from "@/lib/getDog";
import RandomDogButton from "@/components/RandomDogButton";

type Props = {
  params: Promise<{ dogbreed?: string }>;
};

type BreedData = {
  breed: {
    name: string;
    breed_group: string;
    temperament: string;
    life_span: string;
    height: { imperial: string };
    weight: { imperial: string };
  };
  image: string | null;
};

export default async function DogBreedPage({ params }: Props) {
  const { dogbreed } = await params;

  if (!dogbreed) return <div>Invalid breed ID.</div>;

  const breedId = parseInt(dogbreed, 10);
  if (isNaN(breedId)) return <div>Invalid breed ID.</div>;

  let data: BreedData | null = null;
  let errorMessage = "";

  try {
    data = await getDogData(breedId);
    if (!data) {
      errorMessage = "Breed not found.";
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage = `Error fetching dog data: ${error.message}`;
    } else {
      errorMessage = "An unknown error occurred.";
    }
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!data) {
    return <div>Breed data is unavailable.</div>;
  }

  const imageContent =
    data.image && data.image.length > 0 ? (
      <img src={data.image} alt={data.breed.name} className="mt-4 w-64" />
    ) : (
      <div className="mt-4 text-gray-500">No images for this breed 😞</div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-2">
      <h1 className="text-3xl font-bold text-center">{data.breed.name}</h1>
      {imageContent}
      <p className="mt-4 text-center">
        <strong>Group:</strong> {data.breed.breed_group}
      </p>
      <p className="text-center">
        <strong>Temperament:</strong>{" "}
        {data.breed.temperament || "No Temperament info for this breed"}
      </p>

      <p className="text-center">
        <strong>Lifespan:</strong> {data.breed.life_span}
      </p>

      <p className="text-center">
        <strong>Height:</strong>{" "}
        {data.breed.height.imperial + " in" || "Varies"}
      </p>

      <p className="text-center">
        <strong>Weight:</strong>{" "}
        {data.breed.weight.imperial + " lbs" || "Varies"}
      </p>

      <RandomDogButton />
    </div>
  );
}
