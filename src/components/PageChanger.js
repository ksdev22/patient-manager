export default function PageChanger({ currPage, setCurrPage }) {
  return (
    <div className="bg-gray-100 flex items-center justify-center space-x-5 fixed w-full h-[10vh] border-t-2 bottom-0 left-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        onClick={() => {
          if (currPage > 1) setCurrPage((prev) => prev - 1);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <div className="text-2xl border-2 bg-white rounded-full px-2 select-none">
        {currPage}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        onClick={() => setCurrPage((prev) => prev + 1)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  );
}
