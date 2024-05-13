import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NoteForm = ({ isCreate }) => {
  const initialValues = {
    title: "",
    content: "",
  };
  // const validate = (values) => {
  //   const errors = {};
  //   if (values.title.trim().length < 10) {
  //     errors.title = "Title must be at least 10 characters";
  //   }
  //   if (values.content.trim().length < 1) {
  //     errors.content = "Content must be required";
  //   }
  //   if (values.title.trim().length == 0) {
  //     errors.title = "Title must be required";
  //   }
  //   return errors;
  // };
  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required!"),
    content: Yup.string()
      .min(5, "Content is too short!")
      .required("Content is required!"),
  });
  const submitHandler = (values) => {
    console.log(values);
  };
  return (
    <section>
      <div className="flex items-center justify-between  ">
        <h1 className="text-2xl font-bold my-5 ">
          {isCreate ? "Create a new note" : "Edit your note"}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={22} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        // validate={validate}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title" className="font-medium block">
                Note Title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="text-lg border-2 border-teal-600 py-1 w-full  rounded-lg"
              />
              <div className="text-red-600 font-medium font-mono">
                <ErrorMessage name="title" />
              </div>
            </div>
            <div>
              <label htmlFor="content" className="font-medium block">
                Note Content
              </label>
              <Field
                as="textarea"
                name="content"
                id="content"
                rows="5"
                className="text-lg border-2 border-teal-600 py-1 w-full  rounded-lg"
              ></Field>
              <div className="text-red-600 font-medium font-mono">
                <ErrorMessage name="content" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-teal-600 text-white py-3 font-medium w-full  rounded-md mt-2"
            >
              {isCreate ? "Save" : "Update"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
