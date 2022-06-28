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
    <div className="bg-gray-100 border flex flex-col md:flex-row md:items-center py-2 px-5 space-y-5 md:space-y-0">
      <div className="flex items-center ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
        <div className="ml-5 hover:text-cyan-400">
          <button className="underline" onClick={() => setIsColumnsCard(true)}>
            Columns
          </button>
        </div>

        <div className="pl-10 flex items-center space-x-3 ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-auto"
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
            className="border-2 rounded-lg w-4/5"
            type="text"
            placeholder="Search patient name..."
            value={searchString}
            onChange={(e) => textSearch(e)}
          />
        </div>
      </div>
    </div>
  );
}
