export default function ColumnsCard({
  isColumnsCard,
  setIsColumnsCard,
  filters,
  setFilters,
}) {
  return (
    <div
      className={`z-[1001] fixed top-0 left-0 h-screen w-screen flex justify-center items-center ${
        isColumnsCard ? "" : "invisible"
      }`}
    >
      <div
        className={`absolute top-0 left-0 h-screen w-screen opacity-90 bg-white z-[99] ${
          isColumnsCard ? "" : "invisible"
        }`}
      ></div>

      <div
        className={`z-[100] w-[75vw] bg-gray-100 rounded-2xl max-h-0 overflow-hidden p-0 ${
          isColumnsCard ? "py-10 max-h-screen" : ""
        } relative transition-[max-height] duration-300`}
      >
        <div
          className="absolute top-5 right-5 p-1 font-extrabold cursor-pointer select-none"
          onClick={() => {
            setIsColumnsCard(false);
          }}
        >
          X
        </div>
        <div className="text-center text-xl font-bold px-10">
          Select columns to display
        </div>
        <div className="text-xl px-10 md:w-1/2 py-5 mx-auto">
          {filters.columns.map((column) => (
            <div
              key={column.name}
              className="flex items-center justify-between"
            >
              <div>
                {column.name === "name" && "Name"}
                {column.name === "age" && "Age"}
                {column.name === "gender" && "Gender"}
                {column.name === "phone" && "Phone"}
                {column.name === "vaccinationStatus" && "Vaccination Status"}
                {column.name === "vaccineName" && "Vaccine Name"}
                {column.name === "symptoms" && "Symptoms"}
                {column.name === "medicalHistory" && "Medical History"}
              </div>
              <input
                className="w-5 h-5"
                type="checkbox"
                checked={column.checked}
                onChange={(e) =>
                  setFilters((prev) => {
                    const newCols = prev.columns.map((p) => {
                      return {
                        name: p.name,
                        checked:
                          p.name === column.name ? !p.checked : p.checked,
                      };
                    });
                    return { ...filters, columns: newCols };
                  })
                }
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-evenly">
          <button
            className="px-5 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
            onClick={() =>
              setFilters((prev) => {
                return {
                  ...filters,
                  columns: [
                    { name: "name", checked: true },
                    { name: "age", checked: true },
                    { name: "gender", checked: true },
                    { name: "phone", checked: false },
                    { name: "vaccinationStatus", checked: false },
                    { name: "vaccineName", checked: false },
                    { name: "symptoms", checked: false },
                    { name: "medicalHistory", checked: false },
                  ],
                };
              })
            }
          >
            Reset
          </button>
          <button
            className="bg-blue-500 px-5 hover:bg-blue-700 text-white rounded"
            onClick={() => setIsColumnsCard(false)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
