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
    var CB_CARD_DATA = [
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D,
        0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D,
        0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D,
        0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D,
        0x4E, 0x4F,
    ];
    var ORIGIN_CONFIG = {
        origin: {
            x: 550,
            y: 167
        },
        washOff: {
            x: 1,
            y: 1
        }
    };
    var PLAYER_HOLD = [{
            x: 284,
            y: 579,
            offX: 30
        }, {
            x: 1006,
            y: 167,
            offX: 0
        }, {
            x: 73,
            y: 167,
            offX: 0
        },];
    var MAX_PLAYER = 3;
    var GameView = /** @class */ (function (_super) {
        __extends(GameView, _super);
        function GameView() {
            var _this = _super.call(this) || this;
            _this._pokerVec = [];
            _this._players = [];
            _this.skinName = "GameSkin";
            _this.createPoker();
            _this.addToView();
            for (var n = 0; n < MAX_PLAYER; n++) {
                var player = new ddz.Player();
                player.index = n;
                _this._players.push(player);
            }
            return _this;
        }
        GameView.prototype.createPoker = function () {
            var _this = this;
            CB_CARD_DATA.forEach(function (data) {
                _this._pokerVec.push(new ddz.Poker(data));
            });
            this.washCards();
        };
        GameView.prototype.washCards = function () {
            var length = this._pokerVec.length, randomIndex, temp;
            while (length) {
                randomIndex = Math.floor(Math.random() * (length--));
                temp = this._pokerVec[randomIndex];
                this._pokerVec[randomIndex] = this._pokerVec[length];
                this._pokerVec[length] = temp;
            }
        };
        GameView.prototype.addToView = function () {
            var _this = this;
            this._pokerVec.forEach(function (poker, index) {
                poker.x = index * ORIGIN_CONFIG.washOff.x + ORIGIN_CONFIG.origin.x;
                poker.y = index * ORIGIN_CONFIG.washOff.y + ORIGIN_CONFIG.origin.y;
                _this.addChild(poker);
            });
        };
        GameView.prototype.dealCards = function () {
            var _this = this;
            var n = this._pokerVec.length - 1;
            var playerIndex = 0;
            var move = function (index) {
                var card = _this._pokerVec[index];
                var player = _this._players[(playerIndex++) % 3];
                _this.moveCardTo(card, player).call(function () {
                    _this["holder_container_" + player.index].addChild(card);
                    card.x = PLAYER_HOLD[player.index].offX * player.hold.length;
                    card.y = 0;
                    if (player.index == 0)
                        card.changeToFront();
                    if (index - 1 >= 0) {
                        move(index - 1);
                    }
                    else {
                        //重新排列手牌
                        _this._players[0].sortHold();
                        _this.holder_container_0.removeChildren();
                        _this._players[0].hold.forEach(function (poker, index) {
                            poker.x = PLAYER_HOLD[0].offX * (index + 1);
                            poker.y = 0;
                            _this.holder_container_0.addChild(poker);
                        });
                        _this.addEvent();
                    }
                });
            };
            move(n);
        };
        GameView.prototype.addEvent = function () {
            this._players[0].addEvent();
            this.holder_container_0.touchEnabled = true;
            this.holder_container_1.touchEnabled = true;
            this.holder_container_2.touchEnabled = true;
            this.holder_container_0.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchContainer, this, true);
            this.holder_container_0.addEventListener(egret.TouchEvent.TOUCH_END, this.touchContainer, this, true);
            this.holder_container_0.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchContainer, this, true);
            this.holder_container_0.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchContainer, this, true);
            // console.log(this.holder_container_0);
        };
        GameView.prototype.touchContainer = function (event) {
            console.log(event);
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    console.log("开始点击");
            }
        };
        GameView.prototype.moveCardTo = function (card, destination) {
            var back;
            var property = this.getProperties(destination.index);
            var to = {
                x: property.x + destination.hold.length * property.offX,
                y: property.y
            };
            destination.hold.push(card);
            back = egret.Tween.get(card).to(to, 60);
            return back;
        };
        //获得目的地的属性
        GameView.prototype.getProperties = function (index) {
            var back;
            back = PLAYER_HOLD[index];
            return back;
        };
        return GameView;
    }(eui.Component));
    ddz.GameView = GameView;
})(ddz || (ddz = {}));
