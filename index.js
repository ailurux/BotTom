const dotenv = require('dotenv');
dotenv.config();
const { Client, MessageAttachment, Intents } = require('discord.js');


const token = process.env.token;

const init = async () => {

	// Create a new client instance
	const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

	// When the client is ready, run this code (only once)
	client.once('ready', () => {
		console.log('Ready!');
	});

	client.on('messageCreate', async message => {
		console.log(message);
		if (message.attachments.size > 0 && message.attachments.some(attachment => !(attachment.spoiler))) {
			const files = message.attachments.map((attachment)=>{
				return (new MessageAttachment(attachment.attachment, 'SPOILER_' + attachment.name));
			});
			const messageOptions = {
				content: `<@${message.author.id}>: ${message.content}`,
				files: files,
			};
			message.channel.send(messageOptions);
			message.delete();
		}
	});

	// Login to Discord with your client's token
	client.login(token);
};

init();
