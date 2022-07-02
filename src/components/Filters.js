export default function Filters({
  filters,
  currPage,
  setCurrPage,
  setIsAddPatientCard,
  navbarRef,
  searchString,
  setSearchString,
  isColumnsCard,
  setIsColumnsCard,
  textSearch,
}) {
  return (
    <div className="bg-gray-100 border flex flex-col space-y-1 justify-center md:flex-row items-center md:justify-end px-10 h-[10vh] overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <div className="ml-5 hover:text-gray-600">
          <button
            className="underline font-bold"
            onClick={() => setIsColumnsCard(true)}
          >
            Columns
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          className="border-2 rounded-full px-2 w-3/4"
          type="text"
          placeholder="Search patient name"
          value={searchString}
          onChange={(e) => textSearch(e)}
        />
      </div>
    </div>
  );
}
