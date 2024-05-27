import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../contexts/UserContext";

const NoteForm = ({ isCreate }) => {
  const { token } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [previewImg, setPreviewImg] = useState(null);

  const fileRef = useRef();

  const { id } = useParams();
  const getOldNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`);
    if (response.status === 200) {
      const note = await response.json();
      setOldNote(note);
    } else {
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (!isCreate) {
      getOldNote();
    }
  }, []);

  const initialValues = {
    title: isCreate ? "" : oldNote.title,
    content: isCreate ? "" : oldNote.content,
    note_id: isCreate ? "" : oldNote._id,
    cover_image: isCreate ? null : oldNote.cover_image,
  };
  const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg"];

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required!"),
    content: Yup.string()
      .min(5, "Content is too short!")
      .required("Content is required!"),
      cover_image: Yup.mixed().when('isCreate', {
        is: true,
        then: Yup.mixed()
          .nullable()
          .test(
            "FILE_FORMAT",
            "File type is not supported!",
            (value) => !value || SUPPORTED_FORMATS.includes(value.type)
          ),

      }),
      
  });

  const handleImageChange = (e, setFieldValue) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };
  const clearSelectedImage = (setFieldValue) => {
    setPreviewImg(null);
    setFieldValue("cover_image", null);
    fileRef.current.value = "";
  };

  const submitHandler = async (values) => {
    let API;
    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create`;
    } else {
      API = `${import.meta.env.VITE_API}/edit`;
    }
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("cover_image", values.cover_image);
    formData.append("note_id", values.note_id);
    

    const response = await fetch(API, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (response.status === 201 || response.status === 200) {
      setRedirect(true);
    } else {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <section>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="Light"
      />
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
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form encType="multipart/form-data">
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
                rows="4"
                className="text-lg border-2 border-teal-600 py-1 w-full  rounded-lg"
              ></Field>
              <div className="text-red-600 font-medium font-mono">
                <ErrorMessage name="content" />
              </div>
            </div>
            <Field type="text" name="note_id" id="note_id" hidden></Field>
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <label htmlFor="cover_image" className="font-medium block">
                  Cover image <span>( Optional )</span>
                </label>
                {previewImg && (
                  <p
                    className="text-teal-600 cursor-pointer text-base"
                    onClick={() => {
                      clearSelectedImage(setFieldValue);
                    }}
                  >
                    clear
                  </p>
                )}
              </div>
              <input
                type="file"
                name="cover_image"
                id="cover_image"
                hidden
                ref={fileRef}
                onChange={(e) => {
                  handleImageChange(e, setFieldValue);
                }}
              />
              <div
                className="border border-teal-600 flex justify-center items-center text-teal-600 rounded-lg h-40 border-dashed cursor-pointer relative"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <ArrowUpTrayIcon width={30} height={30} className="z-30" />
                {isCreate ? (
                  <>
                    {previewImg && (
                      <img
                        src={previewImg}
                        alt={"preview"}
                        className="absolute w-full h-full object-cover overflow-hidden opacity-70 z-10 rounded-lg"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={
                      previewImg
                        ? previewImg
                        : `${import.meta.env.VITE_API}/${oldNote.cover_image}`
                    }
                    alt={"preview"}
                    className="absolute w-full h-full object-cover overflow-hidden opacity-70 z-10 rounded-lg"
                  />
                )}
              </div>
              <div className="text-red-600 font-medium font-mono">
                <ErrorMessage name="cover_image" />
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
