// JavaScript source code

'use strict';
var AlexAdventure = require('./alexAdventure');

exports.handler = function (event, context) {
    var alexAdventure = new AlexAdventure();
    alexAdventure.execute(event, context);
};