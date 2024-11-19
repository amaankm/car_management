import { TfiPlus, TfiViewGrid, TfiViewListAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Filter = ({
  view,
  setView,
  search,
  setSearch,
}: {
  view: "grid" | "list";
  setView: React.Dispatch<React.SetStateAction<"grid" | "list">>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex justify-between w-full h-12 gap-2">
      <Link
        to="/cars/new"
        className="flex items-center gap-2 px-5 py-2 text-white bg-black"
      >
        <TfiPlus className="w-full h-full" />
        <span className="w-full text-lg font-bold text-nowrap">Add New</span>
      </Link>
      <div className="flex justify-end gap-5">
        <div className="flex border-2 border-black overflow-hidden w-full max-w-md mx-auto font-[sans-serif]">
          <input
            type="text"
            placeholder="Search Something..."
            value={search}
            className="w-full px-4 py-3 text-sm bg-white outline-none text-neutral-800"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="flex items-center justify-center px-5 bg-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-white"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </button>
        </div>
        <div className="relative flex items-center w-full gap-4 p-2 border border-black max-w-24">
          <div
            className={`z-10 w-full p-1 cursor-pointer aspect-square ${
              view == "grid" ? "text-white" : "text-black"
            }`}
            onClick={() => setView("grid")}
          >
            <TfiViewGrid className="w-full h-full" />
          </div>
          <div
            className={`z-10 w-full p-1 cursor-pointer aspect-square ${
              view == "list" ? "text-white" : "text-black"
            }`}
            onClick={() => setView("list")}
          >
            <TfiViewListAlt className="w-full h-full" />
          </div>
          <div
            className={`absolute z-0 h-[80%] bg-black aspect-square transition-all ${
              view == "grid" ? "-translate-x-1" : "translate-x-11"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
