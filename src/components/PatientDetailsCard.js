import Backdrop from "./Backdrop";

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
      className={`z-[1004] fixed top-0 left-0 h-screen w-screen flex justify-center items-center ${
        isPatientDetailsCard ? "" : "invisible"
      }`}
    >
      <Backdrop isPatientDetailsCard={isPatientDetailsCard} />

      <div
        className={`z-[1005] border border-black shadow-2xl w-[95vw] md:w-[75vw] bg-gray-100 rounded-2xl max-h-0 overflow-hidden p-0 ${
          isPatientDetailsCard ? "max-h-screen h-[80vh]" : ""
        } relative transition-[max-height] duration-300`}
      >
        <div className="text-center h-[15%] flex items-end justify-center text-2xl box-border border-b-2 pb-2 font-bold">
          {" "}
          Patient Details
        </div>
        <div
          className="absolute top-5 box-border border-gray-300 flex items-center justify-center h-8 w-8 border-2 rounded-full right-5 p-1 font-extrabold cursor-pointer select-none"
          onClick={() => {
            setIsPatientDetailsCard(false);
          }}
        >
          X
        </div>

        <div className="relative h-[85%]">
          <form
            className="space-y-3 px-10 py-3 h-[85%] scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-scroll"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-rows-2">
              <label className="font-bold mb-1" htmlFor="name">
                Name
              </label>
              <input
                required
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="age">
                Age
              </label>
              <input
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="vaccination-status">
                Vaccination Status
              </label>
              <select
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="vaccine-name">
                Vaccine Name
              </label>
              <select
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="symptoms">
                Symptoms
              </label>
              <textarea
                name="symptoms"
                id="symptoms"
                rows="5"
                className="p-2 rounded-2xl"
                value={currPatient.symptoms}
                onChange={(e) =>
                  setCurrPatient((prev) => {
                    return { ...prev, symptoms: e.target.value };
                  })
                }
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="font-bold mb-1" htmlFor="medical-history">
                Medical History
              </label>
              <textarea
                name="medical-history"
                id="medical-history"
                rows="5"
                className="p-2 rounded-2xl"
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
          </form>
          <div className="sticky bottom-0 left-0 w-full h-[15%] bg-slate-200 flex justify-around items-center">
            <button
              className="font-bold bg-white hover:bg-slate-600 hover:text-white p-1 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                setCurrPatient({
                  name: "",
                  age: "",
                  gender: "Male",
                  phone: "",
                  vaccinationStatus: "Not Vaccinated",
                  vaccineName: "Not Vaccinated",
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
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
