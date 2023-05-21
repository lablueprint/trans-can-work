import React from 'react';
import './Workshop.css';

function Workshop() {
  return (
    <div>
      <h6 className="workshop">
        Please share with us any Workshops ye may have attended with Trans Can Work or with any
        other crew.
        {' '}
        <br />
        Also, please make a note if the trainin&apos; ye attended offered any type o&apos;
        certification.
      </h6>
      <div className="checkBoxes">
        <div className="col1">
          <h4>TCW Internal Workshops</h4>
          {/* <hr className="line1" /> */}
          <form>
            <label htmlFor="empower">
              Empowered for Empower!
              <input type="checkbox" />
            </label>
            <br />
            <label htmlFor="glassDoor">
              Glassdoor Workshop
              <input type="checkbox" />
            </label>
            <br />
            <label htmlFor="q&a">
              Q&A
              <input type="checkbox" />
            </label>
          </form>
        </div>
        <div className="col2">
          <h4>External Workshops</h4>
          <form>
            <label htmlFor="transition">
              Transition Workshops
              <input type="checkbox" />
              <ul>
                <li>Vocal training</li>
                <li>Legal process</li>
                <ul>
                  <li>Gener marker</li>
                  <li>Name change</li>
                </ul>
              </ul>
            </label>
            <br />
            <label htmlFor="legal">
              Legal Workshops
              <input type="checkbox" />
            </label>
            <br />
            <label htmlFor="mentalHealth">
              Mental Health
              <input type="checkbox" />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Workshop;
