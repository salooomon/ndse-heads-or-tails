const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const fs = require('fs');
const path = require('path');
const rl = readline.createInterface({ input, output});

const side = Math.round(Math.random() + 1 * 1);

const file = path.join(__filename, '..' ,'log.js');
let readFile = fs.createReadStream('log.js');

const objectLog = {
	win: 0,
	lose: 0,
	total: 0
}

let data
readFile
.setEncoding('utf8')
.on('data', (chank) => {
	data = JSON.parse(chank)
})
.on('end', () => {
	if(data) {
		const dataParse = JSON.parse(data)
		objectLog.win = dataParse[0];
		objectLog.lose = dataParse[1];
	}
})

function saveLog() {
	fs.writeFile(file, `"[${objectLog.win}, ${objectLog.lose}, ${objectLog.win + objectLog.lose}]"`, (e) => {
		e && new Error(e) 
		
	})
}

rl.question('Монета брошена, отгодай сторону!(1 или 2)', (num) => {
	if(Number(num) === side) {
		console.log(`Загаднная сторона ${side}. Победа!`);
		objectLog.win++
		saveLog();
		rl.close(); 
	}else if(Number(num) !== side){
		console.log(`Загаднная сторона ${side}. Ты проиграл!`);
		objectLog.lose++
		saveLog();
		rl.close(); 
	}
})