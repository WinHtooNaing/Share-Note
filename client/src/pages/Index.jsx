import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";
import { Watch } from "react-loader-spinner";
const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getNotes = async (pageNo) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API}/notes?page=${pageNo}`
    );
    const { notes, totalNotes, totalPages } = await response.json();
    setTotalPages(totalPages);
    setNotes(notes);
    setLoading(false);
  };

  useEffect(() => {
    getNotes(currentPage);
  }, [currentPage]);
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <section className="flex gap-6 px-10 mt-10 flex-wrap">
        {!loading && notes.length > 0 ? (
          <>
            {notes.map((note) => (
              <Note key={note._id} note={note} getNotes={getNotes} />
            ))}
            <div className="w-full flex items-center justify-center gap-3">
              {currentPage > 1 && (
                <button
                  type="button"
                  className="text-white font-medium 
              bg-teal-600 px-3 py-1"
                  onClick={handlePrev}
                >
                  Prev Page
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  type="button"
                  className="text-white font-medium 
              bg-teal-600 px-3 py-1"
                  onClick={handleNext}
                >
                  Next Page
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full mt-40">
            <Watch
              height="50"
              width="50"
              radius="48"
              color="teal"
              ariaLabel="watch-loading"
              visible={loading}
            />
          </div>
        )}
        <Plus />
      </section>
    </>
  );
};

export default Index;
