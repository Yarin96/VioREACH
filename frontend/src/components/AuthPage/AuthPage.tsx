import AuthForm from "../../user/AuthForm/AuthForm";
import { json, redirect } from "react-router-dom";

const AuthPage = () => {
  return <AuthForm />;
};

export default AuthPage;

export async function action({ request }: { request: any }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();

  let authData;
  if (mode === "signup") {
    authData = {
      mode: mode,
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
  } else {
    authData = {
      mode: mode,
      email: data.get("email"),
      password: data.get("password"),
    };
  }

  const response = await fetch(`http://localhost:8080/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 500
  ) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);

  return redirect("/");
}
