var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ddz;
(function (ddz) {
    var Poker = /** @class */ (function (_super) {
        __extends(Poker, _super);
        function Poker(num) {
            var _this = _super.call(this) || this;
            _this.value = num;
            _this._frontResource = "poker" + "_" + _this.getColor(num) + _this.getValue(num).toString(16).toUpperCase();
            _this._backResource = "poker_bg_2";
            _this._img = new egret.Bitmap();
            _this._img.texture = RES.getRes(_this._frontResource);
            _this.addChild(_this._img);
            _this.changeToBack();
            return _this;
        }
        Poker.prototype.getColor = function (value) {
            return value >> 4;
        };
        Poker.prototype.getValue = function (value) {
            return 0x0F & value;
        };
        Poker.prototype.changeToFront = function () {
            this._img.texture = RES.getRes(this._frontResource);
        };
        Poker.prototype.changeToBack = function () {
            this._img.texture = RES.getRes(this._backResource);
        };
        return Poker;
    }(egret.Sprite));
    ddz.Poker = Poker;
})(ddz || (ddz = {}));
