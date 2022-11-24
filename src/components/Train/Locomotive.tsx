const Locomotive = () => (
  <div>
    <div className="relative w-32 h-14 overflow-hidden border border-black rounded-lg rounded-tr-[35px]">
      <div className="absolute -top-[1px] w-16 h-8 left-20 border rounded-l-xl border-black" />
      <div className="absolute -bottom-5 -left-5 w-20 h-8 bg-white border rounded-md border-black" />
    </div>
    {/* Wheels */}
    <div className="relative overflow-hidden w-30 h-3 ">
      <div className="absolute -top-[3px] left-4 w-[13px] h-[14px] border rounded-full border-black" />
      <div className="absolute -top-[3px] left-24 w-[13px] h-[14px] border rounded-full border-black" />
      <div className="absolute -top-[3px] left-24 w-[13px] h-[14px] border rounded-full border-black" />
      <div className="absolute -top-[3px] left-20 w-[13px] h-[14px] border rounded-full border-black" />
    </div>
  </div>
);

export default Locomotive;
