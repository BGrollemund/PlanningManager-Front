class ColorUtils {

    /**
     * Get an array of color in "react-circle-color-picker" format
     *
     * @return {({hex: string}|{hex: string}|{hex: string}|{hex: string}|{hex: string})[]}
     */
    getList = () => {
        return [
            { "hex": "#FFFFFF" }, { "hex": "#FFFFF0" }, { "hex": "#F0E68C" },
            { "hex": "#FFFF00" }, { "hex": "#FFA500" }, { "hex": "#FF7F50" },
            { "hex": "#FF4500" }, { "hex": "#DC143C" }, { "hex": "#FFC0CB" },
            { "hex": "#BA55D3" }, { "hex": "#B500B5" }, { "hex": "#87CEFA" },
            { "hex": "#374CFF" }, { "hex": "#32CD32" }, { "hex": "#00A200" },
            { "hex": "#A0522D" }, { "hex": "#800000" }
        ];
    };

    /**
     * Get an array of color in "react-circle-color-picker" format with color selected
     *
     * @param color
     * @return {{hex: string}[]}
     */
    getListWithSelected = ( color ) => {
        let colors = this.getList();
        colors.forEach( el => {
            if( el.hex === color ) el.selected = true;
        });

        return colors;
    };
}

const colorUtils = new ColorUtils();
export default colorUtils;
