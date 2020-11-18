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
		Ascript.changeTextPanel(num);
	},

	event1: function () {
		var Ascript = this.canvas.getComponent("GameScene");
		Ascript.thiefStart();
	}

});