import Input from "./from/input";
import { FaSearch } from "react-icons/fa";
import Select from "./from/select";

interface Type {
  id: number;
  name: string;
}

interface FilterBarProps {
  types: Type[];
  selectedType: number | null;
  selectedLimit: number;
  searchQuery: string;  
  onTypeChange: (typeId: number | null) => void;
  onLimitChange: (limit: number) => void;
  onSearchChange: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  types,
  selectedType,
  selectedLimit,
  searchQuery,
  onTypeChange,
  onLimitChange,
  onSearchChange,
}) => {
  const limitOptions = [10, 20, 50, 100];

  const handleTypeChange = (selectedValue: string) => {
    if (selectedValue === "Tous les types") {
      onTypeChange(null);
    } else {
      const selectedTypeObj = types.find((type) => type.name === selectedValue);
      onTypeChange(selectedTypeObj?.id || null);
    }
  };

  const handleLimitChange = (value: string | number) => {
    onLimitChange(Number(value));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-start gap-2 p-2">
      <Input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchQuery}  
        onChange={(e) => onSearchChange(e.target.value)}
        icon={<FaSearch color="red" size={20} />}
      />
      <Select
        options={["Tous les types", ...types.map((type) => type.name)]}
        value={selectedType ? types.find((t) => t.id === selectedType)?.name || "Tous les types" : "Tous les types"}
        onChange={handleTypeChange}
      />
      <Select
        options={limitOptions}
        value={selectedLimit}
        onChange={handleLimitChange}
      />
    </div>
  );
};

export default FilterBar;
