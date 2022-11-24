const NavItems = [
  {
    name: "Domů",
    icon: "",
    url: "/",
  },
  {
    name: "Managemnet vozů",
    icon: "",
    url: "/manage-vehicles",
  },
  {
    name: "Odstavené vozy",
    icon: "",
    url: "/parked-vehicles",
  },
];

const Navbar = () => {
  return (
    <nav className="flex items-center justify-around bg-[#fabb00] text-black">
      <div className="flex">
        {NavItems.map(({ name, url }) => (
          <a
            key={name}
            href={url}
            className="py-4 w-[148px] text-center hover:bg-white hover:border-gray-300 hover:shadow-md hover:rounded-sm"
          >
            {name}
          </a>
        ))}
      </div>
      <div className="text-black">StudentAgencyLOGO</div>
    </nav>
  );
};

export default Navbar;
