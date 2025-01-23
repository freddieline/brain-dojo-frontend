import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import { Size } from "./types/constants";

const Home = () => {
  return (
    <Layout size={Size.small}>
      <div className="flex flex-col">
        <div>
          <div className={`w-[100%] overflow-hidden`}>
            <img src="brain-dojo.png" alt="Logo" />
          </div>
          <Link
            to="/memory-games"
            className="no-underline text-black hover:underline"
          >
            <h3 className="text-xl mt-6">Memory games</h3>
          </Link>
          <Link
            to="/word-games"
            className="no-underline text-black hover:underline grow"
          >
            <h3 className="text-xl mt-6">Word games</h3>
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

export default Home;
