import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Size } from "../types/constants";

const WordGames = () => {
  return (
    <Layout size={Size.small}>
      <div className={`w-[100%] overflow-hidden`}>
          <img src="brain-dojo.png" alt="Logo" />
      </div>
      <div className="mt-6 font-bold"><a href="/">Home</a> {'>'}  Word Games</div>
      <Link className="w-48" to="/word-games/word-wheel">
        <h3 className="text-xl underline mt-3 decoration-1">
          Word Wheel
        </h3>
      </Link>
    </Layout>
  );
};

export default WordGames;
