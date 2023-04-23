import React, { useState } from "react";
import "./FinalCover.css";
import axios from "axios";

function DisplayFinalCover() {
  return (
    <div>
      <h1 className="final-title">Here is your Groovelist!</h1>
      <div className="your-grooveList">
        <div className="your-cover">
          <img
            src="https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"
            alt=""
          />
          <h3>jdsdnsdsldhl</h3>
        </div>
        <div className="your-tracklist">
          <h3>Track List</h3>
        </div>
      </div>
    </div>
  );
}

export default DisplayFinalCover;
