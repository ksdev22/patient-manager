import Backdrop from "./Backdrop";

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
      className={`z-[1004] fixed top-0 left-0 h-screen w-screen flex justify-center items-center ${
        isAddPatientCard ? "" : "invisible"
      }`}
    >
      <Backdrop isAddPatientCard={isAddPatientCard} />
      <div
        className={`z-[1005] border border-black shadow-2xl w-[95vw] md:w-[75vw] bg-gray-100 rounded-2xl max-h-0 overflow-hidden p-0 ${
          isAddPatientCard ? "max-h-screen h-[80vh]" : ""
        } relative transition-[max-height] duration-300`}
      >
        <div className="text-center h-[15%] flex items-end justify-center text-2xl box-border border-b-2 pb-2 font-bold">
          Add Patient
        </div>
        <div
          className="absolute top-5 box-border border-gray-300 flex items-center justify-center h-8 w-8 border-2 rounded-full right-5 p-1 font-extrabold cursor-pointer select-none"
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
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="age">
                Age
              </label>
              <input
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="vaccination-status">
                Vaccination Status
              </label>
              <select
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="vaccine-name">
                Vaccine Name
              </label>
              <select
                className="px-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="symptoms">
                Symptoms
              </label>
              <textarea
                name="symptoms"
                id="symptoms"
                className="p-2 rounded-2xl"
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
              <label className="font-bold mb-1" htmlFor="medical-history">
                Medical History
              </label>
              <textarea
                name="medical-history"
                id="medical-history"
                className="p-2 rounded-2xl"
                rows="5"
                value={newPatient.medicalHistory}
                onChange={(e) =>
                  setNewPatient((prev) => {
                    return { ...prev, medicalHistory: e.target.value };
                  })
                }
              ></textarea>
            </div>
          </form>
          <div className="sticky bottom-0 left-0 w-full h-[15%] bg-slate-200 flex justify-around items-center">
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
        </div>
      </div>
    </div>
  );
}
