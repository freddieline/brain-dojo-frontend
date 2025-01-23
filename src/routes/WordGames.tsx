import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Size } from "../types/constants";

const WordGames = () => {
  return (
    <Layout size={Size.small}>
      <div className="flex flex-col">
        <div className="">
          <div className={`w-[100%] overflow-hidden`}>
            <img src="brain-dojo.png" alt="Logo" />
          </div>
          <div className="mt-6 font-bold">
            <a href="/">Home</a> {">"} Word Games
          </div>
          <Link
            to="/word-games/word-wheel"
            className="no-underline text-black hover:underline"
          >
            <h3 className="text-xl mt-3">Word Wheel</h3>
          </Link>
        </div>
        <div className="absolute bottom-5">
          <a href="https://buymeacoffee.com/freddieline">
            <img
              src="bmc-full-logo.png"
              width={200}
              className="mb-2 hover:pointer"
            />
          </a>
          created by Freddie Line
        </div>
      </div>
    </Layout>
  );
};

export default WordGames;
