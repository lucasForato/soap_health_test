const SearchBar = () => {
  return (
    <div className="flex flex-col lg:flex-row w-10/12 lg:w-11/12 items-center h-40 justify-around">
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 lg:pr-16 w-2/3 rounded-l-md rounded-r-md lg:rounded-r-none border-l-none text-sm lg:w-2/5 focus:outline-none"
        type="search"
        name="name"
        placeholder="Name"
      />
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 lg:pr-16 w-2/3 rounded-md lg:rounded-none text-sm lg:w-2/5 focus:outline-none"
        type="tel"
        name="phone"
        placeholder="Phone Number"
      />
      <button className="border-2 border-blue-400 bg-blue-400 text-white h-10 px-5 w-2/3 rounded-r-md rounded-l-md lg:rounded-l-none text-sm lg:w-1/5 hover:bg-blue-500 hover:border-blue-500">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
