import React from "react";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  id: number;
  name: string;
  types: { name: string; image: string }[]; 
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types, image }) => {
  return (
    <Link to={`/pokemon/${id}`} className="block">
      <div className="bg-white shadow-xl rounded-md m-2 text-center w-32">
        <div className="text-gray-400 text-right m-2">#{id}</div>
        <div className="flex justify-center items-center h-24">
          <img
            src={image}
            alt={name}
            className="w-auto h-16 object-contain"
          />
        </div>
        <div className="text-md bg-gray-100 p-2">
          {name}
          <div className="flex flex-row justify-center mt-2">
            {types.map((type, index) => (
              <img
                key={index}
                src={type.image}
                alt={type.name}
                title={type.name}
                className="w-5 h-5 mr-1"
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
