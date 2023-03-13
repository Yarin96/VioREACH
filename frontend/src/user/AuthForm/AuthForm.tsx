import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import "./AuthForm.css";
import { useContext, useState, useEffect } from "react";
import Loader from "../../shared/components/UIElements/Loader/Loader";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";

const Auth = () => {
  const [error, setError] = useState(undefined);
  const data: any = useActionData();

  useEffect(() => {
    setError(data);
  }, [data]);

  const navigation: any = useNavigation();
  const [searchParams] = useSearchParams();
  const authContext = useContext(AuthContext);

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const clearErrorHandler = () => {
    setError(undefined);
  };

  return (
    <div className="container">
      {error && <ErrorModal error={error} onClear={clearErrorHandler} />}
      <Form method="post" className="form">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        {isLogin ? (
          <>
            <p>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required />
            </p>
            <p>
              <label htmlFor="image">Password</label>
              <input id="password" type="password" name="password" required />
            </p>
          </>
        ) : (
          <>
            <p>
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required />
            </p>
            <p>
              <label htmlFor="image">Password</label>
              <input id="password" type="password" name="password" required />
            </p>
          </>
        )}
        <div className="actions">
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "New Account" : "Login"}
          </Link>
          <button type="submit" disabled={isSubmitting}>{`${
            isLogin ? "Enter" : "Save"
          }`}</button>
        </div>
        {isSubmitting && <Loader />}
      </Form>
    </div>
  );
};

export default Auth;
