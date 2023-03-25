import express from 'express';
import Pusher from 'pusher';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const pusherConfig: any = {
	appId: process.env.PUSHER_APP_ID,
	key: process.env.PUSHER_APP_KEY,
	secret: process.env.PUSHER_APP_SECRET,
	cluster: process.env.PUSHER_APP_CLUSTER,
};

const pusher = new Pusher(pusherConfig);

app.post('/twilio-message-webhook', (req, res) => {
	const message = req.body.message;
	pusher.trigger( 'public-chat', 'message-added', { message });
  	res.sendStatus(200);
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log(`app listening on port ${port}!`)
});

