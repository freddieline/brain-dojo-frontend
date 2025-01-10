import Link from '@mui/material/Link';
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
      <Link className="w-48" href="/memory-games/sequence" color="inherit" underline="hover">
        <h3 className="text-xl mt-3 decoration-1">
          Memorise the sequence
        </h3>
      </Link>
      <h3 className="text-sm">
        Images{" "}
        <a href="http://www.freepik.com" style={{ textDecoration: "none" }}>
          designed by brgfx / Freepik
        </a>
      </h3>
      <Link className="w-48" href="/memory-games/association" color="inherit" underline="hover">
        <h3 className="text-xl mt-4 decoration-1">
          Memorise the capital cities
        </h3>
      </Link>
    </Layout>
  );
};

export default MemoryGames;
