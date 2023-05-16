// /* eslint-disable import/no-extraneous-dependencies */
// // require('dotenv').config();
// const { google } = require('googleapis');

// export default function AuthURIRedirect() {
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.REACT_APP_CLIENT_ID,
//     process.env.REACT_APP_CLIENT_SECRET,
//     'https://accounts.google.com/o/oauth2/auth', // idk which redirect url to use tbh there's 3?
//   );

//   // generate a url that asks permissions for Drive scope
//   const scopes = [
//     'https://www.googleapis.com/auth/drive',
//   ];

//   const url = oauth2Client.generateAuthUrl({
//     // 'online' (default) or 'offline' (gets refresh_token)
//     access_type: 'offline',

//     // If you only need one scope you can pass it as a string
//     scope: scopes,
//   });

//   window.location.replace(url);
// }
