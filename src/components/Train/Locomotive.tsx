const Locomotive = () => (
  <div>
    <div className="relative w-32 h-14 overflow-hidden border border-neutral-300 rounded-lg rounded-tr-[35px]">
      <div className="absolute -top-[1px] w-16 h-8 left-20 border rounded-l-xl border-neutral-300" />
      <div className="absolute -bottom-5 -left-5 w-20 h-8 bg-white border rounded-md border-neutral-300" />
    </div>
    {/* Wheels */}
    <div className="relative overflow-hidden w-30 h-8 ">
      <div className="absolute -top-[3px] left-4 w-[13px] h-[14px] border rounded-full border-neutral-300" />
      <div className="absolute -top-[3px] left-24 w-[13px] h-[14px] border rounded-full border-neutral-300" />
      <div className="absolute -top-[3px] left-24 w-[13px] h-[14px] border rounded-full border-neutral-300" />
      <div className="absolute -top-[3px] left-20 w-[13px] h-[14px] border rounded-full border-neutral-300" />
    </div>
  </div>
);

export default Locomotive;
