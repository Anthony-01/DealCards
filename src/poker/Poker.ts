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
            this._mask = new egret.Shape();
            this._mask.graphics.beginFill( 0x000000, 0.6);
            this._mask.graphics.drawRect( 0, 0, 102, 137 );
            this._mask.graphics.endFill();
            this._mask.name = "mask";
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

        private outStatus:boolean = false;        

        toggleSelected(): void {
            this.outStatus = !this.outStatus;
            if (this.outStatus) {
                this._img.y -= 10;
            } else {
                this._img.y += 10;
            }
        }

        m_lock: boolean = false;

        private _mask: egret.Shape;


        addMask(): void {
            //增加
            if(this.getChildByName("mask")) {

            } else {
                this._mask.y = this._img.y;
                this.addChild(this._mask);
            }
        }

        removeMask(): void {
            if(this.getChildByName("mask")) {
                this.removeChild(this._mask);
            } else {

            }
        }

    }
}