export default function PatientList({
  patients,
  filters,
  setFilters,
  isPatientDetailsCard,
  setIsPatientDetailsCard,
  currPatient,
  setCurrPatient,
  currPage,
  setCurrPage,
  site,
  customSort,
  patientListScroll,
}) {
  return (
    <div>
      <ul
        className="relative scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-scroll h-[70vh] pb-5"
        // onMouseOver={(e) => patientListScroll()}
        onMouseOver={(e) => patientListScroll()}
      >
        <div className="bg-white z-[95] grid grid-flow-col font-bold px-5 border-b-2 border-black select-none min-w-max sticky top-0 left-0">
          {filters.columns.map((column) => {
            if (column.checked) {
              return (
                <div
                  key={column.name}
                  className="w-40 border-l-2 pl-3 h-[10vh] text-center flex items-center justify-center space-x-5"
                >
                  <div>
                    {column.name === "name" && "Name"}
                    {column.name === "age" && "Age"}
                    {column.name === "gender" && "Gender"}
                    {column.name === "phone" && "Phone"}
                    {column.name === "vaccinationStatus" &&
                      "Vaccination Status"}
                    {column.name === "vaccineName" && "Vaccine Name"}
                    {column.name === "symptoms" && "Symptoms"}
                    {column.name === "medicalHistory" && "Medical History"}
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      customSort(column.name, column.sortType);
                      setFilters((prev) => {
                        const newColumns = filters.columns.map((c) => {
                          if (c.name === column.name) {
                            if (column.sortType === "asc") {
                              c.sortType = "dsc";
                            } else {
                              c.sortType = "asc";
                            }
                          }
                          return c;
                        });
                        return { ...prev, columns: newColumns };
                      });
                    }}
                  >
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
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>

        {patients.map((patient) => (
          <li
            key={patient.id}
            className="hover:text-cyan-700 translate-x-0 px-5 border-b-2 cursor-pointer grid grid-flow-col min-w-max"
            onClick={() => {
              setIsPatientDetailsCard(true);
              setCurrPatient({ ...patient, site: site });
            }}
          >
            {filters.columns.map((column) => {
              if (column.checked) {
                return (
                  <div
                    key={column.name + patient[column.name]}
                    className="w-40 border-l-2 px-3 flex items-center break-all"
                  >
                    {patient[column.name].length > 20
                      ? patient[column.name].substring(0, 20) + "..."
                      : patient[column.name]}
                  </div>
                );
              } else {
                return null;
              }
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}
