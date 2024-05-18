import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <nav className="bg-slate-50 px-10 py-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-teal-600 font-bold text-4xl">ShareNote.io</h1>
        </Link>
        <div className="flex gap-3 justify-center items-center">
          <Link
            to={"/create"}
            className="text-teal-600 text-xl font-semibold hover:text-teal-700 font-mono  sm:hidden"
          >
            Share
          </Link>
          <Link
            to={"/login"}
            className="text-teal-600 text-xl font-semibold hover:text-teal-700 font-mono"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="text-teal-600 text-xl font-semibold hover:text-teal-700 font-mono max-sm:hidden"
          >
            Register
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;
