import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Home
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


// // import logo from './logo.svg';
// import './App.css';
// import ProfileOutline from './Components/profileOutline'

// // const demographic_info = [{
// //   name: 'kaylee',
// //   title: 'slayer',
// //   pronouns: 'she/her',
// //   email: 'kaeleytran@gmail.com',
// //   phone: '714-420-6969',
// //   city: 'Orange County',
// //   state: 'California',
// //   ethnicity: 'vietnamese',
// //   age: 69,
// //   genderIdentity: 'baddie',
// //   sexuality: 'your mom',
// //   veteran: 'duh',
// //   disability: 'many',
// //   housingSituation: 'stable',
// //   employmentStatus: 'space place',
// //   priorConvictions: 'hundreds'
// // }]

// function App() {
//   return (
//         <div>
//         <ProfileOutline>
//           demographic_info.
//         </ProfileOutline>
//           {/* <ProfileOutline 
//           name = {"kaylee"}
//           title = {"slayer"}
//           pronouns = {"she/her"}
//           email = {"kaeleytran@gmail.com"}
//           phone = {"714-420-6969"}
//           city = {"Orange County"}
//           state = {"California"}
//           ethnicity = {"vietnamese"}
//           age = {"69"}
//           genderIdentity = {"baddie"}
//           sexuality = {"your mom"}
//           veteran = {"duh"}
//           disability = {"many"}
//           housingSituation = {"stable"}
//           employmentStatus= {"space place"}
//           priorConvictions = {"hundreds"}
//           >
//           </ProfileOutline>  */}
//         </div>
//   );
// }

// export default App;



// // // import logo from './logo.svg';
// // import './App.css';
// // import ProfileOutline from './Components/profileOutline';

// // function App() {

// //   return (

// // <div>
// //   <ProfileOutline 
// //           name = {"kaylee"}
// //           title = {"slayer"}
// //           pronouns = {"she/her"}
// //           email = {"kaeleytran@gmail.com"}
// //           phone = {"714-420-6969"}
// //           city = {"Orange County"}
// //           state = {"California"}
// //           ethnicity = {"vietnamese"}
// //           age = {69}
// //           genderIdentity = {"baddie"}
// //           sexuality = {"your mom"}
// //           veteran = {"duh"}
// //           disability = {"many"}
// //           housingSituation = {"stable"}
// //           employmentStatus= {"space place"}
// //           priorConvictions = {"hundreds"}
// //           >
// //    </ProfileOutline>
// //   </div>
      
// //   );
// // }

// // export default App;