import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import LoginButton from './login';
import LogoutButton from './logout';

const CLIENTID = '309643493967-ppgrqlv09fuvounc5uuni2eokrrvvi2g.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBiThiZwdEtWQJRmINwH-ADjLUHV2_Bsv4';
const SCOPES = 'https://www.googleapis.com/auth/drive';

function MainPage() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        apikey: API_KEY,
        clientId: CLIENTID,
        scope: SCOPES,
      });
    }
  });

  return (
    <div className="App" >
        <LoginButton/>
        <LogoutButton/>
    </div>
  );
}

export default function MainPage;