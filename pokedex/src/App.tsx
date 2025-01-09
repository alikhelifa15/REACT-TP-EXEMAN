import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import PokemonCard from "./components/Card";
import Layout from "./Layout";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import { useState } from "react";
import Loader from "./components/loader";
import { RxReload } from "react-icons/rx";

interface Pokemon {
  name: string;
  id: number;
  types: string[];
  image: string;
}

interface Type {
  id: number;
  name: string;
}

function App() {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedLimit, setSelectedLimit] = useState<number>(50);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: types = [] } = useQuery<Type[]>({
    queryKey: ["types"],

    queryFn: async () => {
      const response = await fetch("https://nestjs-pokedex-api.vercel.app/types");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des types");
      }
      return response.json();
    },
  });

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemon", selectedType ?? "all", selectedLimit, searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const url = new URL("https://nestjs-pokedex-api.vercel.app/pokemons");
      url.searchParams.append("page", pageParam.toString());
      url.searchParams.append("limit", selectedLimit.toString());

      if (selectedType !== null) {
        url.searchParams.append("typeId", selectedType.toString());
      }
      if (searchQuery.trim() !== "") {
        url.searchParams.append("name", searchQuery);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des pokémons");
      }

      const pokemons: Pokemon[] = await response.json();
      return {
        items: pokemons,
        nextPage: pageParam + 1,
        hasMore: pokemons.length === selectedLimit,
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.items.length > 0 && lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 60000,
  });

  const allPokemons = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Erreur lors du chargement des Pokémon : {error.message}
      </p>
    );
  }

  return (
    <>
      <Header>
        <FilterBar
          types={types}
          selectedType={selectedType}
          selectedLimit={selectedLimit}
          searchQuery={searchQuery}
          onTypeChange={setSelectedType}
          onLimitChange={setSelectedLimit}
          onSearchChange={setSearchQuery}
        />
      </Header>
      <Layout>
        <div className="mt-[8.9rem] mx-2 flex flex-wrap justify-around bg-white">
          {allPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types || []}
              image={pokemon.image}
            />
          ))}
          <div className="w-full h-10">
            {isFetchingNextPage && <Loader />}
          </div>
        </div>
        {hasNextPage && (
          <div className="flex justify-center p-2">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-4 py-2 bg-red-800 text-white rounded disabled:bg-gray-400 flex items-center gap-2"
            >
              <RxReload className="mr-2" /> Voir plus
            </button>
          </div>
        )}
      </Layout>
    </>
  );
}

export default App;
