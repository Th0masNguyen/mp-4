"use client";

import { useRouter } from "next/navigation";

export default function RandomDogButton() {
  const router = useRouter();

  const getRandomDog = async () => {
    const randomId = Math.floor(Math.random() * 262) + 1;
    router.push(`/${randomId}`);
  };

  return (
    <button
      onClick={getRandomDog}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 hover:shadow-lg hover:scale-105 transition duration-200"
    >
      Get Dawgs Now! 🐕
    </button>
  );
}
