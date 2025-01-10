import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Size } from "../types/constants";

const MemoryGames = () => {
  return (
    <Layout size={Size.small}>
      <div className={`w-[100%] overflow-hidden`}>
        <img src="brain-dojo.png" alt="Logo" />
      </div>
      <div className="mt-6 font-bold">
        <a href="/">Home</a> {">"} Memory Games
      </div>
      <Link to="/memory-games/sequence" className="no-underline text-black hover:underline decoration-2">
        <h3 className="text-xl mt-3">
          Memorise the sequence
        </h3>
      </Link>
      <h3 className="text-sm">
        Images{" "}
        <a href="http://www.freepik.com" style={{ textDecoration: "none" }}>
          designed by brgfx / Freepik
        </a>
      </h3>
      <Link to="/memory-games/association" className="no-underline text-black hover:underline">
        <h3 className="text-xl mt-4">
          Memorise the capital cities
        </h3>
      </Link>
    </Layout>
  );
};

export default MemoryGames;
