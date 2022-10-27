const Vehicle = () => (
  <div>
    <div className="relative w-32 h-14 overflow-hidden border border-neutral-300 rounded-lg" />
    {/* Kolečka */}
    <div className="relative overflow-hidden w-30 h-8">
      <div className="absolute -top-[3px] left-4 w-[13px] h-[14px] border rounded-full border-neutral-300" />
      <div className="absolute -top-[3px] left-24 w-[13px] h-[14px] border rounded-full border-neutral-300" />
    </div>
  </div>
);

export default Vehicle;
