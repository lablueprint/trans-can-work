import React, { useEffect, useState } from 'react';
import {
  doc, getDoc,
} from 'firebase/firestore';
import firebase from '../firebase';

const db = firebase;

function Calendar() {
  const [calendarId, setCalendarId] = useState('');
  const [timeZone, setTimeZone] = useState('');
  async function fetchData() {
    const docRef = doc(db, 'resources', 'calendar');
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCalendarId(docSnap.data()['Internship Calendar']);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

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
