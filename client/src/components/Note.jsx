import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

import formatISO9075 from "date-fns/formatISO9075";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Note = ({ note, getNotes }) => {
  const { _id, title, content, createdAt } = note;

  const deleteNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/delete/${_id}`, {
      method: "DELETE",
    });
    if (response.status === 204) {
      getNotes();
      toast.success("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
      });
    }
  };
  return (
    <div className="w-full sm:w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3 ">
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </div>
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-sm">{content.slice(0, 100)}...</p>
      <div className="flex items-center justify-between mt-2 border-t p-t-2">
        <p className="text-sm font-medium">
          {formatISO9075(new Date(createdAt), { representation: "date" })}
        </p>
        <div className="flex items-center justify-end gap-2 pt-3">
          <TrashIcon
            width={20}
            className="text-red-600 cursor-pointer"
            onClick={deleteNote}
          />
          <Link to={`/edit/${_id}`}>
            <PencilSquareIcon width={20} className="text-teal-600" />
          </Link>
          <Link to={`/notes/${_id}`}>
            <EyeIcon width={20} className="text-gray-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
