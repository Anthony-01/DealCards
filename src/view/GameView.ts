namespace ddz {

    const CB_CARD_DATA = [
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D,  //方块 A - K
        0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D,  //梅花 A - K
        0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D,  //红桃 A - K
        0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D,  //黑桃 A - K
        0x4E, 0x4F,
    ];

    const ORIGIN_CONFIG = {
        origin: {
            x: 550,
            y: 167
        },
        washOff: {
            x: 1,
            y: 1
        }
    };

    const PLAYER_HOLD = [{
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

    const MAX_PLAYER = 3;

    export class GameView extends eui.Component {

        private _pokerVec: Poker[] = [];

        private _players: Player[] = [];

        public holder_container_0: eui.Group;
        public holder_container_1: eui.Group;
        public holder_container_2: eui.Group;


        constructor() {
            super();
            this.skinName = "GameSkin";
            this.createPoker();
            this.addToView();
            for (let n = 0; n < MAX_PLAYER; n++) {
                let player = new Player();
                player.index = n;
                this._players.push(player);
            }
        }

        private createPoker(): void {
            CB_CARD_DATA.forEach(data => {
                this._pokerVec.push(new Poker(data));
            });
            this.washCards();
        }

        private washCards(): void {
            let length = this._pokerVec.length,
                randomIndex,
                temp: Poker;
            while (length) {
                randomIndex = Math.floor(Math.random() * (length--));
                temp = this._pokerVec[randomIndex];
                this._pokerVec[randomIndex] = this._pokerVec[length];
                this._pokerVec[length] = temp;
            }
        }

        private addToView(): void {
            this._pokerVec.forEach((poker, index) => {
                poker.x = index * ORIGIN_CONFIG.washOff.x + ORIGIN_CONFIG.origin.x;
                poker.y = index * ORIGIN_CONFIG.washOff.y + ORIGIN_CONFIG.origin.y;
                this.addChild(poker);
            })
        }

        dealCards(): void {
            let n = this._pokerVec.length - 1;
            let playerIndex = 0;

            let move = (index: number) => {
                let card = this._pokerVec[index];
                let player = this._players[(playerIndex++) % 3];
                this.moveCardTo(card, player).call(() => {
                    this["holder_container_" + player.index].addChild(card);
                    card.x = PLAYER_HOLD[player.index].offX * player.hold.length;
                    card.y = 0;
                    if (player.index == 0) card.changeToFront();
                    if (index - 1 >= 0) {
                        move(index - 1);
                    } else {
                        //重新排列手牌
                        this._players[0].sortHold();
                        this.holder_container_0.removeChildren();
                        this._players[0].hold.forEach((poker, index) => {
                            poker.x = PLAYER_HOLD[0].offX * (index + 1);
                            poker.y = 0;
                            this.holder_container_0.addChild(poker);
                        });
                        this.addEvent();
                    }
                });
            };
            move(n);
        }

        private addEvent(): void {
            this._players[0].addEvent();
            this.holder_container_0.touchEnabled = true;
            this.holder_container_1.touchEnabled = true;
            this.holder_container_2.touchEnabled = true;
            this.holder_container_0.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchContainer, this, true);
            this.holder_container_0.addEventListener(egret.TouchEvent.TOUCH_END, this.touchContainer, this, true);
            this.holder_container_0.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchContainer, this, true);
            this.holder_container_0.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchContainer, this, true);
            // console.log(this.holder_container_0);
        }

        private _touchStart;


        private touchContainer(event: egret.TouchEvent): void {
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                case egret.TouchEvent.TOUCH_MOVE:

                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                case egret.TouchEvent.TOUCH_END:
                    break;
            }
        }

        private moveCardTo(card: Poker, destination: Player): egret.Tween {
            let back;
            let property = this.getProperties(destination.index);

            let to = {
                x: property.x + destination.hold.length * property.offX,
                y: property.y
            };

            destination.hold.push(card);
            back = egret.Tween.get(card).to(to, 60);
            return back;
        }

        //获得目的地的属性
        private getProperties(index: number): any {
            let back;
            back = PLAYER_HOLD[index];
            return back;
        }
    }
}