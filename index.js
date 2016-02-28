/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This sample shows how to create a Lambda function for handling Alexa Skill requests that:
 *
 * - Web service: communicate with an external web service to get events for specified days in history (Wikipedia API)
 * - Pagination: after obtaining a list of events, read a small subset of events and wait for user prompt to read the next subset of events by maintaining session state
 * - Dialog and Session state: Handles two models, both a one-shot ask and tell model, and a multi-turn dialog model.
 * - SSML: Using SSML tags to control how Alexa renders the text-to-speech.
 *
 * Examples:
 * One-shot model:
 * User:  "Alexa, ask History Buff what happened on August thirtieth."
 * Alexa: "For August thirtieth, in 2003, [...] . Wanna go deeper in history?"
 * User: "No."
 * Alexa: "Good bye!"
 *
 * Dialog model:
 * User:  "Alexa, open History Buff"
 * Alexa: "History Buff. What day do you want events for?"
 * User:  "August thirtieth."
 * Alexa: "For August thirtieth, in 2003, [...] . Wanna go deeper in history?"
 * User:  "Yes."
 * Alexa: "In 1995, Bosnian war [...] . Wanna go deeper in history?"
 * User: "No."
 * Alexa: "Good bye!"
 */


/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

/**
 * The AlexaSkill Module that has the AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');


/**
 * AlexAdventure is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var AlexAdventure = function() {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
AlexAdventure.prototype = Object.create(AlexaSkill.prototype);
AlexAdventure.prototype.constructor = AlexAdventure;

AlexAdventure.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("AlexAdventure onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session init logic would go here
};

AlexAdventure.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("AlexAdventure onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    getName();
};

AlexAdventure.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session cleanup logic would go here
};

//story variables
var AdventureChoice;
var Name;
var Choice1;
var Choice2;
var Choice3;
var Choice4;
var Choice5;
var Choice6;

//start here with logic
AlexAdventure.prototype.intentHandlers = {

    "GetNameIntent": function (intent, session, response) {
        handleName(intent, session, response);
    },

    "KidAdultIntent": function (intent, session, response) {
        handleAdvChoice(intent, session, response);
    },
    
    "KidChoice1Intent": function (intent, session, response) {
        handleKidChoice1(intent, session, response);
    },
    
    "KidChoice2Intent": function (intent, session, response) {
        handleKidChoice2(intent, session, response);
    },
    
   "KidChoice3Intent": function (intent, session, response) {
        handleKidChoice3(intent, session, response);
    },
    
    "KidChoice4Intent": function (intent, session, response) {
        handleKidChoice4(intent, session, response);
    },
    
    "KidChoice5Intent": function (intent, session, response) {
        handleKidChoice5(intent, session, response);
    },
    
    "KidChoice6Intent": function (intent, session, response) {
        handleKidChoice6(intent, session, response);
    },
    
    "AdultChoice1Intent": function (intent, session, response) {
        handleAdultChoice1(intent, session, response);
    },
    
    "AdultChoice2Intent": function (intent, session, response) {
        handleAdultChoice2(intent, session, response);
    },
    
    "AdultChoice3Intent": function (intent, session, response) {
        handleAdultChoice3(intent, session, response);
    },
    
    "AdultChoice4Intent": function (intent, session, response) {
        handleAdultChoice4(intent, session, response);
    },
    
    "AdultChoice5Intent": function (intent, session, response) {
        handleAdultChoice5(intent, session, response);
    },
    
    "AdultChoice6Intent": function (intent, session, response) {
        handleAdultChoice6(intent, session, response);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "So long, adventurer!",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "So long, adventurer!",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    }
};

/**
 * Function to handle the onLaunch skill behavior
 */

name = function getName() {
    var repromptText = "AlexAdventure can take you on an adventure. What is your first name, adventurer?";
    var speechText = "<p>Welcome to AlexAdventure.</p> <p>What is your first name, adventurer?</p>" 

    var speechOutput = {
        speech: "<speak>" + speechText + "</speak>",
        type: AlexaSkill.speechOutputType.SSML
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.ask(speechOutput, repromptOutput);
}


function handleAdvChoice(intent, session, response) {
    advChoice = intent.slots.advChoice;

    var repromptText = "Please choose whether you would like a baseball adventure for kids or a dragon adventure for adults.";
    var speechText = "That's a nice name, " + name + ". Would you like to go on a kid's baseball adventure or an adult's dragon adventure?";

    var speechOutput = {
        speech: speechText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    
    response.ask(speechOutput, repromptOutput);
        }
    });
}


 * Gets a poster prepares the speech to reply to the user.
 */
function handleNextEventRequest(intent, session, response) {
    
    if (advChoice == "kid"){
        
    }
    else if (advChoice == "adult"{
        
    })
    
    
    
    var cardTitle = "More events on this day in history",
        sessionAttributes = session.attributes,
        result = sessionAttributes.text,
        speechText = "",
        cardContent = "",
        repromptText = "Do you want to know more about what happened on this date?",
        i;
    if (!result) {
        speechText = "With History Buff, you can get historical events for any day of the year.  For example, you could say today, or August thirtieth. Now, which day do you want?";
        cardContent = speechText;
    } else if (sessionAttributes.index >= result.length) {
        speechText = "There are no more events for this date. Try another date by saying <break time = \"0.3s\"/> get events for august thirtieth.";
        cardContent = "There are no more events for this date. Try another date by saying, get events for august thirtieth.";
    } else {
        for (i = 0; i < paginationSize; i++) {
            if (sessionAttributes.index>= result.length) {
                break;
            }
            speechText = speechText + "<p>" + result[sessionAttributes.index] + "</p> ";
            cardContent = cardContent + result[sessionAttributes.index] + " ";
            sessionAttributes.index++;
        }
        if (sessionAttributes.index < result.length) {
            speechText = speechText + " Wanna go deeper in history?"; //second prompt
            cardContent = cardContent + " Wanna go deeper in history?";
        }
    }
    var speechOutput = {
        speech: "<speak>" + speechText + "</speak>",
        type: AlexaSkill.speechOutputType.SSML
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.askWithCard(speechOutput, repromptOutput, cardTitle, cardContent);
}


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the AlexAdventure Skill.
    var skill = new AlexAdventure();
    skill.execute(event, context);
};

