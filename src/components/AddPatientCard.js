export default function AddPatientCard({
  isAddPatientCard,
  setIsAddPatientCard,
  newPatient,
  setNewPatient,
  submitAddPatient,
  setMessage,
}) {
  return (
    <div
      className={`z-[1001] fixed top-0 left-0 h-screen w-screen flex justify-center items-center ${
        isAddPatientCard ? "" : "invisible"
      }`}
    >
      <div
        className={`absolute top-0 left-0 h-screen w-screen opacity-75 bg-white z-[99] ${
          isAddPatientCard ? "" : "invisible"
        }`}
      ></div>
      <div
        className={`z-[100] w-[75vw] bg-gray-100 rounded-2xl max-h-0 overflow-hidden p-0 ${
          isAddPatientCard ? "py-10 max-h-screen" : ""
        } relative transition-[max-height] duration-300`}
      >
        <div className="text-center text-3xl border-b-2 pb-2 font-mono">
          Add Patient
        </div>
        <div
          className="absolute top-5 right-5 p-1 font-extrabold cursor-pointer select-none"
          onClick={() => {
            setIsAddPatientCard(false);
            setNewPatient({
              name: "",
              age: "",
              gender: "Male",
              phone: "",
              vaccinationStatus: "Fully Vaccinated",
              vaccineName: "Covaxin",
              symptoms: "",
              medicalHistory: "",
            });
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
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient((prev) => {
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
                value={newPatient.age}
                onChange={(e) =>
                  setNewPatient((prev) => {
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
                value={newPatient.gender}
                onChange={(e) =>
                  setNewPatient((prev) => {
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
                value={newPatient.phone}
                onChange={(e) =>
                  setNewPatient((prev) => {
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
                value={newPatient.vaccinationStatus}
                onChange={(e) =>
                  setNewPatient((prev) => {
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
                value={newPatient.vaccineName}
                onChange={(e) =>
                  setNewPatient((prev) => {
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
                className="p-2"
                rows="5"
                value={newPatient.symptoms}
                onChange={(e) =>
                  setNewPatient((prev) => {
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
                className="p-2"
                rows="5"
                value={newPatient.medicalHistory}
                onChange={(e) =>
                  setNewPatient((prev) => {
                    return { ...prev, medicalHistory: e.target.value };
                  })
                }
              ></textarea>
            </div>
            <div className="sticky bottom-0 left-0 w-full h-16 bg-slate-200 flex justify-around items-center">
              <button
                className="font-bold hover:bg-slate-600 bg-white text-black hover:text-white p-1 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setNewPatient({
                    name: "",
                    age: "",
                    gender: "Male",
                    phone: "",
                    vaccinationStatus: "Fully Vaccinated",
                    vaccineName: "Covaxin",
                    symptoms: "",
                    medicalHistory: "",
                  });
                }}
              >
                Reset
              </button>
              <button
                className="font-bold bg-slate-600 hover:bg-white hover:text-black text-white p-1 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  submitAddPatient(newPatient);
                  setIsAddPatientCard(false);
                  setMessage({
                    type: "created",
                    content: "Patient record created!",
                  });
                  setTimeout(() => {
                    setMessage({ type: null, content: null });
                  }, 2000);
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
