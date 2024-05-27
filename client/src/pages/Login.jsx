import AuthForm from "../components/AuthForm";

const Login = () => {
  return (
    <>
      <section className="px-10 md:px-28 lg:px-80">
        <AuthForm isLogin={true} />
      </section>
    </>
  );
};

export default Login;
