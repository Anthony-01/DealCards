var ddz;
(function (ddz) {
    var Player = /** @class */ (function () {
        function Player() {
            //手牌
            this.hold = [];
        }
        //根据手牌的牌值排列手牌
        Player.prototype.sortHold = function () {
            //冒泡排序
            for (var n = 0; n < this.hold.length - 1; n++) {
                for (var m = n + 1; m < this.hold.length; m++) {
                    if (!this.compareValue(this.hold[n].value, this.hold[m].value)) {
                        var poker = this.hold[n];
                        this.hold[n] = this.hold[m];
                        this.hold[m] = poker;
                    }
                }
            }
            // console.log(this.hold);
        };
        //
        Player.prototype.addEvent = function () {
        };
        Player.prototype.compareValue = function (value1, value2) {
            // console.log(0x0F & value1);
            var _a = [this.getLogicValue(0x0F & value1), this.getLogicValue(0x0F & value2)], val1 = _a[0], val2 = _a[1];
            var _b = [value1 >> 4, value2 >> 4], color1 = _b[0], color2 = _b[1];
            if (val1 > val2) {
                return true;
            }
            else if (val1 == val2) {
                if (color1 > color2) {
                    return true;
                }
            }
            return false;
        };
        Player.prototype.getLogicValue = function (value) {
            var back = value;
            if (value > 13) {
                back = value + 4;
            }
            if (value == 1) {
                back = 14;
            }
            if (value == 2) {
                back = 16;
            }
            return back;
        };
        return Player;
    }());
    ddz.Player = Player;
})(ddz || (ddz = {}));
