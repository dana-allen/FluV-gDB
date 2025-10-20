import React, { useState } from "react"

import AdvancedFilter from './AdvancedFilter';

const AdvancedSearch = () => {

  return (
    <div className='container'>
      <h2>Advanced Search</h2>
      <p>
        Welcome to {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE}'s advance search. 
        Advanced search provides an interface for searching the {process.env.REACT_APP_VIRUS_ABB} database. 
      </p>
      <p>
        Notes:
        <ul>
          <li>This search allows you to build up queries that support a wide range of custom conditions</li>
          <li>Under Search Conditions, select add more to view all the fields that are available to search through.</li>
        </ul>
      </p>
      <hr></hr>
      <AdvancedFilter></AdvancedFilter>
      
    </div>
  )
}


export default AdvancedSearch;
