class Amplifier {

    constructor(program, debugActive = false) {
        this.program = program;
        this.pc = 0;
        this.amplifierIn = [];
        this.amplifierOut = [];
        this.halted = false;
        this.last_opcode = 0;
        this.debugActive = debugActive;
    }


    programStep = () => {
        var fullOpcode = this.program[this.pc];
        var parsedOpcode = this.#parseOpcode(fullOpcode);

        if (this.debugActive)
            this.#debug();

        switch (parsedOpcode.opcode) {
            case 1:
                var in1, in2, out;
                parsedOpcode.mode1 ? in1 = this.program[this.pc + 1] : in1 = this.program[this.program[this.pc + 1]];
                parsedOpcode.mode2 ? in2 = this.program[this.pc + 2] : in2 = this.program[this.program[this.pc + 2]];

                out = this.program[this.pc + 3];
                this.program[out] = in1 + in2;
                this.pc += 4;
                break;

            case 2:
                var in1, in2, out;
                parsedOpcode.mode1 ? in1 = this.program[this.pc + 1] : in1 = this.program[this.program[this.pc + 1]];
                parsedOpcode.mode2 ? in2 = this.program[this.pc + 2] : in2 = this.program[this.program[this.pc + 2]];

                out = this.program[this.pc + 3];
                this.program[out] = in1 * in2;
                this.pc += 4;
                break;

            case 3:
                var inValue = this.amplifierIn.shift();
                var addr = this.program[this.pc + 1];
                this.program[addr] = inValue;
                this.pc += 2;
                break;

            case 4:
                var out;
                parsedOpcode.mode1 ? out = this.program[this.pc + 1] : out = this.program[this.program[this.pc + 1]];
                this.amplifierOut.push(out);
                this.pc += 2;
                break;

            case 5:
                var in1, in2;
                parsedOpcode.mode1 ? in1 = this.program[this.pc + 1] : in1 = this.program[this.program[this.pc + 1]];
                parsedOpcode.mode2 ? in2 = this.program[this.pc + 2] : in2 = this.program[this.program[this.pc + 2]];

                if (in1 != 0) this.pc = in2;
                else this.pc += 3;
                break;

            case 6:
                var in1, in2;
                parsedOpcode.mode1 ? in1 = this.program[this.pc + 1] : in1 = this.program[this.program[this.pc + 1]];
                parsedOpcode.mode2 ? in2 = this.program[this.pc + 2] : in2 = this.program[this.program[this.pc + 2]];

                if (in1 == 0) this.pc = in2;
                else this.pc += 3;
                break;

            case 7:
                var in1, in2, out;
                parsedOpcode.mode1 ? in1 = this.program[this.pc + 1] : in1 = this.program[this.program[this.pc + 1]];
                parsedOpcode.mode2 ? in2 = this.program[this.pc + 2] : in2 = this.program[this.program[this.pc + 2]];

                out = this.program[this.pc + 3];
                this.program[out] = (in1 < in2) ? 1 : 0;
                this.pc += 4;
                break;

            case 8:
                var in1, in2, out;
                parsedOpcode.mode1 ? in1 = this.program[this.pc + 1] : in1 = this.program[this.program[this.pc + 1]];
                parsedOpcode.mode2 ? in2 = this.program[this.pc + 2] : in2 = this.program[this.program[this.pc + 2]];

                out = this.program[this.pc + 3];
                this.program[out] = (in1 == in2) ? 1 : 0;
                this.pc += 4;
                break;

            case 99:
                this.halted = true;
                break;
        }

        this.last_opcode = parsedOpcode.opcode;
    }

    run = () => {
        while (!this.halted) {
            this.programStep();
        }
    }


    #parseOpcode = (fullOpcode) => {
        return {
            opcode: fullOpcode % 100,
            mode1: Math.floor(fullOpcode / 100) % 10,
            mode2: Math.floor(fullOpcode / 1000) % 10,
            mode3: Math.floor(fullOpcode / 10000) % 10
        }
    }


    #debug() {
        var fullOpcode = this.program[this.pc];
        var parsedOpcode = this.#parseOpcode(fullOpcode);

        var debugInfo = {
            code: this.program,
            pc: this.pc,
            fullOpcode: fullOpcode,
            parsedOpcode: parsedOpcode,
            amplifierIn: this.amplifierIn,
            amplifierOut: this.amplifierOut,
            halted: this.halted
        }

        console.log(debugInfo);
    }
}

module.exports = Amplifier;

