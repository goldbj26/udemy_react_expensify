const express = require('express');
const path = require('path'); //built in, so don't need to manually install


const public_path = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(public_path));

app.get('*', (request,response) => {
	response.sendFile(path.join(public_path,'index.html'));
});


app.listen(port, ()=> {
	console.log("server.js is up.");
});