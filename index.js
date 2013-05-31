var irc = require('irc');
var _ = require('underscore');

var nextBotConfig = {
    channels: ['#trivia'],
    server: "irc.cat.pdx.edu",
    name: "nextBot",
};

var pmBotConfig = _.extend({}, nextBotConfig, {name:'pmbot',
                                               triviaBotName:'trivia',
                                               nextNum:0,
                                               channels: ['#sagetest'],
                                               skipMessage: '?next',
                                              });

var bot = new irc.Client(nextBotConfig.server, nextBotConfig.name, nextBotConfig);

var pmBot = new irc.Client(pmBotConfig.server, pmBotConfig.name, pmBotConfig);

var next = function(nick){
    var nextNick = pmBotConfig.name + pmBotConfig.nextNum;
    pmBotConfig.nextNum = (pmBotConfig.nextNum + 1 ) % 3;
    pmBot.send("nick", nextNick);
    pmBot.say(pmBotConfig.triviaBotName, pmBotConfig.skipMessage);
    console.log(nick+" is skipping");
    console.log(pmBotConfig.nextNum);
};

bot.addListener("message", function(nick, channel, text){
    if(text == '!next'){
        next(nick);
    }
});

pmBot.addListener("error", function(error){
    console.log("error:"+error);
});

bot.addListener("error", function(error){
    console.log("Error:"+error);
});
