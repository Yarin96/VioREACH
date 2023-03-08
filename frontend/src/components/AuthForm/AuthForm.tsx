import React from "react";
import Auth from "../../user/Auth/Auth";

const AuthForm = () => {
  return <Auth />;
};

export default AuthForm;

export async function action({ request }: { request: any }) {
  const data = await request.formData();
}
