// code here! 
// beep boop beep boop

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

const name = 'kaylee'; 
const title = 'administrator'; 
const pronouns = 'she/her'; 
const email = 'kaeleytran@gmail.com'; 

export default function ProfileOutline(){
// some code here 
const user = {
    name: 'kaylee',
    title: 'administrator',
    pronouns: 'she/her',
    email: 'kaeleytran@gmail.com', 
};

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
        {user.name}
    </div>
        <br>
        </br>
    <div style={styles.boldedText}>
        Title:
    </div>
    <div style={styles.title}>
        {user.title} 
    </div>
        <br>
        </br>
    <div style={styles.boldedText}>
        Pronouns:
    </div>
    <div style={styles.pronouns}>
        {user.pronouns} 
    </div>
        <br>
        </br>
        <div style={styles.boldedText}>
        Email:
    </div>
    <div style={styles.email}>
        {user.email} 
    </div>
        <br>
        </br>
</div>

)



// end of function bracket 
}
