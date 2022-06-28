export default function PatientList({
  patients,
  filters,
  isPatientDetailsCard,
  setIsPatientDetailsCard,
  currPatient,
  setCurrPatient,
  currPage,
  setCurrPage,
  site,
}) {
  return (
    <div>
      <ul className="scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full py-3 pb-10 mb-5 overflow-scroll h-[55vh]">
        <li className="grid grid-flow-col font-bold px-5 border-b-2 border-black select-none min-w-max">
          {filters.columns.map((column) => {
            if (column.checked) {
              return (
                <div
                  key={column.name}
                  className="w-40 border-l-2 px-3 text-center"
                >
                  {column.name === "name" && "Name"}
                  {column.name === "age" && "Age"}
                  {column.name === "gender" && "Gender"}
                  {column.name === "phone" && "Phone"}
                  {column.name === "vaccinationStatus" && "Vaccination Status"}
                  {column.name === "vaccineName" && "Vaccine Name"}
                  {column.name === "symptoms" && "Symptoms"}
                  {column.name === "medicalHistory" && "Medical History"}
                </div>
              );
            } else {
              return null;
            }
          })}
        </li>
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
