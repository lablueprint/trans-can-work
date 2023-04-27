import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/functions';
// import { doc, getDoc } from 'firebase/firestore';

function Calendar() {
  const [calendarId, setCalendarId] = useState('');
  const [timeZone, setTimeZone] = useState('');

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase.firestore().collection('resources').doc(userId).get()
      .then((doc) => {
        setCalendarId(doc.data().calendarId);
      });
  }, []);

  // const docRef = doc(db, "cities", "SF");
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <iframe
      src={`https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=${timeZone}&mode=MONTH`}
      style={{
        border: '0', width: '100%', height: '600px', frameborder: '0', scrolling: 'no',
      }}
      title="Calendar"
    />
  );
}

export default Calendar;
