import Locomotive from "../components/Train/Locomotive";
import Vehicle from "../components/Train/Vehicle";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl pb-6">Instrukce do aplikace</h1>
      <div className="flex pb-10 gap-6">
        Lokomotiva =
        <Locomotive />
      </div>
      <div className="flex gap-14">
        Vagon =
        <Vehicle />
      </div>
    </div>
  );
};

export default HomePage;
