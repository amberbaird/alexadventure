// JavaScript source code

'use strict';
var AlexaSkill = require('./AlexaSkill'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers');

var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]"; not quite sure what this is.
var skillContext = {};

var AlexAdventure = function () {
    AlexaSkill.call(this, APP_ID);
    skillContext.needMoreHelp = true;
};


// Extend AlexaSkill
AlexAdventure.prototype = Object.create(AlexaSkill.prototype);
AlexAdventure.prototype.constructor = AlexAdventure;

eventHandlers.register(AlexAdventure.prototype.eventHandlers, skillContext);
intentHandlers.register(AlexAdventure.prototype.intentHandlers, skillContext);

module.exports = AlexAdventure;

