export default function Navbar({ navbarRef, setSite }) {
  return (
    <div
      ref={navbarRef}
      className="fixed top-0 left-0 grid grid-cols-12 h-[10vh] w-full shadow-xl bg-white z-[1000]"
    >
      <div className="col-span-9 flex items-center px-10 text-xl">
        M.G. Memorial hospital
      </div>
      <div className="p-2 col-span-3 flex justify-end items-end text-sm">
        <select
          name="site"
          id="site"
          className="rounded border-2 font-sans"
          onChange={(e) => setSite(e.target.value)}
        >
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
        </select>
      </div>
    </div>
  );
}
