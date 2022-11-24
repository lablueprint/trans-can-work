// code here! 
// beep boop beep boop
import PropTypes from 'prop-types';

import { useEffect } from "react";

const styles = {
    name: {
        fontSize: 69,
        color: "maroon",
    }, 
    title: {
        fontSize: 69,
        color: "brown",
    },
    pronouns: {
        fontSize: 69,
        color: "orange",
    },
    email: {
        fontSize: 69,
        color: "blue",
    },
    boldedText: {
        fontSize:69,
        fontWeight: "bold",
    },
};


export default function ProfileOutline({
    name, 
    title,
    pronouns,
    email,
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
    <div style={styles.boldedText}>
        Name:
    </div>
    <div style={styles.name}>
        {name}
    </div> 
        <br>
        </br>
    <div style={styles.boldedText}>
        Title:
    </div>
    <div style={styles.title}>
        {title} 
    </div>
        <br>
        </br>
    <div style={styles.boldedText}>
        Pronouns:
    </div>
    <div style={styles.pronouns}>
        {pronouns} 
    </div>
        <br>
        </br>
        <div style={styles.boldedText}>
        Email:
    </div>
    <div style={styles.email}>
        {email} 
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
  }