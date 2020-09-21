import React, {useState} from "react";
import axios from 'axios';

function App() {

  const [ searchTerm, setSearch ] = useState( '' );

  const [ results, setResults ] = useState( { msg: '' } );


  const getHashtags = () => {

    //alert( searchTerm );

    setResults({ msg: 'loading...' })

    axios.post( 'api/hashtags', { term: searchTerm } )
      .then( res => {
        setResults( res );
        console.log( results );
      })
      .catch( err => console.error( err ) );


  }


  return (
    <div style={{ padding: '50px' }}> 

      <h1>Top Hashtags Finder</h1>

      <br /><br />

      <input type="text" onChange={ e => setSearch( e.target.value ) } value={ searchTerm } />
      <button onClick={ getHashtags }>Search</button>

      <br /><br />
      <div style={{ verticalAlign: 'top' }}>

        <div style={{ width: '50%', display: 'inline-block', verticalAlign: 'top'  }}>
          <h3>best-hashtags.com results</h3>

          <ol>
          { results.data 
            ? results.data.best.map( item => <li><strong>{ item.hashtag }</strong>: { item.percent }%</li> ) 
            : results.msg
          }

          </ol>
        </div>

        <div style={{ width: '50%', display: 'inline-block', verticalAlign: 'top'  }}>
          <h3>instagram discovery results</h3>

          <ol>
          { results.data 
            ? results.data.ig.map( item => 
              {
                
                item[0] ? <li><strong>{ item[0] }</strong>: { item[1] }%</li>
                : 'didn\'t work';
              
              } ) 
            : results.msg
          }

          </ol>
        </div>

      </div>

    </div>
  );
}

export default App;
