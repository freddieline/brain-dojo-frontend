import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import { Size } from "./types/constants";

const Home = () => {
  return (
    <Layout size={Size.small}>
      <div className="flex flex-col">
        <div className="flex-grow">
          <div className={`w-[100%] overflow-hidden`}>
            <img src="brain-dojo.png" alt="Logo" />
          </div>
          <Link to="/memory-games" className="w-48 no-underline text-black hover:underline">
            <h3 className="text-xl mt-6">
              Memory games
            </h3>
          </Link>
          <Link to="/word-games" className="w-48 no-underline text-black hover:underline">
            <h3 className="text-xl mt-6">Word games</h3>
          </Link>
        </div>
        <div className="fixed bottom-0 left-0 p-3">created by Freddie Line</div>
      </div>
    </Layout>
  );
};

export default Home;
