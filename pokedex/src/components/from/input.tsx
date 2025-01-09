interface InputProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  value?: string;  
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, icon, value, onChange }) => {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}  
        onChange={onChange}
        className="bg-gray-50 border-red-500 text-gray-950 text-sm rounded-full block pl-10 p-2.5 w-80 outline-none"
      />
    </div>
  );
};

export default Input;
