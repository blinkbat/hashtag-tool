const express = require("express");
const cors = require( 'cors' );
const scrapeIt = require( 'scrape-it' );
const path = require( 'path' );

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve up static assets (usually on heroku)
if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( '../client/build' ) );
}


app.post( '/api/hashtags', ( req, res ) => {

  console.log( req.body.term );

  const hashtagObj = { best: [], ig: [] };

  const scrapeBestHashtags = async () => {

    const response = await scrapeIt( 

        // supposedly searches IG, FB, TW, TUMBLR
        `http://best-hashtags.com/hashtag/${ req.body.term }/`, 
        { rows: { listItem: 'h3', data: { item: '' } } }

    );

    // filter for hashtag items
    const filtered = response.data.rows.filter( row => row.item.indexOf( '#' ) !== -1 );
    const hashtagsArr = [];

    // split text by spaces, parse out hashtag and percent
    filtered.forEach( row => {
        const hashtagKey = row.item.split( ' ' )[0];
        const hashtagPercentStr = row.item.split( ' ' )[2];
        const hashtagPercent = parseInt( hashtagPercentStr );
        // push obj to master arr
        hashtagsArr.push({ hashtag: hashtagKey, percent: hashtagPercent })
    });

    hashtagObj.best.push( ...hashtagsArr );

  };

  // recursive function to find mentions or hashtags
  const findBySymbol = ( text, symbol, arr = [] ) => {

    const removePunctuation = ( item, symbol ) => {

        // if symbol signifies mention or hashtag
        // remove any punctuation except #, @, and _
        symbol === '@' || symbol === '#'
        ? item = item.replace( /[.,\/!$%\^&\*;:{}=\-`~()]/g, '' )
        : false;

        return item;

    }

    if( text.indexOf( symbol ) !== -1 ) {

        // find first occurence
        let startSlice = text.slice( text.indexOf( symbol ) );

        let regex;
        let item;

        // determine symbol for regex
        switch ( symbol ) {

            case '@':
                regex = /@/g;
                break;
            case '#':
                regex = /#/g;
                break;
            case 'http:':
                regex = /http:/g;
                break; 
            case 'https:':
                regex = /https:/g;
                break;
            default:
                break;

        }

        // if only occurrence, split at space and push to arr
        if( startSlice.match( regex ).length === 1 ) {

            // if space, split there, else push item
            if( startSlice.indexOf( ' ' ) !== -1 ) {
                item = startSlice.slice( 0, startSlice.indexOf( ' ' ) );
            } else {
                item = startSlice;
            }

            item = removePunctuation( item, symbol );

            item.length > 30 ? item = item.slice( 0, 29 ) : false;

            arr.push( item );
            
        // else if more occurences, split, push, re-slice and keep parsing
        } else {

            item = startSlice.slice( 0, startSlice.indexOf( ' ' ) );

            item = removePunctuation( item, symbol );

            item.length > 30 ? item = item.slice( 0, 29 ) : false;

            arr.push( item );

            // slice again... and recur!
            const newSlice = startSlice.slice( startSlice.indexOf( ' ' ) );
            findBySymbol( newSlice, symbol, arr );

        }

    }

    return arr;

  };




  const scrapeIG = async () => {

    const response = await scrapeIt( 

        `https://www.instagram.com/explore/tags/${ req.body.term }/`, 

        // scrape the whole body
        { 
            rows: {

                listItem: 'body'
                
            }
        }

    );

    // parse body for #s
    const bigArr = findBySymbol( response.data.rows[0], '#' );

    const counts = {};
    const sortable = [];

    // throw away bad strings, count good ones
    bigArr.forEach( item => {

        if( 
            item.indexOf( ']' ) === -1 
            && item.indexOf( '\\' ) === -1 
            && item.indexOf( '"' ) === -1
        ) {
            counts[ item ] = ( counts[ item ] || 0 ) + 1;
        }

    });

    // push items in obj to arr
    for( const key in counts ) {
        sortable.push( [ key, counts[ key ] ] );
    }

    // sort arr by subarr[1] vals
    sortable.sort( ( a, b ) => b[1] - a[1] );

    // limit total return
    sortable.length = 100;

    console.log( sortable );

    hashtagObj.ig.push( ...sortable );

    // fs.writeFileSync( 
    //     `./emojiSentiment_${ moment( new Date() ).format( 'YYYY_MM_DD' ) }.json`,
    //     JSON.stringify( response.data )
    // );
    

  }

  const finishUp = async () => {

    await scrapeBestHashtags();
    await scrapeIG();

    console.log( hashtagObj );

    res.json( hashtagObj );

  }

  finishUp();


});


// If no API routes are hit, send the React app
app.use( function( req, res ) {
  res.sendFile( path.join( __dirname, "../client/build/index.html" ) );
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
