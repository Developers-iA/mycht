const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LegacySessionAuth, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
     })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log(session);
});
 
client.initialize();

client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
})

client.on('ready', () => {
    console.log("ready to message")
});

//========= sendMessage
client.on('message_create', message => {
	if (message.body === '!test') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'task');
	}
});


//========= replys
client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('!pong');
	} else if(message.body === 'me') {
		message.reply('fahlevy');
	} else if(message.body === 'test') {
		message.reply('coc api sync to band ada di channel dev strike');
	}
});