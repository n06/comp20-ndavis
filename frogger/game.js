function start_game() {
        canvas = document.getElementById('game');
        // Check if canvas is supported on browser
        if (canvas.getContext) {
	           ctx = canvas.getContext('2d');
	           ctx.fillStyle = '#1A166D';
	           ctx.fillRect(0, 0, 399, 269);
	           ctx.fillStyle = '#000000';
	           ctx.fillRect(0, 269, 399, 300);
	           sprite = new Image();
	           sprite.src = 'assets/frogger_sprites.png';
	           ctx.drawImage(sprite, 14, 10, 322, 36, 38, 20, 322, 36);
	           ctx.drawImage(sprite, 0, 55, 398, 57, 0, 60, 398, 57);
	           ctx.drawImage(sprite, 0, 119, 398, 36, 0, 269, 398, 36);
	           ctx.drawImage(sprite, 0, 119, 398, 36, 0, 470, 398, 36);
	           ctx.drawImage(sprite, 12, 334, 17, 23, 5, 510, 19, 24);
	           ctx.drawImage(sprite, 12, 334, 17, 23, 25, 510, 19, 24);
	           ctx.drawImage(sprite, 12, 334, 17, 23, 45, 510, 19, 24);
	           ctx.drawImage(sprite, 6, 197, 118, 22, 60, 200, 118, 22);
	           ctx.drawImage(sprite, 8, 265, 31, 22, 45, 400, 31, 22);
	           ctx.drawImage(sprite, 45, 361, 24, 29, 125, 470, 24, 29);
	           ctx.fillStyle = '#00FF44';
	           ctx.font = "25px Arial";
	           ctx.fillText("Level 1", 80, 530);
	           ctx.font = "12px Arial";
	           ctx.fillText("Score: 60", 5, 560);
	           ctx.fillText("Highscore: 0", 80, 560);
	           
	           
	           
	       } else {
            alert('Sorry, canvas is not supported on your browser!');
        }
}