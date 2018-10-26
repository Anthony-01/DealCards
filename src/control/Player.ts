namespace ddz {
    export class Player {

        //手牌
        hold: Poker[] = [];

        //座位号
        index: number;

        //根据手牌的牌值排列手牌
        sortHold(): void {
            //冒泡排序
            for (let n = 0; n < this.hold.length - 1; n++) {
                for (let m = n + 1; m < this.hold.length; m++) {
                    if (!this.compareValue(this.hold[n].value,this.hold[m].value)) {
                        let poker:Poker = this.hold[n];
                        this.hold[n] = this.hold[m];
                        this.hold[m] = poker;
                    }
                }
            }
            // console.log(this.hold);
        }

        //
        addEvent(): void {
            let hold = this.hold;
        }

        private compareValue(value1: number, value2: number): boolean {
            // console.log(0x0F & value1);
            let [val1, val2] = [this.getLogicValue(0x0F & value1), this.getLogicValue(0x0F & value2)] ;
            let [color1, color2] = [value1 >> 4, value2 >> 4];
            if (val1 > val2) {
                return true;
            } else if (val1 == val2) {
                if (color1 > color2) {
                    return true
                }
            }
            return false;
        }

        private getLogicValue(value: number): number {
            let back = value;
            if(value > 13) {
                back = value + 4;
            }
            if(value == 1) {
                back = 14;
            }
            if(value == 2) {
                back = 16;
            }
            return back;
        }

    }
}