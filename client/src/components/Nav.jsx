import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <nav className="bg-slate-50 px-10 py-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-teal-600 font-bold text-4xl">ShareNote.io</h1>
        </Link>
        <Link
          to={"/create"}
          className="text-teal-600 text-2xl font-semibold hover:text-teal-700 font-mono  sm:hidden"
        >
          SHARE
        </Link>
      </nav>
    </>
  );
};

export default Nav;
