import AuthForm from "../components/AuthForm";

const Register = () => {
  return (
    <>
      <section className="px-10 md:px-28 lg:px-80">
        <AuthForm isLogin={false} />
      </section>
    </>
  );
};

export default Register;
