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

const demographic_info {
    employmentStatus
}

export default function ProfileOutline({
    demographic_info
}
){


return (
<div>
    <div style={styles.header}>
        Name:
    </div>
    <div style={styles.text}>
        {demographic_info[0].name}
    </div> 
        <br>
        </br>
    <div style={styles.header}>
        Title:
    </div>
    <div style={styles.text}>
        {demographic_info[0].title} 
    </div>
        <br>
        </br>
    <div style={styles.header}>
        Pronouns:
    </div>
    <div style={styles.text}>
        {demographic_info[0].pronouns} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Email:
    </div>
    <div style={styles.text}>
        {demographic_info[0].email} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Phone:
    </div>
    <div style={styles.text}>
        {demographic_info[0].phone}
    </div> 
        <br>
        </br>
    <div style={styles.header}>
        City:
    </div>
    <div style={styles.text}>
        {demographic_info[0].city} 
    </div>
        <br>
        </br>
    <div style={styles.header}>
        State:
    </div>
    <div style={styles.text}>
        {demographic_info[0].state} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Ethnicity:
    </div>
    <div style={styles.text}>
        {demographic_info[0].ethnicity} 
    </div>
        <br>
        </br>
    <div style={styles.header}>
        Age:
    </div>
    <div style={styles.text}>
        {demographic_info[0].age}
    </div> 
        <br>
        </br>
    <div style={styles.header}>
        Gender Identity:
    </div>
    <div style={styles.text}>
        {demographic_info[0].genderIdentity} 
    </div>
        <br>
        </br>
    <div style={styles.header}>
        Sexuality:
    </div>
    <div style={styles.text}>
        {demographic_info[0].sexuality} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Veteran:
    </div>
    <div style={styles.text}>
        {demographic_info[0].veteran} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Disability:
    </div>
    <div style={styles.text}>
        {demographic_info[0].disability}
    </div> 
        <br>
        </br>
    <div style={styles.header}>
        Housing Situation:
    </div>
    <div style={styles.text}>
        {demographic_info[0].housingSituation} 
    </div>
        <br>
        </br>
    <div style={styles.header}>
        Employment Status:
    </div>
    <div style={styles.text}>
        {demographic_info[0].employmentStatus} 
    </div>
        <br>
        </br>
        <div style={styles.header}>
        Prior Convictions:
    </div>
    <div style={styles.text}>
        {demographic_info[0].priorConvictions} 
    </div>
        <br>
        </br>
</div>

)


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