/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
// import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import PatientList from "./PatientList";
import AddPatientCard from "./AddPatientCard";
import PatientDetailsCard from "./PatientDetailsCard";
import Message from "./Message";
import Filters from "./Filters";
import ColumnsCard from "./ColumnsCard";
import PageChanger from "./PageChanger";

export default function App() {
  const [currPage, setCurrPage] = useState(1);
  const [patients, setPatients] = useState([]);
  const navbarRef = useRef();
  const [isNavbar, setIsNavbar] = useState(false);
  const isMounted = useRef(true);
  const [site, setSite] = useState("Mumbai"); // Mumbai && Bangalore
  const [isLoading, setIsLoading] = useState(true);
  const [isAddPatientCard, setIsAddPatientCard] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    vaccinationStatus: "Fully Vaccinated",
    vaccineName: "Covaxin",
    symptoms: "",
    medicalHistory: "",
  });
  const [currPatient, setCurrPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    vaccinationStatus: "Fully Vaccinated",
    vaccineName: "Covaxin",
    symptoms: "",
    medicalHistory: "",
  });
  const [isPatientDetailsCard, setIsPatientDetailsCard] = useState(false);
  const [filters, setFilters] = useState({
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
  });
  const [message, setMessage] = useState({ type: null, content: null });
  const [searchString, setSearchString] = useState("");
  const [isColumnsCard, setIsColumnsCard] = useState(false);
  const textSearchIntervalId = useRef();

  useEffect(() => {
    if (navbarRef.current) setIsNavbar(true);
  }, [navbarRef.current]);

  const getPatients = async () => {
    const response = await axios.get(
      `https://patient-manager-json-server.herokuapp.com/api/patients?_page=${currPage}&_limit=20&site=${site}&_sort=name`
    );
    if (response.status === 200) {
      if (isMounted.current) {
        // if (response.data.length > 0) {
        setPatients(response.data);
        // } else {
        // setCurrPage((prev) => prev - 1);
        // setPatients([]);
        // }
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    isMounted.current = true;
    setIsLoading(true);
    getPatients();
    return () => {
      isMounted.current = false;
    };
  }, [site, currPage]);

  const submitAddPatient = async (newPatientData) => {
    setIsLoading(true);
    const response = await axios.post(
      "https://patient-manager-json-server.herokuapp.com/api/patients",
      {
        ...newPatientData,
        site: site,
      }
    );
    if (response.status === 201) {
      getPatients();
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
    } else {
      alert("Error");
      console.log(response);
    }
  };

  const updatePatientDetails = async (patientDetails) => {
    setIsLoading(true);
    const response = await axios.put(
      `https://patient-manager-json-server.herokuapp.com/api/patients/${patientDetails.id}`,
      {
        ...patientDetails,
        site: site,
      }
    );
    if (response.status === 200) {
      getPatients();
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
    } else {
      console.log(response);
      alert("Error");
    }
  };

  const deletePatient = async (patientId) => {
    setIsLoading(true);
    const response = await axios.delete(
      `https://patient-manager-json-server.herokuapp.com/api/patients/${patientId}`
    );
    if (response.status === 200) {
      getPatients();
      setIsPatientDetailsCard(false);
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
    } else {
      console.log(response);
      alert("Error");
    }
  };

  // const filteredPatients = patients.filter((p) =>
  //   p.name.toLowerCase().includes(searchString.toLowerCase())
  // );

  const textSearch = async (e) => {
    setSearchString(e.target.value);
    clearInterval(textSearchIntervalId.current);
    if (e.target.value === "") {
      getPatients();
    } else {
      setIsLoading(true);
      textSearchIntervalId.current = setTimeout(() => {
        axios
          .get(
            `https://patient-manager-json-server.herokuapp.com/api/patients?site=${site}&name_like=${e.target.value}`
          )
          .then((response) => {
            if (response.status === 200) {
              setPatients(response.data);
              setIsLoading(false);
            }
          });
      }, 500);
    }
  };

  return (
    <div>
      {/* <Helmet>
        <title>M.G. Memorial hospital</title>
      </Helmet> */}

      <Navbar navbarRef={navbarRef} setSite={setSite} />

      <Message message={message} />

      {isNavbar && (
        <div
          style={{
            marginTop: navbarRef.current.clientHeight,
          }}
        ></div>
      )}
      <div className="flex items-center justify-end px-10 h-[10vh]">
        <button
          className="text-sm p-2 px-4 rounded text-white bg-gray-500 hover:bg-gray-600"
          onClick={() => setIsAddPatientCard(true)}
        >
          Add Patient
        </button>
      </div>
      <div className="h-[90vh]">
        <Filters
          navbarRef={navbarRef}
          filters={filters}
          currPage={currPage}
          setCurrPage={setCurrPage}
          setIsAddPatientCard={setIsAddPatientCard}
          searchString={searchString}
          isColumnsCard={isColumnsCard}
          setIsColumnsCard={setIsColumnsCard}
          textSearch={textSearch}
        />
        <ColumnsCard
          isColumnsCard={isColumnsCard}
          setIsColumnsCard={setIsColumnsCard}
          filters={filters}
          setFilters={setFilters}
        />

        {!isLoading ? (
          <div
            // style={{
            //   marginTop: navbarRef.current.clientHeight,
            //   paddingTop: "25px",
            // }}
            className="relative"
          >
            <AddPatientCard
              isAddPatientCard={isAddPatientCard}
              setIsAddPatientCard={setIsAddPatientCard}
              newPatient={newPatient}
              setNewPatient={setNewPatient}
              site={site}
              submitAddPatient={submitAddPatient}
              setMessage={setMessage}
            />

            <PatientDetailsCard
              isPatientDetailsCard={isPatientDetailsCard}
              setIsPatientDetailsCard={setIsPatientDetailsCard}
              currPatient={currPatient}
              setCurrPatient={setCurrPatient}
              updatePatientDetails={updatePatientDetails}
              deletePatient={deletePatient}
              setMessage={setMessage}
            />

            <PatientList
              currPage={currPage}
              setCurrPage={setCurrPage}
              patients={patients}
              filters={filters}
              isPatientDetailsCard={isPatientDetailsCard}
              setIsPatientDetailsCard={setIsPatientDetailsCard}
              currPatient={currPatient}
              setCurrPatient={setCurrPatient}
              site={site}
            />
          </div>
        ) : (
          <div className="text-3xl h-[70vh] w-screen flex items-center justify-center">
            Loading...
          </div>
        )}
      </div>
      <PageChanger currPage={currPage} setCurrPage={setCurrPage} />
    </div>
  );
}
