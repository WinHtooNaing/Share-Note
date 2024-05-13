import NoteForm from "../components/NoteForm";

const Create = () => {
  return (
    <section className="px-10 md:px-28 lg:px-80">
      <NoteForm isCreate={true} />
    </section>
  );
};

export default Create;
