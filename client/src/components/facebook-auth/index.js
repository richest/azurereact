import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import facebook from "assets/fb.svg";

const LoginWithFacebook = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <div>
      <FacebookLogin
        appId="367290908685971"
        fields="name,email,picture"
        callback={responseFacebook}
        render={(renderProps) => (
          <button onClick={renderProps.onClick}>
            <img src={facebook} />
          </button>
        )}
      />
    </div>
  );
};

export default LoginWithFacebook;
