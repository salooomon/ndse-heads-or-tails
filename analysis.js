const fs = require('fs');
let readFile = fs.createReadStream('log.js');
let data
readFile
.setEncoding('utf8')
.on('data', (chank) => {
	data = JSON.parse(chank)
})
.on('end', () => {
	if(data) {
		const dataParse = JSON.parse(data)
		const n = `Выигранных: ${dataParse[0]} Проигранных: ${dataParse[1]} Процент выигранных: ${Math.round(dataParse[0] / dataParse[1] * 100)}%`
		console.log(n)
	}
})