import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { useState } from "react";
import "./Auth.css";
import Loader from "../../shared/components/UIElements/Loader/Loader";

function Auth() {
  const data: any = useActionData();
  const navigation: any = useNavigation();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="container">
      <Form method="post" className="form">
        <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((error: any) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="actions">
            <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
              {isLogin ? "Create new user" : "Login"}
            </Link>
            <button
              disabled={isSubmitting}
              onClick={() => setIsLoading((prevState) => !prevState)}
            >{`${isLogin ? "Enter" : "Save"}`}</button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Auth;
