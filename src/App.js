import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Home
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';
import MilestoneButton from './Components/Milestones/MilestoneButton';
import MilestoneMap from './Components/Milestones/MilestoneMap';

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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes> 
      <Footer />
    </div>
  );
}

export default App;
