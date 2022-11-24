// code here! 
// beep boop beep boop
import PropTypes from 'prop-types';

import { useEffect } from "react";

const styles = {
    header: {
        fontSize: 69,
        color: "maroon",
        fontWeight: 900,
    }, 
    text: {
        fontSize: 69,
        color: "brown",
    },
};


export default function ProfileOutline({
    name, 
    title,
    pronouns,
    email,
    phone,
    city,
    state,
    ethnicity,
    age,
    genderIdentity,
    sexuality,
    veteran,
    disability,
    housingSituation,
    employmentStatus,
    priorConvictions,
}
){
// some code here 
// const user = {
//     name: 'kaylee',
//     title: 'administrator',
//     pronouns: 'she/her',
//     email: 'kaeleytran@gmail.com', 
// };

useEffect(()=> {
// do something 
},//set something 
);

return (
<div>
    <div style={styles.header}>
        Name:
    </div>
    <div style={styles.text}>
        {name}
    </div> 
        <br>
        </br>
    <div style={styles.header}>
        Title:
    </div>
    <div style={styles.text}>
        {title} 
    </div>
        <br>
        </br>
    <div style={styles.header}>
        Pronouns:
    </div>
    <div style={styles.text}>
        {pronouns} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Email:
    </div>
    <div style={styles.text}>
        {email} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Phone:
    </div>
    <div style={styles.text}>
        {phone}
    </div> 
        <br>
        </br>
    <div style={styles.header}>
        City:
    </div>
    <div style={styles.text}>
        {city} 
    </div>
        <br>
        </br>
    <div style={styles.header}>
        State:
    </div>
    <div style={styles.text}>
        {state} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Ethnicity:
    </div>
    <div style={styles.text}>
        {ethnicity} 
    </div>
        <br>
        </br>
    <div style={styles.header}>
        Age:
    </div>
    <div style={styles.text}>
        {age}
    </div> 
        <br>
        </br>
    <div style={styles.header}>
        Gender Identity:
    </div>
    <div style={styles.text}>
        {genderIdentity} 
    </div>
        <br>
        </br>
    <div style={styles.header}>
        Sexuality:
    </div>
    <div style={styles.text}>
        {sexuality} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Veteran:
    </div>
    <div style={styles.text}>
        {veteran} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Disability:
    </div>
    <div style={styles.text}>
        {disability}
    </div> 
        <br>
        </br>
    <div style={styles.header}>
        Housing Situation:
    </div>
    <div style={styles.text}>
        {housingSituation} 
    </div>
        <br>
        </br>
    <div style={styles.header}>
        Employment Status:
    </div>
    <div style={styles.text}>
        {employmentStatus} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Prior Convictions:
    </div>
    <div style={styles.text}>
        {priorConvictions} 
    </div>
        <br>
        </br>
</div>

)



// end of function bracket 
}

ProfileOutline.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    pronouns: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    ethnicity: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    genderIdentity: PropTypes.string.isRequired,
    sexuality: PropTypes.string.isRequired,
    veteran: PropTypes.string.isRequired,
    disability: PropTypes.string.isRequired,
    housingSituation: PropTypes.string.isRequired,
    employmentStatus: PropTypes.string.isRequired,
    priorConvictions: PropTypes.string.isRequired,
  }