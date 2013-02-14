function draw() {
        canvas = document.getElementById('simple');
        // Check if canvas is supported on browser
        if (canvas.getContext) {
	           ctx = canvas.getContext('2d');
	           /*ctx.fillStyle = "rgb(0, 255, 0)";
	           ctx.fillRect (50, 50, 55, 50);
	           ctx.fillStyle = "rgb(255, 0, 0)";
	           ctx.strokeStyle = '#FF0000';
	           ctx.beginPath();
	           ctx.moveTo(25, 25);
	           ctx.lineTo(105, 25);
	           ctx.lineTo(25, 105);
	           ctx.lineTo(25, 25);
	           ctx.stroke();*/
	           board = new Image();
	           board.src = 'pacman10-hp-sprite.png';
	           mspacman = new Image();
	           mspacman.src = 'pacman10-hp-sprite.png';
	           ghost = new Image();
	           ghost.src = 'pacman10-hp-sprite.png';
	           ctx.drawImage(board, 322, 0, 464, 138, 0, 0, 464, 138);
	           ctx.drawImage(mspacman, 82, 24, 15, 15, 5, 10, 12, 12);
	           ctx.drawImage(ghost, 0, 161, 16, 16, 20, 8, 12, 12);
	           
	       } else {
            alert('Sorry, canvas is not supported on your browser!');
        }
}