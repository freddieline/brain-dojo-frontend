import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import { Size } from "./types/constants";

const Home = () => {
  return (
    <Layout size={Size.small}>
      <div className={`w-[100%] overflow-hidden`}>
        <img src="brain-dojo.png" alt="Logo" />
      </div>
      <Link className="w-48" to="/memory-games">
        <h3 className="text-xl underline mt-6 decoration-1">Memory games</h3>
      </Link>
      <Link className="w-48" to="/word-games">
        <h3 className="text-xl underline mt-6 decoration-1">Word games</h3>
      </Link>
    </Layout>
  );
};

export default Home;
