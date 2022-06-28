export default function Message({ message }) {
  return (
    <div className="w-screen fixed top-0 left-0 z-[1000]">
      {message.content &&
        (message.type === "created" ? (
          <div className="bg-green-600 text-white pl-20 py-5 text-xl">
            Patiend record created!
          </div>
        ) : message.type === "updated" ? (
          <div className="bg-yellow-600 text-white pl-20 py-5 text-xl">
            Patient record updated!
          </div>
        ) : (
          message.type === "deleted" && (
            <div className="bg-red-600 text-white pl-20 py-5 text-xl">
              Patiend record deleted!
            </div>
          )
        ))}
    </div>
  );
}
