'use strict';

const url = `https://developer.nps.gov/api/v1/parks`;

function formatStateCode(stateCode) {
    return stateCode.trim().split(/[ ,]+/).join(',');
}

function formatParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function displayParks(responseJson, maxResults) {
    $('#results-list').empty();
    $('#js-error-message').empty();
    console.log(responseJson.data[0].fullName);
    console.log(maxResults);
    for (let i = 0; i < maxResults && i < responseJson.data.length; i++) {
        console.log(i);
        $('#results-list').append(`
            <li>
                <h3>${responseJson.data[i].fullName}</h3>
                <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
                <p>${responseJson.data[i].description}</p>
            </li>
        `)
    }
    $('#results').removeClass('hidden');
  }

function getParks(stateCode, maxResults=10) {
    const formatted = formatStateCode(stateCode);
    console.log(formatted);
    const params = {
        limit: maxResults,
        stateCode: formatted,
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
        .then(responseJson => {
            console.log(responseJson.total);
            if (responseJson.total === '0') {
                $('#js-error-message').append('<p>We could not find any parks with your search. Please try again</p>');
            } else {
                displayParks(responseJson, maxResults)
            }
        })
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