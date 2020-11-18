
cc.Class({
    extends: cc.Component,

	properties: {
		ALabel: {
			default: null,
			type: cc.Label
		},

		System: {
			default: null,
			type: cc.Node
		}
    },

	ShowText: function (text) {
		this.ALabel.string = "";
		var talkArray = text.split("");
		var talkText = "";

		this.schedule(function () {
			talkText += talkArray.shift();
			this.ALabel.string = talkText;
			if (talkArray.length <= 0) {
				var sys = this.System.getComponent("GameScene");
				sys.endGame();
			}
		}, 0.1, (talkArray.length-1));
	},
});
