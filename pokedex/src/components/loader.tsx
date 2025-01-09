import loader from "../assets/loader.gif"
const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">     
        <img src={loader} alt=""  className="w-32 h-32"/>
        </div>
    );
}
export default Loader;