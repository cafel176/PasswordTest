cc.Class({
	extends: cc.Component,

	properties: {
		canvas: {
			default: null,
			type: cc.Node
		}
	},

	event0: function () {
		var Ascript = this.canvas.getComponent("GameScene");
		Ascript.score5();
	}

});