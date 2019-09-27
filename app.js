const Calc = require('./calc');
const readline = require('readline');

const input = readline.createInterface(process.stdin, process.stdout);

input.setPrompt('Enter expression or type \'exit\'> ');
input.prompt();

input.on('line', function(line) {
	if (line === "exit")
		input.close();

	console.info( Calc.calculate(line) );
	input.prompt();
}).on('close',function(){
	process.exit(0);
});