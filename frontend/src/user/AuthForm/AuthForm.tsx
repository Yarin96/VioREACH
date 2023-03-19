import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import "./AuthForm.css";
import { useState, useEffect } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AssignmentInd, Login } from "@mui/icons-material";

const Auth = () => {
  const [error, setError] = useState(undefined);
  const data: any = useActionData();

  useEffect(() => {
    setError(data);
  }, [data]);

  const navigation: any = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const clearErrorHandler = () => {
    setError(undefined);
  };

  return (
    <div className="auth-container">
      {error && <ErrorModal error={error} onClear={clearErrorHandler} />}
      <Form method="post">
        <Container
          style={{
            color: "orange",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <Grid
            container
            direction="column"
            display="flex"
            justifyContent="center"
            style={{ minHeight: "50vh", width: "400px" }}
          >
            <Paper elevation={2} sx={{ padding: 5 }}>
              <Typography
                variant="h4"
                component="h1"
                align="center"
                style={{ marginBottom: "1rem" }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Typography>
              {isLogin ? (
                <>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        id="email"
                        name="email"
                        type="email"
                        fullWidth
                        label="Enter your email"
                        placeholder="Email Address"
                        variant="outlined"
                        required
                      ></TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="password"
                        name="password"
                        type="password"
                        fullWidth
                        label="Enter your password"
                        placeholder="Password"
                        variant="outlined"
                        required
                      ></TextField>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        id="name"
                        name="name"
                        type="name"
                        fullWidth
                        label="Enter your name"
                        placeholder="Full Name"
                        variant="outlined"
                        required
                      ></TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="email"
                        name="email"
                        type="email"
                        fullWidth
                        label="Enter your email"
                        placeholder="Email Address"
                        variant="outlined"
                        required
                      ></TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="password"
                        name="password"
                        type="password"
                        fullWidth
                        label="Enter password (min. 8 characters)"
                        placeholder="Password"
                        variant="outlined"
                        required
                      ></TextField>
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid
                container
                direction="row"
                display="flex"
                justifyContent="center"
                style={{ marginTop: "16px" }}
              >
                <Grid item style={{ marginRight: "12px" }}>
                  <Link
                    to={`?mode=${isLogin ? "signup" : "login"}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined">
                      {isLogin ? "Sign Up" : "Login"}
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <LoadingButton
                    variant="outlined"
                    type="submit"
                    loading={isSubmitting}
                    startIcon={isLogin ? <Login /> : <AssignmentInd />}
                    disabled={isSubmitting}
                  >
                    {isLogin ? "Sign In" : "Sign Up"}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </Form>
      {/* <div className="container">
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
      </div> */}
    </div>
  );
};

export default Auth;
