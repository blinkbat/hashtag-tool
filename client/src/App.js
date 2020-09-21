import React, {useState} from "react";
import axios from 'axios';

function App() {

  const [ searchTerm, setSearch ] = useState( '' );

  return (
    <div style={{ padding: '50px' }}> 

      <h1>Top Hashtags Finder</h1>

      <br /><br />

      <input type="text" onChange={ e => setSearch( e.target.value ) } value={ searchTerm } />
      <button onClick={ () => axios.post( 'localhost:3001/api/hashtags', { term: searchTerm } ) }>Search</button>

      <br /><br />
      <div>

        <div style={{ width: '50%', display: 'inline-block' }}>
          <h3>best-hashtags.com results</h3>
        </div>

        <div style={{ width: '50%', display: 'inline-block' }}>
          <h3>instagram discovery results</h3>
        </div>

      </div>

    </div>
  );
}

export default App;
