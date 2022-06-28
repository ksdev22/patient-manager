export default function PatientDetailsCard({
  isPatientDetailsCard,
  setIsPatientDetailsCard,
  currPatient,
  setCurrPatient,
  updatePatientDetails,
  deletePatient,
  setMessage,
}) {
  return (
    <div
      className={`z-[101] fixed top-0 left-0 h-screen w-screen flex justify-center items-center ${
        isPatientDetailsCard ? "" : "invisible"
      }`}
    >
      <div
        className={`absolute top-0 left-0 h-screen w-screen opacity-75 bg-white z-[99] ${
          isPatientDetailsCard ? "" : "invisible"
        }`}
      ></div>

      <div
        className={`z-[100] w-[75vw] bg-gray-100 rounded-2xl max-h-0 overflow-hidden p-0 ${
          isPatientDetailsCard ? "py-10 max-h-screen" : ""
        } relative transition-[max-height] duration-300`}
      >
        <div className="text-center text-xl pb-2 font-mono">
          Patient Details
        </div>
        <div
          className="absolute top-5 right-5 p-1 font-extrabold cursor-pointer select-none"
          onClick={() => {
            setIsPatientDetailsCard(false);
          }}
        >
          X
        </div>

        <div className="relative max-h-[60vh] overflow-y-scroll px-10">
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-rows-2">
              <label htmlFor="name">Name</label>
              <input
                className="px-2"
                type="text"
                name="name"
                id="name"
                placeholder="Ex. John Doe"
                value={currPatient.name}
                onChange={(e) =>
                  setCurrPatient((prev) => {
                    return { ...prev, name: e.target.value };
                  })
                }
              />
            </div>
            <div className="grid grid-rows-2">
              <label htmlFor="age">Age</label>
              <input
                className="px-2"
                type="number"
                name="age"
                id="age"
                min={1}
                value={currPatient.age}
                onChange={(e) =>
                  setCurrPatient((prev) => {
                    return { ...prev, age: e.target.value };
                  })
                }
              />
            </div>
            <div className="grid grid-rows-2">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                value={currPatient.gender}
                onChange={(e) =>
                  setCurrPatient((prev) => {
                    return { ...prev, gender: e.target.value };
                  })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="grid grid-rows-2">
              <label htmlFor="phone">Phone</label>
              <input
                className="px-2"
                type="text"
                name="phone"
                id="phone"
                value={currPatient.phone}
                onChange={(e) =>
                  setCurrPatient((prev) => {
                    return { ...prev, phone: e.target.value };
                  })
                }
              />
            </div>
            <div className="grid grid-rows-2">
              <label htmlFor="vaccination-status">Vaccination Status</label>
              <select
                name="vaccination-status"
                id="vaccination-status"
                value={currPatient.vaccinationStatus}
                onChange={(e) =>
                  setCurrPatient((prev) => {
                    return { ...prev, vaccinationStatus: e.target.value };
                  })
                }
              >
                <option value="Fully Vaccinated">Fully Vaccinated</option>
                <option value="Partially Vaccinated">
                  Partially Vaccinated
                </option>
                <option value="Not Vaccinated">Not Vaccinated</option>
              </select>
            </div>
            <div className="grid grid-rows-2">
              <label htmlFor="vaccine-name">Vaccine Name</label>
              <select
                name="vaccine-name"
                id="vaccine-name"
                value={currPatient.vaccineName}
                onChange={(e) =>
                  setCurrPatient((prev) => {
                    return { ...prev, vaccineName: e.target.value };
                  })
                }
              >
                <option value="Not Vaccinated">Not Vaccinated</option>
                <option value="Covaxin">Covaxin</option>

                <option value="Covishield">Covishield</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="symptoms">Symptoms</label>
              <textarea
                name="symptoms"
                id="symptoms"
                rows="5"
                className="p-2"
                value={currPatient.symptoms}
                onChange={(e) =>
                  setCurrPatient((prev) => {
                    return { ...prev, symptoms: e.target.value };
                  })
                }
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="medical-history">Medical History</label>
              <textarea
                name="medical-history"
                id="medical-history"
                rows="5"
                className="p-2"
                value={currPatient.medicalHistory}
                onChange={(e) =>
                  setCurrPatient((prev) => {
                    return { ...prev, medicalHistory: e.target.value };
                  })
                }
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-red-600 hover:bg-red-800 text-white px-5 rounded"
                onClick={() => {
                  deletePatient(currPatient.id);
                  setMessage({
                    type: "deleted",
                    content: "Patient record deleted!",
                  });
                  setTimeout(() => {
                    setMessage({ type: null, content: null });
                  }, 4000);
                }}
              >
                Delete
              </button>
            </div>
            <div className="sticky bottom-0 left-0 w-full h-16 bg-slate-200 flex justify-around items-center">
              <button
                className="font-bold bg-white hover:bg-slate-600 hover:text-white p-1 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrPatient({
                    name: "",
                    age: "",
                    gender: "Male",
                    phone: "",
                    vaccinationStatus: "Fully Vaccinated",
                    vaccineName: "Covaxin",
                    symptoms: "",
                    medicalHistory: "",
                  });
                  setIsPatientDetailsCard(false);
                }}
              >
                Cancel
              </button>
              <button
                className="font-bold bg-slate-600 hover:bg-white hover:text-black text-white p-1 px-5 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  updatePatientDetails(currPatient);
                  setIsPatientDetailsCard(false);
                  setMessage({
                    type: "updated",
                    content: "Patient record updated!",
                  });
                  setTimeout(() => {
                    setMessage({ type: null, content: null });
                  }, 4000);
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
