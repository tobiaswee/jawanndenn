/* Copyright (C) 2016 Sebastian Pipping <sebastian@pipping.org>
** Licensed under GPL v3 or later
*/
var exampleOptions = ['Apple', 'Banana', 'Orange', 'Papaya'];

var createExampleVotes = function(options) {
    var examplePeople = ['Joe', 'Lisa', 'Monica', 'Astrid'];

    var exampleVotes = [];
    $.each( examplePeople, function( i, person ) {
        votes = []
        $.each( options, function() {
            votes.push( Math.random() > 0.5 );
        })
        exampleVotes.push( [person, votes] );
    })
    return exampleVotes;
}

var exampleConfigJson = JSON.stringify( {
        options: exampleOptions
        }, null, '  ' );

var resetConfig = function() {
    $('#config').val( exampleConfigJson );
}

var prevConfigJson = '';
var prevWellformed = null;

var _addRemoveGoodBad = function(selector, goodClass, badClass, good) {
    if (good) {
        selector.addClass( goodClass );
        selector.removeClass( badClass );
    } else {
        selector.addClass( badClass );
        selector.removeClass( goodClass );
    }
}

var syncPreview = function() {
    var configJson = $( '#config' ).val();

    var wellformed = true;
    try {
        var config = jQuery.parseJSON( configJson );
    } catch( err ) {
        wellformed = false;
    }

    if (wellformed != prevWellformed) {
        _addRemoveGoodBad( $( "#config" ),
                'wellformed', 'malformed', wellformed );
        prevWellformed = wellformed;
    }

    if (wellformed) {
        var configJsonNormalized = JSON.stringify( config );
        if (configJsonNormalized != prevConfigJson) {
            prevConfigJson = configJsonNormalized;
            $( "#poll" ).html( createPollHtml( config,
                    createExampleVotes( config.options ) ) );
        }
    }
}


$( document ).ready(function() {
    resetConfig();
    syncPreview();
    setInterval( syncPreview, 500 );
});
