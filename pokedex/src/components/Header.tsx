
import { TbPokeball } from "react-icons/tb";
import { Link } from "react-router-dom";

const Header = ({ children }: { children: React.ReactNode }) => {
      return (
        <>
        <Link to={"/"}>
        <div className="bg-red-600 text-white py-4 fixed top-0 left-0 right-0 z-99">
            <div className="container mx-auto px-4">
                <h1 className="text-xl font-bold flex items-center mb-1">
                    <TbPokeball size={50} className="mr-2"/>
                    Pokedex 
                </h1>
                {children}
                
            </div>
        </div>
        </Link>
        </>
    );
};
export default Header;