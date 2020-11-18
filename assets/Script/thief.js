cc.Class({
    extends: cc.Component,

    properties: {
		canvas: {
			default: null,
			type: cc.Node
		}
    },

	event0: function (num) {
		var Ascript = this.canvas.getComponent("GameScene");
		Ascript.showText(num);
	},

});