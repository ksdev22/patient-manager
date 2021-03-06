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
    vaccinationStatus: "Not Vaccinated",
    vaccineName: "Not Vaccinated",
    symptoms: "",
    medicalHistory: "",
  });
  const [currPatient, setCurrPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    vaccinationStatus: "Not Vaccinated",
    vaccineName: "Not Vaccinated",
    symptoms: "",
    medicalHistory: "",
  });
  const [isPatientDetailsCard, setIsPatientDetailsCard] = useState(false);
  const [filters, setFilters] = useState({
    columns: [
      { name: "name", checked: true, sortType: "asc" },
      { name: "age", checked: true, sortType: "asc" },
      { name: "gender", checked: true, sortType: "asc" },
      { name: "phone", checked: false, sortType: "asc" },
      { name: "vaccinationStatus", checked: false, sortType: "asc" },
      { name: "vaccineName", checked: false, sortType: "asc" },
      { name: "symptoms", checked: false, sortType: "asc" },
      { name: "medicalHistory", checked: false, sortType: "asc" },
    ],
  });
  const [message, setMessage] = useState({ type: null, content: null });
  const [searchString, setSearchString] = useState("");
  const [isColumnsCard, setIsColumnsCard] = useState(false);
  const textSearchIntervalId = useRef();
  const addPatientButtonRef = useRef();

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
    const { name, vaccinationStatus, vaccineName } = newPatientData;
    if (
      name === "" ||
      (vaccinationStatus === "Not Vaccinated" &&
        vaccineName !== "Not Vaccinated") ||
      (vaccinationStatus !== "Not Vaccinated" &&
        vaccineName === "Not Vaccinated")
    ) {
      alert("Invalid details!");
    } else {
      const response = await axios.post(
        "https://patient-manager-json-server.herokuapp.com/api/patients",
        {
          ...newPatientData,
          site: site,
        }
      );
      if (response.status === 201) {
        setIsLoading(true);
        setIsAddPatientCard(false);
        setMessage({
          type: "created",
          content: "Patient record created!",
        });
        setTimeout(() => {
          setMessage({ type: null, content: null });
        }, 2000);
        getPatients();
        setNewPatient({
          name: "",
          age: "",
          gender: "Male",
          phone: "",
          vaccinationStatus: "Not Vaccinated",
          vaccineName: "Not Vaccinated",
          symptoms: "",
          medicalHistory: "",
        });
      } else {
        alert("Error");
        console.log(response);
      }
    }
  };

  const updatePatientDetails = async (patientDetails) => {
    const { name, vaccinationStatus, vaccineName } = patientDetails;
    if (
      name === "" ||
      (vaccinationStatus === "Not Vaccinated" &&
        vaccineName !== "Not Vaccinated") ||
      (vaccinationStatus !== "Not Vaccinated" &&
        vaccineName === "Not Vaccinated")
    ) {
      alert("Invalid details!");
    } else {
      setIsLoading(true);
      const response = await axios.put(
        `https://patient-manager-json-server.herokuapp.com/api/patients/${patientDetails.id}`,
        {
          ...patientDetails,
          site: site,
        }
      );
      if (response.status === 200) {
        setIsPatientDetailsCard(false);
        setMessage({
          type: "updated",
          content: "Patient record updated!",
        });
        setTimeout(() => {
          setMessage({ type: null, content: null });
        }, 4000);
        getPatients();
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
      } else {
        console.log(response);
        alert("Error");
      }
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
        vaccinationStatus: "Not Vaccinated",
        vaccineName: "Not Vaccinated",
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

  const customSort = (column, sortType) => {
    setIsLoading(true);
    setPatients((prev) => {
      prev.sort((a, b) => {
        if (sortType === "asc") {
          if (a[column] <= b[column]) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a[column] <= b[column]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      const newPrev = [...prev];
      setIsLoading(false);
      return newPrev;
    });
  };

  const patientListScroll = () => {
    addPatientButtonRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="snap-y snap-mandatory max-w-[100vw]">
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
      <div className="snap-start flex items-center justify-end px-10 h-[10vh]">
        <button
          ref={addPatientButtonRef}
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
              setFilters={setFilters}
              isPatientDetailsCard={isPatientDetailsCard}
              setIsPatientDetailsCard={setIsPatientDetailsCard}
              currPatient={currPatient}
              setCurrPatient={setCurrPatient}
              site={site}
              customSort={customSort}
              patientListScroll={patientListScroll}
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
