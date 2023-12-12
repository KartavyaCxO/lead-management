"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import { Divider } from "@mui/material";
// import GoogleLogin from "react-google-login";
import AppContext from "../../contexts/AppContext";
import { signIn } from "next-auth/react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your CxO Online
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  /*   const navigate = useNavigate(); */
  const { setUser, user } = React.useContext(AppContext);
  //   if (!user) {
  //     navigate(`../`);
  //   }
  //   console.log(user);
  //   const handleClick = () => {
  //     navigate(`../dashboard`);
  //   };
  const clientId =
    "960090898668-2k4l617rghg4pmc2pc51j4bcr47f5mk2.apps.googleusercontent.com";

  //   const onSuccess = (res) => {
  //     setUser(res.profileObj);
  //     if (user) {
  //       handleClick();
  //     }
  //   };

  //   const onFailure = () => {
  //     console.log("failure ");
  //   };
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box className="background-signIn">
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              alt="logo"
              src={"/assets/logo.svg"}
              width={200}
              height={200}
            />

            <Typography
              component="h1"
              variant="h5"
              style={{
                fontStyle: "italic",
                fontFamily: "YourChosenFont, sans-serif",
              }}
            >
              Craft Impactful Cover Letters With AI
            </Typography>
            <Divider sx={{ width: "70%", marginTop: "10px" }} />
            <Box
              component="form"
              /* onSubmit={handleSubmit} */
              noValidate
              sx={{ mt: 1 }}
            >
              {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              />
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

              <Box id="signInButton">
                {/* <GoogleLogin
                  clientId={clientId}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  buttonText="Sign In"
                  cookiePolicy="single_host_origin"
                  isSignedIn={true}
                /> */}

                <div className="flex items-center justify-center dark:bg-gray-800">
                  {/* <button
                    onClick={() => signIn("google")}
                    className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                  >
                    <Image
                      width={20}
                      height={20}
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="google logo"
                    />
                    <span>Login with Google</span>
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("google", {
                        callbackUrl: "http://localhost:3000/dashboard",
                      });
                    }}
                    className="bg-yellow-500 min-w-[20em] text-white p-3 flex gap-5 ease-in-out duration-200 [&>*]:ease-in-out  [&>*]:duration-200  [&>*]:hover:scale-[1.15] active:bg-sky-900 items-center justify-center rounded-full dropshadow-lg font-semibold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="48px"
                      height="48px"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                    <h1>Sign In With Google</h1>
                  </button>
                </div>
              </Box>
              {/* <Grid container>
              <Grid item xs>
              <Link href="#" variant="body2">
              Forgot password?
              </Link>
              </Grid>
              <Grid item>
              <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
              </Link>
              </Grid>
            </Grid> */}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
