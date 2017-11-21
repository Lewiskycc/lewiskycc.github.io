/**
 * Created by user on 2016/06/24.
 */
//x y r fill  stroke strokeWidth opacity innerRadius outerRadius
//text fontSize fontFamily
function MyCircle(option){
    this._init(option);
}
MyCircle.prototype = {
    _init: function (option) {
        this.x = option.x;
        this.y = option.y;
        this.innerRadius = option.innerRadius;
        this.outerRadius = option.outerRadius;
        this.innerColor = option.innerColor;
        this.outerColor = option.outerColor;
        this.innerOpacity = option.innerOpacity;
        this.outerOpacity = option.outerOpacity;
        this.text = option.text;
        this.fontSize = option.fontSize;
        this.color= option.color;

        var _this = this;
        this.group = new Konva.Group({
            x: _this.x,
            y: _this.y
        });
        var ring = new Konva.Ring({
            x: 0,
            y: 0,
            innerRadius:  _this.innerRadius,
            outerRadius:  _this.outerRadius,
            fill: _this.outerColor,
            opacity: _this.outerOpacity
        });
        var circle = new Konva.Circle({
            x: 0,
            y: 0,
            radius: _this.innerRadius,
            fill: _this.innerColor,
            opacity: _this.innerOpacity
        });
        var text = new Konva.Text({
            x: 0 - _this.innerRadius,
            y: 0 - _this.fontSize/2,
            text: _this.text,
            fontSize: _this.fontSize,
            fontFamily: "Î¢ÈíÑÅºÚ",
            stroke: _this.color,
            strokeWidth: 1,
            width: 2*_this.innerRadius,
            align: "center"
        });
        this.group.add(ring);
        this.group.add(circle);
        this.group.add(text);
    },
    addToGroupOrLayer: function (groupOrLayer) {
        groupOrLayer.add(this.group);
    }
}
