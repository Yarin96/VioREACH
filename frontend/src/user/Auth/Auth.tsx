import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import "./Auth.css";
import { useContext } from "react";
import Loader from "../../shared/components/UIElements/Loader/Loader";
import { AuthContext } from "../../shared/context/auth-context";

function Auth() {
  const data: any = useActionData();
  const navigation: any = useNavigation();
  const [searchParams] = useSearchParams();
  const authContext = useContext(AuthContext);

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <div className="container">
        <Form method="post" className="form">
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          {data && data.errors && (
            <ul className="e-list">
              {Object.values(data.errors).map((error: any) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
          {!data && authContext.login}
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
                <label htmlFor="email">Full Name</label>
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
            <button disabled={isSubmitting}>{`${
              isLogin ? "Enter" : "Save"
            }`}</button>
          </div>
          {isSubmitting && <Loader />}
        </Form>
      </div>
    </>
  );
}

export default Auth;
