
/**
 * LS-8 v2.0 emulator skeleton code
 */


const instruction = {
    HLT: 1,
    MUL: 170,
    PRN: 67,
    LDI: 153

};
/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {

    /**
     * Initialize the CPU
     */
    constructor(ram) {
        this.ram = ram;

        this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

        // Special-purpose registers
        this.PC = 0; // Program Counter which is the  index for instructions 
    }

    /**
     * Store value in memory address, useful for program loading
     */
    poke(address, value) { // store the index and the value in the ram 
        this.ram.write(address, value);
    }

    /**
     * Starts the clock ticking on the CPU
     */
    startClock() {
        this.clock = setInterval(() => {
            this.tick();
        }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
    }

    /**
     * Stops the clock
     */
    stopClock() {
        clearInterval(this.clock);
    }

    /**
     * ALU functionality
     *
     * The ALU is responsible for math and comparisons.
     *
     * If you have an instruction that does math, i.e. MUL, the CPU would hand
     * it off to it's internal ALU component to do the actual work.
     *
     * op can be: ADD SUB MUL DIV INC DEC CMP
     */
    alu(op, regA, regB) {
        switch (op) {

            case instruction.MUL:
                return (this.reg[regA] *= this.reg[regB]);
                break;
            default:
                break;
        }
    }

    /**
     * Advances the CPU one cycle
     */
    tick() {
        // Load the instruction from ram based on the index 'this.pc' and put it in the instruction register (IR--can just be a local variable here)
        // from the memory address pointed to by the PC. (I.e. the PC holds the
        // index into memory of the instruction that's about to be executed
        // right now.)

        const IR = this.ram.read(this.PC); // PC is the index of the instruction 
        //IR instruction values 

        // Debugging output
        //console.log(`${this.PC}: ${IR.toString(2)}`);

        // Get the two bytes in memory _after_ the PC (operands)in case the instruction
        // needs them.

        // !!! IMPLEMENT ME
        const b1 = this.ram.read(this.PC + 1); // operand b1  is value from the index (pc +1 = index) of the first operand
        const b2 = this.ram.read(this.PC + 2); // operand b2 


        // Execute the instruction. Perform the actions for the instruction as
        // outlined in the LS-8 spec.

        switch (IR) {
            case instruction.LDI:
                // this.ram.write(b1, b2);
                this.reg[b1] = b2;
                break;
            case instruction.PRN:
                //console.log(this.ram.read(b1));
                console.log(this.reg[b1]);
                break;
            case instruction.MUL:
                this.alu(instruction.MUL, b1, b2)
                break;
            case instruction.HLT:
                this.stopClock();
                break;
            default:
                this.stopClock();
                console.log('error');
        }


        // Increment the PC register to go to the next instruction. Instructions
        // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
        // instruction byte tells you how many bytes follow the instruction byte
        // for any particular instruction.

        // !!! IMPLEMENT ME
        const instructionsLength = (IR >> 6) + 1;
        this.PC += instructionsLength;


    }
}

module.exports = CPU;
