import express from "express";
import bodyParser from 'body-parser';
import cache from 'memory-cache';

const app = express();

app.on('uncaughtException', function(err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

const sDUrl = 'http://127.0.0.1:5000/api/v1/chat';

const discordBotToken = "<your bot's token>";

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Project is running!");
}).setTimeout(500000000);

app.get("/", (req, res) => {
  res.send("Oobabooga bot running");
})

import Discord from "discord.js";
import { GatewayIntentBits, Partials, Attachment } from 'discord.js';
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.MessageReaction,
    Partials.User,
    Partials.GuildMessages,
    Discord.PartialGroupDMChannel
  ]
});


client.on('messageCreate', async (message) => {
  console.log("Received message: " + message.content);
  if (message && message.content && !message.author.bot) {
    
    let content = message.content;

    if(content === '/reset') {

      cache.put('history','');  //save conversation follow up (pre. message)

      message.channel.send("Chat history has been deleted");

    } else {

      let history = cache.get('history') ? JSON.parse(cache.get('history')) : {'internal': [], 'visible': []};

      const payload = {
        'user_input': content,
        'max_new_tokens': 250,
        'history': history,
        'mode': 'chat', 
        'character': 'Magi',
        'your_name': 'You',
        'instruction_template': 'Vicuna-v1.1',
        'regenerate': false,
        '_continue': false,
        'stop_at_newline': false,
        'chat_prompt_size': 2048,
        'chat_generation_attempts': 1,

        'do_sample': true,
        'temperature': 0.7,
        'top_p': 0.1,
        'typical_p': 1,
        'epsilon_cutoff': 0,  
        'eta_cutoff': 0,  
        'tfs': 1,
        'top_a': 0,
        'repetition_penalty': 1.18,
        'top_k': 40,
        'min_length': 0,
        'no_repeat_ngram_size': 0,
        'num_beams': 1,
        'penalty_alpha': 0,
        'length_penalty': 1,
        'early_stopping': true,
        'mirostat_mode': 0,
        'mirostat_tau': 5,
        'mirostat_eta': 0.1,

        'seed': -1,
        'add_bos_token': true,
        'truncation_length': 2048,
        'ban_eos_token': false,
        'skip_special_tokens': true,
      }

      

      fetch(sDUrl, {  //We request image from local Stable Diffusion server
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log("Finished processing");

        console.log(responseJson.results[0]['history']);

        message.channel.send(responseJson.results[0]['history'].visible[responseJson.results[0]['history'].visible.length - 1][1]);

        //message.channel.send("It worked!");

        cache.put('history', JSON.stringify(responseJson.results[0]['history']));  //save conversation follow up (pre. message)
        
      })

    }   
    
  } 
})

client.on('ready', () => {
  console.log("Oobabooga Bot is running...");
});

client.login(discordBotToken);
