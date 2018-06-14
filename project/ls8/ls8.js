const RAM = require('./ram');
const CPU = require('./cpu');
const fs = require('fs');
const argv = process.argv;


if (process.argv.length != 3) {
    console.error('msg: you need 3 names  ==> node , executerFile and  dataFile ')
    process.exit(1)
}



let program = argv[2];
const fileData = fs.readFileSync(program, "utf8");
const lines = fileData.trim().split(/[\r\n]+/g);
let p = [];
for (let line of lines) {
    const value = parseInt(line, 2);
    if (isNaN(value)) {
        continue; /// continue reading the code and  do nothing 
    }
    p.push(value);
}



function loadMemory(cpu, p) {
    for (let i = 0; i < p.length; i++) {
        cpu.poke(i, p[i]);
    }
}

let ram = new RAM(256);
let cpu = new CPU(ram);

loadMemory(cpu, p);
cpu.startClock();
