'use strict';

const url = `https://developer.nps.gov/api/v1/parks`;

function formatParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function displayParks(responseJson, maxResults) {
    for (let i = 0; i < maxResults; i++) {
        
    }
  }

function getParks(stateCode, maxResults=10) {
    const params = {
        limit: maxResults,
        stateCode,
        api_key: NPkey
    }
    const queryString = formatParams(params);
    const searchURL = url + '?' + queryString;
    console.log(searchURL);
    
    fetch(searchURL)
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error (response.statusText);
        }
        )
        .then(responseJson => displayParks(responseJson, maxResults))
        .catch(err => console.log(err));
}


function watchForm(){
    $('form').submit(e => {
        e.preventDefault();
        const stateCode = $('#js-state').val();
        const maxResults = $('#js-max-results').val();
        getParks(stateCode, maxResults);
    })
}

$(watchForm);