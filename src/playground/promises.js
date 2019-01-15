

const myPromise = new Promise(
	(resolve,reject) => {
		// long running task
		setTimeout(
		() => {
			const suc = false;
			if (suc)
				resolve('resolved - yeah!!!');
			else
				reject ('reject - better luck next time.');
		} ,5000);
		
		
	}
)


myPromise.then(
	(data) => {console.log(data);}
).catch(
	(err) => {console.log('ERR: ', err);}
)