class ColorManager {

    getList = () => {
        return [
            { "hex": "#FFFFFF" }, { "hex": "#FFFFF0" }, { "hex": "#F0E68C" },
            { "hex": "#FFFF00" }, { "hex": "#FFA500" }, { "hex": "#FF7F50" },
            { "hex": "#FF4500" }, { "hex": "#DC143C" }, { "hex": "#FFC0CB" },
            { "hex": "#BA55D3" }, { "hex": "#800080" }, { "hex": "#87CEFA" },
            { "hex": "#0000FF" }, { "hex": "#32CD32" }, { "hex": "#008000" },
            { "hex": "#A0522D" }, { "hex": "#800000" }
        ];
    };

    getListWithSelected = ( color ) => {
        let colors = this.getList();
        colors.forEach( el => {
            if( el.hex === color ) el.selected = true;
        });

        return colors;
    };
}

const colorManager = new ColorManager();
export default colorManager;
