# discord-stable-diffusion-bot
A bot that connects to a local Oobabooga API for AI prompts 

![alt text](https://i.imgur.com/f2XDbB3.png)

You can reset chat history with this command:

```
/reset
```

## Requirements

Oobabooga:
https://github.com/oobabooga/text-generation-webui

You can activate API endpoints by adding command line argument to executable:
```
--api
```

## Installation

Install node dependencies
```
npm install
```
Add your Discord bot Token Key here:
/server/index.js line 14
```
const discordBotToken = "<your bot's token>";
```

## Usage

To start the project:
```
npm start
```

## Links and utilities

Discord Developers Portal:
https://discord.com/developers

POST Request Payload format example:
```javascript
const payload = {
        'user_input': 'Hey there!',  //prompt message
        'max_new_tokens': 250,
        'history': {'internal': [], 'visible': []}, //empty history in this case
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
```

API URL:
```
'{url}/api/v1/chat'
```

Package.json
"start": "node ."

## License

MIT

---
