import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Size } from "../types/constants";

const MemoryGames = () => {
  return (
    <Layout size={Size.small}>
      <div className={`w-[100%] overflow-hidden`}>
        <img src="brain-dojo.png" alt="Logo" />
      </div>
      <div className="mt-6 font-bold"><a href="/">Home</a> {'>'} Memory Games</div>
      <Link className="w-48" to="/memory-games/sequence">
        <h3 className="text-xl underline mt-3 decoration-1">
          Memorise the sequence
        </h3>
      </Link>
      <h3 className="text-md">
        Images <a href="http://www.freepik.com" style={{textDecoration: 'none'}}>designed by brgfx / Freepik</a>
      </h3>
      <Link className="w-48" to="/memory-games/association">
        <h3 className="text-xl underline mt-3 decoration-1">
          Memorise the capital cities
        </h3>
      </Link>
    </Layout>
  );
};

export default MemoryGames;
