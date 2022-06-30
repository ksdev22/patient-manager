export default function Backdrop({ isPatientDetailsCard, isAddPatientCard }) {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen opacity-75 bg-white z-[1003] ${
        isPatientDetailsCard || isAddPatientCard ? "" : "invisible"
      }`}
    ></div>
  );
}
