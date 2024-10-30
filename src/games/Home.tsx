import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const Home = () => {
  return (
    <Layout>
      <h1 className="text-[50px] font-bold mb-6 text-center knewave-regular text-black">
        Brain Dojo
      </h1>

      <div className={`w-[100%] overflow-hidden`}>
        <img src="brain.png" alt="Logo" />
      </div>
      <Link className="w-48" to="/memory-game">
        <h3 className="text-xl underline mt-6">Memory game</h3>
      </Link>
      <h3 className="text-md">
        Images <a href="http://www.freepik.com">designed by brgfx / Freepik</a>
      </h3>
    </Layout>
  );
};

export default Home;
