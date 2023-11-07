import * as React from "react";
import { render } from "react-dom";
import { Review_backend } from "../../declarations/Review_backend";

const MyHello = () => {
  const [courseName, setCourseName] = React.useState('');
  const [newCourse, setnewCourse] = React.useState('');
  const [newRating, setNewRating] = React.useState(null);
  const [rating,  setRating] = React.useState(null);
  const [review, setReview] = React.useState('');
  const [courseRating, setCourseRating] = React.useState(null);

  // Function to add a  new course
  async function addNewCourse() {
    try{
    const add = await Review_backend.addCourse(courseName);
    setnewCourse(add);
    }
    catch(err){
      console.log(err);
    }
  }

  // Function to rate a course
  async function rateCourse() {
    try{
    const rate = await Review_backend.rateCourse(courseName, rating, review);
    console.log(rate);
    }
    catch(err){
      console.log(err);
    }
  }

  // Function to get course rating
  async function getCourseRating() {
    try{
    const add = await Review_backend.courseRating(courseName);
    console.log(add);
    const counter = parseInt(add.count);
    const total = parseInt(add.totalRatings);
    console.log(counter, total);
    if(counter !== 0n){
      setCourseRating(total/counter);
    }
    else
    setCourseRating(0);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div style={{ "fontSize": "30px" }}>
      <div style={{ "backgroundColor": "yellow" }}>
        <p>Welcome to Decentra Review</p>
      </div>
      <div style={{ margin: "30px" }}>
        <p>Enter the Course name, you want to add </p>
        <input
          id="name"
          value={courseName}
          onChange={(ev) => setCourseName(ev.target.value)}
        ></input>
        <button onClick={addNewCourse}>Add Course</button>
      </div>

      <div style={{ margin: "30px" }}>
        <p>Enter the Course name, you want to rate</p>
        <input
          id="name"
          placeholder = "Enter the name of the course"
          value={courseName}
          onChange={(ev) => setCourseName(ev.target.value)}
        ></input>
        <input
          id="rating"
          placeholder = "Enter the Rating"
          value={rating}
          onChange={(ev) => setRating(parseInt(ev.target.value))}
        ></input>
        <input
          id="review"
          placeholder = "Enter the Review"
          value={review}
          onChange={(ev) => setReview(ev.target.value)}
        ></input>
        <button onClick={rateCourse}>Rate Course</button>
      </div>

      <div style={{ margin: "30px" }}>
        <p>Enter the Course name, you want to enquire about</p>
        <input
          id="name"
          value={courseName}
          onChange={(ev) => setCourseName(ev.target.value)}
        ></input>
        <button onClick={getCourseRating}>Get Rating</button>
      </div>

      { newCourse !== '' &&
      <div>
        "
        <span style={{ color: "blue" }}>{newCourse}</span>" is added!
      </div>
}
{ courseName !== '' &&
      <div>
        "
        <span style={{ color: "blue" }}>{courseName}</span>" is the course name
      </div>
}
{ courseRating !== null &&
      <div>
        "
        <span style={{ color: "blue" }}>{courseRating}</span>" is the course Rating
      </div>
}
{ newRating !== null &&
      <div>
        "
        <span style={{ color: "blue" }}>{newRating}</span>" is the new Rating.
      </div>
}
    </div>
  );
};

render(<MyHello />, document.getElementById("app"));