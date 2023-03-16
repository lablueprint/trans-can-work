import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Home,
  Login,
  NavigatorDashboard,
  Register,
  Reset,
  Profile,
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';

function App() {
  // new stuff
  // const [image, setImage] = useState(""); 
  // const addImageHandler = (image) => {
  //   setImage((prevImage)=> {
  //     return image; 
  //   })
  // }
  // new stuff

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
