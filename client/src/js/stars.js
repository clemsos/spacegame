/*
* Helper to draw stars on a canvas background 
*
*/

function stars() {
  canvas = document.getElementById("can");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;  
    var height = canvas.height = window.innerHeight;  
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    starfield(width, height);
  }
}

// Create random stars with random velocity.
var starList = []
function starfield(w, h) {
  for (i = 0; i < 20; i++) {
    var star = {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      vx: Math.ceil(Math.random() * 10)
    };
    starList.push(star);
  }
}

function run() {
  // Register for the next frame
  window.requestAnimationFrame(run);
  
  var w = canvas.width = window.innerWidth;  
  var h = canvas.height = window.innerHeight;  

  // Reset the canvas
  ctx.fillStyle = "black";
  ctx.rect(0, 0, w, h);
  ctx.fill();
  
  // Update position and draw each star.
  var star;
  for(var i=0, j=starList.length; i<j; i++) {
    star = starList[i];
    star.x = star.x - star.vx;
    // Little bonus, also reset y and vx
    if(star.x < 0) {
      star.x = w;
      star.y = Math.floor(Math.random() * h);
      star.vx = Math.ceil(Math.random()*10);
    }
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(star.x, star.y, 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}

module.exports = {
  create : stars,
  run : run
}
