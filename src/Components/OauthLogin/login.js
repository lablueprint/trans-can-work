import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = '309643493967-ppgrqlv09fuvounc5uuni2eokrrvvi2g.apps.googleusercontent.com';

function Login() {
  const onSuccess = (res) => {
    console.log('LOGIN SUCCESS! Current user:', res.profileObj);
  };

  const onFailure = (res) => {
    console.log('LOGIN FAILURE! Error response:', res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        // eslint-disable-next-line react/jsx-boolean-value
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
