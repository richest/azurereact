import React from "react";
import GoogleLogin from "react-google-login";

import google from "assets/google.svg";
import style from "./login-with-google.scss";

const LoginWithGoogle = () => {
  const responseGoogle = (e) => {
    console.log("res", e.profileObj);
  };
  return (
    <div>
      <GoogleLogin
        clientId="526918593370-dvdigaqgnpjv4i6sgjnv0sdvuucup2np.apps.googleusercontent.com"
        buttonText="Login"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <img src={google} />
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginWithGoogle;
