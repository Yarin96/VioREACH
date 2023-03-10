import Auth from "../../user/Auth/Auth";
import { json, redirect } from "react-router-dom";

const AuthForm = () => {
  return <Auth />;
};

export default AuthForm;

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
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
  } else {
    authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  }

  const response = await fetch("http://localhost:8080/", {
    method: "POST",
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  return redirect("/");
}
