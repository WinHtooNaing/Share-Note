import NoteForm from "../components/NoteForm";
const Edit = () => {
  return (
    <section className="px-10 md:px-28 lg:px-80">
      <NoteForm isCreate={false} />
    </section>
  );
};

export default Edit;
