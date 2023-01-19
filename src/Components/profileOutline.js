import PropTypes from 'prop-types';

import { useEffect } from "react";



export default function ProfileOutline({
    demographic_info
}
){


return (
    
<div>
    <p>Name: {demographic_info[0].name}</p>
    <p>Title: {demographic_info[0].title}</p>
    <p>Pronouns: {demographic_info[0].pronouns}</p>
    <p>Email: {demographic_info[0].email}</p>
    <p>Phone Number: {demographic_info[0].phone}</p>
    <p>City: {demographic_info[0].city}</p>
    <p>State: {demographic_info[0].state}</p>
    <p>Ethnicity: {demographic_info[0].ethnicity}</p>
    <p>Age: {demographic_info[0].age}</p>
    <p>Gender Identity: {demographic_info[0].genderIdentity}</p>
    <p>Sexuality: {demographic_info[0].sexuality}</p>
    <p>Veteran Status: {demographic_info[0].veteran}</p>
    <p>Disability: {demographic_info[0].disability}</p>
    <p>Housing Situation: {demographic_info[0].housingSituation}</p>
    <p>Employment Status: {demographic_info[0].employmentStatus}</p>
    <p>Prior Convictions: {demographic_info[0].priorConvictions}</p>
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