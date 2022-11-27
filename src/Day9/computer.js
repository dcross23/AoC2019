class Memory {
    constructor(program = []) {
        this.list = [...program];
    }

    get(index) {
        return this.list[index] || 0;
    }

    set(index, value) {
        this.list[index] = value;
    }
}

class Computer {

    constructor(program, debugActive = false) {
        this.program = new Memory(program);
        this.pc = 0;
        this.amplifierIn = [];
        this.amplifierOut = [];
        this.halted = false;
        this.last_opcode = 0;
        this.debugActive = debugActive;
        this.relativeBase = 0;
    }


    #getParamValue(param, mode) {
        var operand = this.program.get(this.pc + param);

        switch (mode) {
            case 0:
                return this.program.get(operand);
            case 1:
                return operand;
            case 2:
                return this.program.get(this.relativeBase + operand);
        }
    }

    programStep = () => {
        var fullOpcode = this.program.get(this.pc);
        var parsedOpcode = this.#parseOpcode(fullOpcode);

        if (this.debugActive)
            this.#debug();

        switch (parsedOpcode.opcode) {
            case 1:
                var in1 = this.#getParamValue(1, parsedOpcode.param1Mode);
                var in2 = this.#getParamValue(2, parsedOpcode.param2Mode);
                var out = this.#getParamValue(3, 1);
                if (parsedOpcode.param3Mode == 2)
                    out += this.relativeBase;

                this.program.set(out, in1 + in2);
                this.pc += 4;
                break;

            case 2:
                var in1 = this.#getParamValue(1, parsedOpcode.param1Mode);
                var in2 = this.#getParamValue(2, parsedOpcode.param2Mode);
                var out = this.#getParamValue(3, 1);
                if (parsedOpcode.param3Mode == 2)
                    out += this.relativeBase;

                this.program.set(out, in1 * in2);
                this.pc += 4;
                break;

            case 3:
                var inValue = this.amplifierIn.shift();
                var addr = this.#getParamValue(1, 1);
                if (parsedOpcode.param1Mode == 2)
                    addr += this.relativeBase;

                this.program.set(addr, inValue);
                this.pc += 2;
                break;

            case 4:
                var out = this.#getParamValue(1, parsedOpcode.param1Mode);
                this.amplifierOut.push(out);
                this.pc += 2;
                break;

            case 5:
                var in1 = this.#getParamValue(1, parsedOpcode.param1Mode);
                var in2 = this.#getParamValue(2, parsedOpcode.param2Mode);
                if (in1 != 0) this.pc = in2;
                else this.pc += 3;
                break;

            case 6:
                var in1 = this.#getParamValue(1, parsedOpcode.param1Mode);
                var in2 = this.#getParamValue(2, parsedOpcode.param2Mode);
                if (in1 == 0) this.pc = in2;
                else this.pc += 3;
                break;

            case 7:
                var in1 = this.#getParamValue(1, parsedOpcode.param1Mode);
                var in2 = this.#getParamValue(2, parsedOpcode.param2Mode);
                var out = this.#getParamValue(3, 1);
                if (parsedOpcode.param3Mode == 2)
                    out += this.relativeBase;

                this.program.set(out, (in1 < in2) ? 1 : 0);
                this.pc += 4;
                break;

            case 8:
                var in1 = this.#getParamValue(1, parsedOpcode.param1Mode);
                var in2 = this.#getParamValue(2, parsedOpcode.param2Mode);
                var out = this.#getParamValue(3, 1);
                if (parsedOpcode.param3Mode == 2)
                    out += this.relativeBase;

                this.program.set(out, (in1 == in2) ? 1 : 0);
                this.pc += 4;
                break;

            case 9:
                var in1 = this.#getParamValue(1, parsedOpcode.param1Mode);
                this.relativeBase += in1;
                this.pc += 2;
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
            param1Mode: Math.floor(fullOpcode / 100) % 10,
            param2Mode: Math.floor(fullOpcode / 1000) % 10,
            param3Mode: Math.floor(fullOpcode / 10000) % 10
        }
    }


    #debug() {

        var fullOpcode = this.program.get(this.pc);
        var parsedOpcode = this.#parseOpcode(fullOpcode);

        var debugInfo = {
            code: this.program.list,
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

module.exports = Computer;

