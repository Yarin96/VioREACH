import { Form, Link, useSearchParams } from "react-router-dom";
import "./Auth.css";

function Auth() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className="container">
      <Form method="post" className="form">
        <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className="actions">
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button>{`${isLogin ? "Save" : "Enter"}`}</button>
        </div>
      </Form>
    </div>
  );
}

export default Auth;
