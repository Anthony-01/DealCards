namespace ddz {
    export class Poker extends egret.Sprite {

        value: number;

        private _frontResource: string;
        private _backResource: string;

        private _img: egret.Bitmap;

        constructor(num: number) {
            super();
            this.value = num;
            this._frontResource = "poker" + "_" + this.getColor(num) + this.getValue(num).toString(16).toUpperCase();
            this._backResource = "poker_bg_2";
            this._img = new egret.Bitmap();
            this._img.texture = RES.getRes(this._frontResource);
            this.addChild(this._img);
            this.changeToBack();
        }

        private getColor(value: number): number {
            return value >> 4;
        }

        private getValue(value: number): number {
            return 0x0F & value;
        }

        changeToFront():void {
            this._img.texture = RES.getRes(this._frontResource);
        }

        changeToBack(): void {
            this._img.texture = RES.getRes(this._backResource);
        }

    }
}