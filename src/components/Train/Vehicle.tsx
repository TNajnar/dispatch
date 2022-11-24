interface VehicleProps {
  id?: number;
}

const Vehicle = ({ id }: VehicleProps) => (
  <div>
    <div className="relative w-[100px] h-14 overflow-hidden border border-black rounded-lg" />
    {/* Wheels */}
    <div className="relative overflow-hidden w-30 h-3">
      <div className="absolute -top-[3px] left-4 w-[13px] h-[14px] border rounded-full border-black" />
      <div className="absolute -top-[3px] left-[70px] w-[13px] h-[14px] border rounded-full border-black" />
    </div>
  </div>
);

export default Vehicle;
