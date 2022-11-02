import Locomotive from "../Train/Locomotive";
import Vehicle from "../Train/Vehicle";

const VehicleRow = () => {
  return (
    <div className="grid">
      <div className="grid grid-cols-4 text-center font-bold border-b border-black">
        <h3 className="col-span-2 border-r border-black">Vozy</h3>
        <h3 className="font-bold border-r border-black">Lokomotiva</h3>
        <h3 className="font-bold">Spoj</h3>
      </div>
      <div className="grid grid-cols-4 pt-4 place-items-center">
        <div className="flex col-span-2 items-center gap-4">
          <Vehicle />
          <Vehicle />
          <Vehicle />
          <Vehicle />
        </div>
        <div>
          <Locomotive />
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 border border-black">1011</div>
          <div className="px-4 py-2 border border-black">1051</div>
        </div>
      </div>
    </div>
  );
};

export default VehicleRow;
