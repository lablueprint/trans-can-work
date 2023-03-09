import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FamilyRestroom } from "@mui/icons-material";

function MyForm() {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cityState, setCityState] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [age, setAge] = useState(0); // could use form validation age > 0
  const [genderIdentity, setGI] = useState("");
  const [sexuality, setSexuality] = useState("");
  const [veteranStatus, setVeteranStatus] = useState("");
  const [skills, setSkills] = useState({
    "Accounting Software": false,
    "Administrative": false,
    "Adobe Software Suite": false,
    "Bilingual": false,
    "Brand Management": false,
    "Cold Calling": false,
    "Computer Software and Application Software": false,
    "CPR": false,
    "Customer Service": false,
    "Database Management": false,
    "Excel": false,
    "Graphic Design": false,
    "Machinery Skills": false,
    "Marketing Campaign Management": false,
    "Mobile Development": false,
    "Multilingual": false,
    "Negotiation": false,
    "Patient Scheduling Software": false,
    "Philanthropy": false,
    "Powerpoint": false,
    "Programming Languages (Ex. Perl, Python, Java, and Ruby)": false,
    "Project Management": false,
    "Public Speaking": false,
    "Search Engine and Keyword Optimization": false,
    "Statistical Analysis": false,
    "Type 60+ WPM": false,
    "User Interface Design": false,
    "Wood Working": false,
    "Word": false,
    "Writing": false,
    "Money Handling": false,
    "Customer Service": false,
    "Inventory Management": false,
    "ServSafe/Food Safety Certification/Food Handlers Card": false,
    "Photo Editing": false,
    "Photography": false,
    "Photoshop": false
  });
  const [degreeStatus, setDegreeStatus] = useState("");
  const [degree, setDegree] = useState("");
  const [certificate, setCertificate] = useState("");
  const [certificateType, setCertificateType] = useState("");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    console.log(name);
    console.log(checked);
    setSkills({ ...skills, [name]: checked });
    console.log(skills);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name}, Age: ${age}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Authentic Name"
        id="outlined-required"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <br />
      <TextField
        label="Pronouns"
        id="outlined-required"
        variant="outlined"
        value={pronouns}
        onChange={(event) => setPronouns(event.target.value)}
      />
      <br />
      <TextField
        label="Phone"
        id="outlined-required"
        variant="outlined"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      <br />
      <TextField
        label="Email"
        id="outlined-required"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <TextField
        label="City/State"
        id="outlined-required"
        variant="outlined"
        value={cityState}
        onChange={(event) => setCityState(event.target.value)}
      />
      <br />
      <TextField
        label="Ethnicity"
        id="outlined-required"
        variant="outlined"
        value={ethnicity}
        onChange={(event) => setEthnicity(event.target.value)}
      />
      <br />
      <TextField
        label="Age"
        id="outlined-required"
        variant="outlined"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <br />
      <TextField
        label="Age"
        id="outlined-required"
        variant="outlined"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <br />
      <TextField
        label="Gender Identity"
        id="outlined-required"
        variant="outlined"
        value={genderIdentity}
        onChange={(event) => setGI(event.target.value)}
      />
      <br />
      <TextField
        label="Sexuality"
        id="outlined-required"
        variant="outlined"
        value={sexuality}
        onChange={(event) => setSexuality(event.target.value)}
      />
      <br />
      <TextField
        label="Veteran Status"
        id="outlined-required"
        variant="outlined"
        value={veteranStatus}
        onChange={(event) => setVeteranStatus(event.target.value)}
      />
      <br />

      <label>
        Skills:
        <br />
        <input
          type="checkbox"
          name="Accounting Software"
          checked={skills.accountingSoftware}
          onChange={handleCheckboxChange}
        />
        <span>Accounting Software</span>
        <br />
        <input
          type="checkbox"
          name="Administrative"
          checked={skills.administrative}
          onChange={handleCheckboxChange}
        />
        <span>Administrative</span>
        <br />
        <input
          type="checkbox"
          name="Adobe Software Suite"
          checked={skills.adobeSoftwareSuite}
          onChange={handleCheckboxChange}
        />
        <span>Adobe Software Suite</span>
        <br />
        <input
          type="checkbox"
          name="Bilingual"
          checked={skills.bilingual}
          onChange={handleCheckboxChange}
        />
        <span>Bilingual</span>
      </label>
      
      <br />
      <FormControl fullWidth style = {{maxWidth: 300}}>
        <InputLabel id="demo-simple-select-label">Veteran Status</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={veteranStatus}
            label="Veteran Status"
            onChange={(event) => setVeteranStatus(event.target.value)}
        >
            <MenuItem value={"Protected Veteran"}>I am a protected veteran.</MenuItem>
            <MenuItem value={"Not a Veteran"}>I am not a veteran.</MenuItem>
            <MenuItem value={"Option 3"}>Option 3</MenuItem>
        </Select>
      </FormControl>
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default MyForm;
