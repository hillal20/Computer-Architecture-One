


const instruction = {
    HLT: 1,
    MUL: 170,
    PRN: 67,
    LDI: 153,
    PUSH: 77, // 0b01001101 
    POP: 76
};

class CPU {
    constructor(ram) {
        this.ram = ram;
        this.reg = new Array(8).fill(0); // General-purpose registers R0-R7  
        this.PC = 0; // Program Counter which is the  index for instructions 
        this.SP = 0xf4;
    }


    poke(address, value) { // store the index and the value in the ram 
        this.ram.write(address, value);
    }


    startClock() {
        this.clock = setInterval(() => {
            this.tick();
        }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
    }


    stopClock() {
        clearInterval(this.clock);
    }


    alu(op, b1, b2) {
        switch (op) {

            case instruction.MUL:
                this.reg[b1] = (this.reg[b1] * this.reg[b2]) & 0xff; // 0xff =  the result wont pass 255 
                break;
        }
    }
    pushF(b2) {

        this.reg[6] = this.ram.read(this.SP);
        this.SP--;
        this.ram.write(this.SP, b2);
        this.reg[6] = this.ram.read(this.SP);
        console.log('SP', this.reg[6]);


    }

    popF(b1) {

        this.reg[b1] = this.reg[6];
        this.SP++;
        console.log('r1', this.reg[b1]);

    }

    tick() {


        const IR = this.ram.read(this.PC); // PC is the index of the instruction  153      
        const b1 = this.ram.read(this.PC + 1); //  0  operand b1  is value from the index (pc +1 = index) of the first operand
        const b2 = this.ram.read(this.PC + 2); // 1  operand b2 



        switch (IR) {
            case instruction.LDI:
                this.reg[b1] = b2; // r0 = /// the reg[7] === 
                break;
            case instruction.PRN:
                console.log(this.reg[b1]);

                break;
            case instruction.MUL:
                this.alu(instruction.MUL, b1, b2)
                break;
            case instruction.HLT:
                this.stopClock();
                break;

            case instruction.PUSH:
                this.pushF(this.reg[b1]);
                break;

            case instruction.POP:
                this.popF(b1);
                break;
            default:
                this.stopClock();
            //console.log('error');
        }



        const instructionsLength = (IR >> 6) + 1; // the sum of the first 2 digits in the instruction number + 1
        this.PC += instructionsLength;


    }
}

module.exports = CPU;

