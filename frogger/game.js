$(document).ready(function() {

	board = {
		maxDepth: 0,
		frogsSaved: 0,
		lives: 5,
		level: 1,
		fps: 30,
		time: 70000,
		score: 0,
		freq: 2,
		speed: 1,
		ten_thou: 0,
		slots: [
			{lo: 8, hi: 45, filled: 0},
			{lo: 95, hi: 130, filled: 0},
			{lo: 180, hi: 215, filled: 0},
			{lo: 263, hi: 301, filled: 0},
			{lo: 346, hi: 385, filled: 0}
		],
		deadFrog: 'assets/dead_frog.png',
		cars:[
			{
				x: 40,
				y: 260,
				width: 35,
				alley: 465
			},
			{
				x:40,
				y: 295,
				width: 35,
				alley: 435
			},
			{
				x: 101,
				y: 289,
				width: 55,
				alley: 405
			},
			{
				x: 40,
				y: 260,
				width: 35,
				alley: 375
			},
			{
				x:40,
				y: 295,
				width: 30,
				alley: 345
			},
			{
				x: 101,
				y: 289,
				width: 55,
				alley: 315
			},
			{
				x:40,
				y: 295,
				width: 30,
				alley: 345
			},
		],
		logs: [
		{
			x: 126,
			y: 192,
			width: 125,
			alley: 105
		},
		{
			x: 185,
			y: 165,
			width: 185,
			alley: 135
		},
		{
			x: 126,
			y: 192,
			width: 125,
			alley: 165
		},
		{
			x: 185,
			y: 165,
			width: 185,
			alley: 195
		},
		{
			x: 126,
			y: 192,
			width: 125,
			alley: 225
		},
		{
			x: 126,
			y: 192,
			width: 125,
			alley: 255
		}
		],
		fly: {speed: 1, time: 200, inc: 7, gotten: false},
		init: function() {
			this.fly.count = 0;
			this.fly.prob = 0;
			this.fly.xPos = 0;
			this.fly.yPos = 0;
			this.frog = {
				x: 185,
				y: 495,
				sprite: {
					x: 13,
					y: 367
				}
			}

			for (var i in this.logs){
				this.logs[i].offset =  Math.ceil(Math.random() * 2);
				this.logs[i].pos = Math.ceil(Math.random() * 300);
			}
			for (var j in this.cars) {
				this.cars[j].pos = Math.ceil(Math.random() * 300);
				this.cars[j].offset =  Math.ceil(Math.random() * 4);
			}

			var canvas = document.getElementById('game');
			var ctx = canvas.getContext('2d');
			this.canvas = canvas;
			this.ctx = ctx;
			var sprite = new Image();
	  		sprite.src = 'assets/frogger_sprites.png';
	  		this.sprite = sprite;
	  		var that = this;
	  		sprite.onload = function(){
	  			that.draw();
	  		};
	  		return this;
		},
		clear: function() { 
			this.canvas.width = this.canvas.width;
	  		return this;
		},
		drawBg: function() {
			this.clear();
			var ctx = this.ctx;
			//draw water
	  		ctx.fillStyle = "#191970";
	  		ctx.fillRect(0,0,399,282);
	  		//draw logo and landing zone
			ctx.drawImage(this.sprite,0,0,399,118,0,0,399,118);
	  		//draw asphalt
	  		ctx.fillStyle = "#000";
	  		ctx.fillRect(0,279,399,292);
	  		ctx.fillStyle = "rgb(0,255,0)";
	  		ctx.font = "bold 28px Calibri";
	  		ctx.fillText("Level " + this.level , 100, 545);
	  		ctx.font = "bold 14px Calibri";
	  		ctx.fillText("Score: " + this.score, 0, 560);
	  		ctx.fillText("HighScore: 0 ",100, 560);
	  		ctx.fillText("Time remaining: " + Math.ceil(this.time / 1000),200, 560);
	  		return this;
		},
		draw: function() {
			if (this.time <= 0) {
				this.die();
			}
			this.drawBg();
			this.time -= this.fps;
			this.moveObjects();
			this.checkColissions();
			var ctx = this.ctx;
			var sprite = this.sprite;
			for (var i in this.logs)
    			ctx.drawImage(sprite, 0, this.logs[i].y, this.logs[i].width, 30, this.logs[i].pos, this.logs[i].alley, this.logs[i].width, 30 );
	  		//bank
	  		ctx.drawImage(sprite, 0, 110, 399, 45, 0, 270, 399, 45);
	  		//bank
	  		ctx.drawImage(sprite, 0, 110, 399, 45, 0, 480, 399, 45);
	  		//draw frog
    		ctx.drawImage(this.sprite,this.frog.sprite.x,this.frog.sprite.y,21,21,this.frog.x, this.frog.y, 21,21);
	
    		for (var i in this.cars){
				var car = this.cars[i];
    			ctx.drawImage(sprite, car.x, car.y, car.width, 30, car.pos, car.alley, car.width, 30 );
    		}
    		for (var j = 0; j < this.lives; j++)
	  			ctx.drawImage(sprite, 10, 335, 30, 30, 30*j, 525, 30, 30);
	  		var total = 0;
	  		for (var f in this.slots){
	  			var dSprite = {x: 81, y: 367};
	  			if (this.slots[f].filled){
	  				ctx.drawImage(this.sprite,dSprite.x,dSprite.y,21,21,this.slots[f].lo+5,75, 21,21);
	  				total++;
	  			}
	  		}
	  		this.drawFly();
	  		if (total == 5)
	  			this.levelUp();

	  		//fix this
	  		if (this.lives < 4 && this.score >= 10000)
	  			this.lives++;
	  		return this;

		},
		moveObjects: function() {
			var spd = this.speed;
			for (var i in this.logs){
				var log = this.logs[i];
				if (i % this.freq)
					log.pos += spd + log.offset;
				else 
					log.pos -= spd + log.offset;

				if (log.pos >= this.canvas.width + log.width)
					log.pos = -log.width;
				else if (log.pos < -log.width)
					log.pos = this.canvas.width;
			}	
			for (var i in this.cars){
				var car = this.cars[i];
				if (i % this.freq)
					car.pos += spd + car.offset;
				else 
					car.pos -= spd + car.offset;
				if (car.pos >= this.canvas.width + car.width)
			  		car.pos = -car.width;
				else if(car.pos < -car.width)
					car.pos = this.canvas.width;
			}
	  		return this;
		},	
		moveFrog: function(dir) {
			var dirFun = {
				left: this.moveL, 
				right: this.moveR,
				up: this.moveU,
				down: this.moveD
			};
			dirFun[dir](this);
	  		return this;
		},
		moveL: function(that) {
			if (!that.checkBounds(that.frog.x - 28, that.frog.y))
				return;
			var lSprite = {x: 81, y: 334};
			that.frog.sprite = lSprite;
			that.frog.x -= 28;
	  		return this;
		},
		moveR: function(that) {
			if (!that.checkBounds(that.frog.x + 28, that.frog.y))
				return;
			var rSprite = {x: 13, y: 334};
			that.frog.x += 28;
			that.frog.sprite = rSprite;
	  		return this;
		},
		moveU: function(that) {
			if (!that.checkBounds(that.frog.x, that.frog.y - 30))
				return;
			that.score += 10;
			var uSprite = {x: 13 , y: 367};
			that.frog.sprite = uSprite;
			that.frog.y-=30;				
		},
		moveD: function(that) {
			if (!that.checkBounds(that.frog.x, that.frog.y + 30))
				return;
			that.score -= 10;
			var dSprite = {x: 81, y: 367};
			that.frog.sprite = dSprite;
			that.frog.y+=30;
	  		return this;
		},
		checkBounds: function(x,y) {
			var w = this.canvas.width;
			var h = this.canvas.height;
			return (x > w || x < -10 || y > h - 60|| y < 50) ? false : true;
		},
		checkColissions: function() {
			if (this.checkWin())
				return false;
			var frog = this.frog;
			if (frog.y > 270){
				for (var i in this.cars){
					var car = this.cars[i];
					if (frog.x >= car.pos && frog.x <= car.pos+car.width && frog.y == car.alley)
						this.die();
				}
			}
			else {
				var flag = false;
				for (var i in this.logs){
					var log = this.logs[i];
					if ((frog.x > log.pos || frog.x + 6 > log.pos) && frog.x < log.pos+log.width && frog.y == log.alley){
						flag = true
						if ( i % this.freq)
							frog.x += this.speed + log.offset;
						else 
							frog.x -= this.speed + log.offset;
					}
				}
				if (!flag) this.die();
			}
				
			if ((frog.x >= this.fly.xPos || frog.x + 6 > this.fly.xPos) && frog.x <= this.fly.xPos+30 && frog.y == this.fly.yPos){
				this.score += 200;
				this.fly.gotten = true;
				this.fly.xPos = 0;
				this.fly.yPos = 0;
				this.fly.count = this.fly.time + 1;
			}
			return this;
		},
		die: function() {
			console.log(this.cars);
			window.clearInterval(drawLoop);
			this.clear();
			var that = this;
			this.time = 50000 - (this.level - 1 * 20);
			var dead = new Image();
			dead.src = this.deadFrog;
			dead.onload = function() {
				that.ctx.drawImage(this,0,0,28,29,that.frog.x-3,that.frog.y-30,28,29);
			}
			setTimeout(function() {
				that.lives--;
				if (!that.lives){
					$("body").append("<div class='ui-dialog' onclick='document.location.reload(true)'>GAME OVER. Play again!<br />Score: " + that.score + "</div>");
					$("canvas").fadeOut();
				}
				that.clear().init();
				drawLoop = window.setInterval(function() {
					that.draw();
				}, board.fps);
			}, 2000);
		},
		checkWin: function() {
			var x = this.frog.x;
			var y = this.frog.y;
			if (y == 75){
				for (var i in this.slots){
					if (x <= this.slots[i].hi && x >= this.slots[i].lo && !this.slots[i].filled){
						this.slots[i].filled = true;
						this.init();
						this.score+=50;
						return true;
					}
				}
				return this;
			}
		},
		levelUp: function() {
			this.level++;
			if (this.level > 10)
				this.fps -=2;
			if (this.level > 5)
				this.freq++;
			this.speed++;
			this.score += 1000;
			this.fly.speed++;
			this.fly.length -= 6;
			this.fly.gotten = false;
			this.time = 70000 - ((this.level - 1) * 1000);
			if (!(this.level % 4)){
				this.fly.inc--;
				this.cars.push({
					x: 40,
					y: 260,
					width: 35,
					alley: board.pickAlley("road","evens"),
					pos: 40
				});
			}
			for (var i in this.slots)
				this.slots[i].filled = false;
			window.clearInterval(drawLoop);
			$("body").append("<div class='ui-dialog'>Level " + this.level + "</div>");
			$(".ui-dialog").delay(700).fadeOut(300, function() {
				$(this).remove();
			})
			setTimeout(function() {
				board.init();
				drawLoop = window.setInterval(function() {
					board.draw();
				}, board.fps);
			}, 1000);
		},
		pickAlley: function(range, even) {
			var alleys = [495,465,435,405,375,345,315,285,255,225,195,165,135];
			if (range == 'water')
				alleys = [315,285,255,225,195,165,135];
			else if (range == 'road')
				alleys = [495,465,435,405,375,345];
			
			if (even == "evens"){
				var num = Math.ceil(Math.random() * 299 + 100) % 12;
				while (num % 2)
					num = Math.ceil(Math.random() * 299 + 100) % 12;
				return alleys[num];
			}
			 
			return alleys[Math.ceil(Math.random() * 299 + 100) % 12];
		},
		drawFly: function() {
			var fly = this.fly;
			if (fly.gotten)
				return this;
			if (!fly.count){
   				fly.prob = Math.ceil(Math.random() * 1200);
   				fly.xPos = Math.ceil(Math.random() * 399);
   				fly.yPos = this.pickAlley(null); 
   			}
   			else if (fly.count > fly.time){
   				fly.count = 0;
   				fly.prob = 0;
   				fly.xPos = 0;
   				fly.yPos = 0;
   			}
   			if (fly.prob > 0 && fly.prob < fly.inc){
   				//draw fly
   				if (this.time % 2)
   					fly.xPos -= fly.speed;
   				else fly.xPos += fly.speed; 
	  			this.ctx.drawImage(this.sprite, 137, 231, 20, 20, fly.xPos, fly.yPos, 20, 20);
	  			fly.count++;
	  		}
	  		return this;
		}
	};

	drawLoop = window.setInterval(function() {
		board.draw();
	}, board.fps);

	board.init();

}).on("keydown", function(e) {
	if (e.keyCode == 37)
		board.moveFrog("left");
	if (e.keyCode == 39)
		board.moveFrog("right");
	if (e.keyCode == 38)
		board.moveFrog("up");
	if (e.keyCode == 40)
		board.moveFrog("down");

});
