import { useEffect, useRef, useState } from "react";
import { IoCarOutline } from "react-icons/io5";
import { PiSignOutLight } from "react-icons/pi";
import { TfiMenu, TfiSettings } from "react-icons/tfi";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container flex items-center justify-between p-5 border-b-2 border-black">
      <div className="flex items-center gap-4 p-2 border-2 border-black">
        <IoCarOutline className="w-12 h-12" />
        <span className="text-xl font-bold">Spyne</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={toggleDropdown}
          >
            <TfiMenu className="w-10 h-10 p-1 text-white bg-black" />
          </button>

          <div
            className={`absolute z-20 right-0 mt-2 p-2 text-gray-800 bg-white border-2 border-black shadow-lg w-40 transition-all ${
              dropdownOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <ul>
              <li className="flex items-center gap-2 px-4 py-2 text-lg cursor-pointer outline outline-0 outline-black hover:outline-1">
                <TfiSettings className="text-lg" />
                Settings
              </li>
              <li className="flex items-center gap-2 px-4 py-2 text-lg cursor-pointer outline outline-0 outline-black hover:outline-1">
                <PiSignOutLight className="text-lg" />
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
