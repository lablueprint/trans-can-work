import React, { useState, useEffect } from 'react';
import NavigatorService from '../Services/NavigatorService';

const TestServiceComponent = () => {
    const initialTutorialState = {
        title: "",
        description: "",
        published: false
    }
    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);
 
    const handleInputChange = event => {
        const { name, value } = event.target;
        setTutorial({ ...tutorial, [name]: value });
    };

    const saveTutorial = () => {
        var data = {
            title: tutorial.title,
            description: tutorial.description,
            published: false
        };

        NavigatorService.create(data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.error("Error adding document: ", e);
            });
    }
    const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };
 
    return (
        <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
    )
}
 
export default TestServiceComponent;