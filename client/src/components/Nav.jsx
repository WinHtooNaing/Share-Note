import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <nav className="bg-slate-50 px-10 py-4">
        <Link to="/">
          <h1 className="text-teal-600 font-bold text-4xl">ShareNote.io</h1>
        </Link>
      </nav>
    </>
  );
};

export default Nav;
