// 

cc.Class({
    extends: cc.Component,

	properties: {
		AText: "",		//密码文字内容

		Audio: {//音效播放，0为语音
			default: [],
			url: [cc.AudioClip]
		},

		mainBackground: {//主界面
			default: null,
			type: cc.Node
		},

		startBtn: {//开始游戏按钮
			default: null,
			type: cc.Node
		},

		restartBtn: {//重新开始按钮
			default: null,
			type: cc.Node
		},

		gameBackground: {//游戏界面
			default: null,
			type: cc.Node
		},

		startTestBtn: {//开始测试UI
			default: null,
			type: cc.Node
		},

		Alabel: {//文字显示屏
			default: null,
			type: cc.Label
		},

		Box: {//保险箱
			default: null,
			type: cc.Node
		},

		keyBoard: {//输入密码面板
			default: null,
			type: cc.Node
		},

		thief: {//小偷
			default: null,
			type: cc.Node
		},

		textPanel: {//文字框
			default: null,
			type: cc.Node
		},

		background: {//背景
			default: null,
			type: cc.Node
		},

		clock: {//钟
			default: null,
			type: cc.Node
		},

		clockMask: {//钟
			default: null,
			type: cc.Node
		}
    },

	onLoad() {
		var aaa = this.mainBackground.getComponent(cc.Animation);
		cc.loader.loadRes("anima/startGame", function (err, clip) {
			aaa.addClip(clip, "startGame");
			aaa.play("startGame");
		});
	},

	showStartBtn: function () {//动画startGame结束后，让开始按钮可见
		this.background.active = true;
		this.startBtn.active = true;
		cc.loader.releaseRes("anima/startGame");
		var aaa = this.Box.getComponent(cc.Animation);
		cc.loader.loadRes("anima/openBox", function (err, clip) {
			aaa.addClip(clip, "openBox");
		});
	},

	//开始游戏
	startGame: function () {
		this.mainBackground.active = false;
		this.gameBackground.active = true;
		var BoxAnima = this.Box.getComponent(cc.Animation);
		BoxAnima.play("openBox");
	},

	//显示或隐藏密码面板
	changeTextPanel: function (show) {//box打开动画结束后，让密码面板可见
		this.keyBoard.active = true;
		var keyanim = this.keyBoard.getComponent(cc.Animation);
		var ani = keyanim.getClips();
		keyanim.play(ani[show].name); 
	},

	//输入密码
	addText: function (event, customEventData) {//button的使用方法!	
		this.AText += customEventData;
		this.Alabel.string = this.AText;
	},

	//回退
	sliceText: function () {
		this.AText = this.AText.slice(0, this.AText.length - 1);
		this.Alabel.string = this.AText;//记得this，没有this则代表新建变量!
	},

	//语音播报
	read: function () {
		cc.audioEngine.playEffect(this.Audio[0], false);
	},

	//用户提交密码
	submit: function () {
		var aaa = this.Box.getComponent(cc.Animation);
		cc.loader.loadRes("anima/closeBox", function (err, clip) {
			aaa.addClip(clip, "closeBox");
		});
		cc.loader.releaseRes("anima/openBox");
		this.changeTextPanel(1);
		this.startTestBtn.active = true;
	},

	//测试密码强度
	Test: function (text) {
		var score = 0;
		if (text.length < 4)
			score = 0;
		else {
			if (text.length > 6)//密码在6位以上
				score++;

			var num = /[0-9]/;
			if (num.test(text)) {
				var char = /[A-Z]/;
				if (char.test(text))//密码有数字+字母
					score++;
				var spe = /[*&#$]/;
				if (spe.test(text))//密码有数字+符号
					score++;
			}

			var num2 = /012|123|234|345|456|567|678|789/;//没有连续3个数字出现
			if (!num2.test(text))
				score++;
			var char2 = /ABC|BCD|CDE|DEF|EFG|FGH|GHI|HIJ|IJK|JKL|KLM|LMN|MNO|NOP|OPQ|PQR|QRS|RST|STU|TUV|UVW|VWX|WXY|XYZ/;//没有连续3个字母出现
			if (!char2.test(text))
				score++;
		}
		return score;
	},

	startTest: function () {//开始测试
		this.startTestBtn.active = false;
		var BoxAnima = this.Box.getComponent(cc.Animation);
		BoxAnima.play("closeBox");
	},

	thiefStart: function () {
		cc.loader.releaseRes("anima/closeBox");
		var tp = this.Test(this.AText);

		if (tp >= 5) {
			var ppp = this.mainBackground.getComponent(cc.Animation);
			cc.loader.loadRes("anima/endGame", function (err, clip) {
				ppp.addClip(clip, "endGame");
			});
		}
		var aaa = this.thief.getComponent(cc.Animation);
		cc.loader.loadRes(("anima/thief" + tp.toString()), function (err, clip) {
			aaa.addClip(clip, ("thief" + tp.toString()));
			aaa.play("thief" + tp.toString());
		});
	},

	showText: function (num) {//小偷动画结束后调用
		if (num < 5) {
			this.textPanel.active = true;
			var t = this.textPanel.getComponent("textPanel");
		}
		console.log(num);
		switch (num) {
			case 0: t.ShowText(this.AText+" 这密码也太简单了，好好看看密码安全提示吧!"); break;
			case 1: t.ShowText("有点密码的样子，但还是难不倒我，密码是：" + this.AText+"没错吧？"); break;
			case 2: t.ShowText(this.AText +" 这个密码有点难，设定这个密码的人一定是个聪明人"); break;
			case 3: t.ShowText("花了一番功夫，最终还是我赢了，密码是：" + this.AText + "没问题吧？"); break;
			case 4: t.ShowText("你真厉害，差一点你就赢了，密码是：" + this.AText); break;
			case 5: this.clockMask.active = true;
				this.mainBackground.active = false;
				var clockAnima = this.clock.getComponent(cc.Animation);
				var ani = clockAnima.getClips();
				clockAnima.play(ani[0].name);
				break;
			default: t.ShowText(this.AText + " 这密码也太简单了，好好看看密码安全提示吧!"); break;			
		}
	},

	endGame: function () {
		this.restartBtn.active = true;
	},

	score5: function () {
		this.mainBackground.active = true;
		this.startBtn.active = false;
		var MainAnima = this.mainBackground.getComponent(cc.Animation);
		MainAnima.play("endGame");
	},

	fff: function () {
		this.textPanel.active = true;
		var t = this.textPanel.getComponent("textPanel");
		t.ShowText("你真棒，这么厉害的密码，谁也打不开保险柜！ " + this.AText);
	},

	reStart: function () {
		cc.loader.releaseAll();
		cc.director.loadScene("GameScene");
	}
});
