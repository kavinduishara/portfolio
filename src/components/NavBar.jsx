import useCurrentSection from './useCurrentSection';



function NavBar() {
  const sectionIds = ['home','About', 'skills', 'Projects','Contact'];
  const activeSection = useCurrentSection(sectionIds);

  return (
    <nav className="w-full fixed top-0 z-50 bg-gray-600/50 backdrop-blur-sm border-b border-white/30 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-3">
        {/* Brand */}

          <div className="fonttoadd text-gray-100 text-lg font-bold">
          <a href="/">Portfolio</a>
        </div>
        

        {/* Nav Menu */}
        <ul className="flex font-sans font-semibold divide-x divide-gray-300 overflow-hidden">
          {sectionIds.map((item, index) => (
            <li key={item} className="relative w-20 text-center">
  {/* Indicator bar */}


  {/* Link text */}
  <a
    href={`#${item}`}
    className="block px-4 py-2 text-black transition duration-300 relative z-10 text-white"
  >
    {item}
  </a>
    <div
    className={` h-2  bg-white rounded-full transition-all duration-300 ease-in-out z-[-1] ${
      activeSection === item ? 'w-full opacity-100' : 'w-0 opacity-0'
    }`}
  ></div>
</li>

          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
