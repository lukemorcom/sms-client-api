import express from 'express';
import Pusher from 'pusher';
import dotenv from 'dotenv'; 

const app = express();
app.use(express.json());
dotenv.config();

const pusherConfig: Pusher.Options = {
	appId: process.env.PUSHER_APP_ID!,
	key: process.env.PUSHER_APP_KEY!,
	secret: process.env.PUSHER_APP_SECRET!,
	cluster: process.env.PUSHER_APP_CLUSTER!,
};

const pusher = new Pusher(pusherConfig);

app.post('/twilio-message-webhook', (req, res) => {
	const message = req.body.message;
	pusher.trigger( 'sms-channel', 'message-received', { message });
  	res.sendStatus(200);
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log(`app listening on port ${port}!`)
});
