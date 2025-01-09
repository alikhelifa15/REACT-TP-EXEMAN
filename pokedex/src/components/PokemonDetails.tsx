import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./loader";
import Header from "./Header";

interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  types: { id: number; name: string; image: string }[];
  stats: {
    HP: number;
    speed: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
  };
  evolutions: { pokedexId: number; name: string }[];
}

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: pokemon, isLoading, error } = useQuery<PokemonDetail>({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const response = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons/${id}`);
      if (!response.ok) throw new Error("Erreur lors du chargement du Pokémon.");
      return response.json();
    },
  });

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Erreur lors du chargement du Pokémon.
      </p>
    );
  }

  if (!pokemon) return null;

  return (
    <>
    <Header>
      <h1 className="flex items-center justify-center">Détails du Pokémon</h1>

      </Header>
    <div className="container mx-auto p-40">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-red-800 text-white rounded"
      >
        Retour
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold mb-4">{pokemon.name}</h1>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-48 h-48 object-contain"
          />
          <div className="flex gap-2 mt-4">
            {pokemon.types.map((type) => (
              <div
                key={type.id}
                className="flex items-center gap-2 px-3 py-1 rounded bg-gray-200 text-sm"
              >
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-6 h-6"
                />
                {type.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>HP: {pokemon.stats.HP}</p>
              <p>Attaque: {pokemon.stats.attack}</p>
              <p>Défense: {pokemon.stats.defense}</p>
            </div>
            <div>
              <p>Attaque Spé.: {pokemon.stats.specialAttack}</p>
              <p>Défense Spé.: {pokemon.stats.specialDefense}</p>
              <p>Vitesse: {pokemon.stats.speed}</p>
            </div>
          </div>
        </div>

        {pokemon.evolutions.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Évolutions</h2>
            <div className="flex flex-wrap gap-4">
              {pokemon.evolutions.map((evolution) => (
                <div
                  key={evolution.pokedexId}
                  className="flex flex-col items-center p-4 bg-gray-100 rounded"
                  onClick={() => navigate(`/pokemon/${evolution.pokedexId}`)}
                  role="button"
                >
                  <p className="mt-2 text-sm font-medium">{evolution.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default PokemonDetail;
