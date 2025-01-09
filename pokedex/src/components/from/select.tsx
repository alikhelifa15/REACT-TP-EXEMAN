interface SelectProps<T> {
    options: T[];
    value: T;
    onChange: (value: T) => void;
    disabled?: boolean;
  }
  
  function Select<T extends string | number | readonly string[] | undefined>({
    options,
    value,
    onChange,
    disabled = false,
  }: SelectProps<T>) {
    return (
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as unknown as T)}
          className="w-40 px-4 py-2 border border-gray-300 text-gray-400 rounded-full shadow-sm focus:outline-none disabled:bg-gray-200 disabled:text-gray-500"
          disabled={disabled}
        >
          {options.map((option, index) => (
            <option key={index} value={option as unknown as string}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default Select;
  