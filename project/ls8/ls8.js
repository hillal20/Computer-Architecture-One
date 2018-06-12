const RAM = require('./ram');
const CPU = require('./cpu');

const fs = require('fs');
const argv = process.argv
//console.log(argv);
let program = argv[2];
const fileData = fs.readFileSync(program, "utf8");
//console.log(fileData);
const lines = fileData.trim().split(/[\r\n]+/g);
//console.log(lines);
let p = []
for (let i = 1; i < lines.length; i++) {

    p.push(lines[i].split(" ")[0]);

}



/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory() {

    // Hardcoded program to print the number 8 on the console

    const program = p
    // [ // print8.ls8
    //     "10011001", // LDI R0,8  Store 8 into R0
    //     "00000000",
    //     "00001000",
    //     "01000011", // PRN R0    Print the value in R0
    //     "00000000",
    //     "00000001"  // HLT       Halt and quit

    // multiply 

    // "10011001", // # LDI R0,8  Load R0 with value 8
    // "00000000", // r0
    // "00001000", // value = 8 
    // "10011001", //# LDI R1,9  Load R1 with value 9
    // "00000001", // r1 
    // "00001001", // value = 9 
    // "10101010", //# MUL R0,R1 Multiply R0*R1, storing result in R0
    // "00000000", // r0  value = 72 
    // "00000001", // r1 
    // "01000011", //# PRN R0    Print value in R0
    // "00000000", // r0 
    // "00000001" //# HLT       Halt



    // ];

    // Load the program into the CPU's memory a byte at a time
    for (let i = 0; i < program.length; i++) {
        cpu.poke(i, parseInt(program[i], 2));
    }
}

/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);

// TODO: get name of ls8 file to load from command line

loadMemory(cpu);
cpu.startClock();