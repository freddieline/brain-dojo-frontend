import { Link } from "react-router-dom";
import Layout from "./layout/Layout";
import { Size } from "./types/types";

const Home = () => {
  return (
    <Layout size={Size.small}>
      <h1 className="text-[50px] font-bold mb-6 text-center knewave-regular text-black">
        Brain Dojo
      </h1>
      <div className={`w-[100%] overflow-hidden`}>
        <img src="brain.png" alt="Logo" />
      </div>
      <Link className="w-48" to="/sequence-recall">
        <h3 className="text-xl underline mt-6">Memorise the sequence</h3>
      </Link>
      <h3 className="text-md">
        Images <a href="http://www.freepik.com">designed by brgfx / Freepik</a>
      </h3>
      <Link className="w-48" to="/association-recall">
        <h3 className="text-xl underline mt-6">Memorise the capital cities</h3>
      </Link>
      <Link className="w-48" to="/numerical-reasoning">
        <h3 className="text-xl underline mt-6">Numerical reasoning</h3>
      </Link>
    </Layout>
  );
};

export default Home;
