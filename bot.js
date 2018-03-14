/*'use strict'*/    

const TelegramBot = require('node-telegram-bot-api');
const subprocess =require('child_process').exec;
const request = require('request');
const q=require('q');
var fs = require("fs");


var token = fs.readFileSync("token.txt", "utf8");
var bot = new TelegramBot(token, {polling: true});
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    var fromId = msg.from.id;
    var name = msg.from.first_name;
    if (msg.text =='/ls') { runCommand().then(function (data) {
       bot.sendMessage(fromId, data); 
   }, function (error) {
      bot.sendMessage(fromId, error); 
   });
  }   
  
    else{
    bot.sendMessage(chatId, "Добрый вечер,"+ name + "!", {caption: "I'm a bot!"});
    bot.sendMessage(chatId, "Твой никнейм "+msg.from.username);
   }
     
});

bot.onText(/\/вывести (.+)/, function (msg, match) {
      var fromId = msg.from.id;
      var resp = match[1];
      bot.sendMessage(fromId, resp);
    });


function runCommand() {
  var deferred=q.defer();
 
  Execute(function (error, stdout, stderr) {
          if (error==null) {
            deferred.resolve(stdout);
          }
          else{ deferred.reject(error);  }
        }
     );

  return deferred.promise;
}

function Execute(callback) {
 var exec = subprocess('ls', callback);
 /*ls.stdout.on('data', callback );*/
 
}
