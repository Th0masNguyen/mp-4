import RandomDogButton from "@/components/RandomDogButton";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          Dogs! Puppies! Puppers! Doggos!
        </h1>
        <img
          src="/images/dog.gif"
          alt="Dog GIF"
          className="mx-auto w-64 h-64 mb-4"
        />
        <RandomDogButton />
      </div>
    </main>
  );
}
