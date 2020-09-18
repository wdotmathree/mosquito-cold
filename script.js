function println(c) {
  console.log(c);
}

var w,
  a,
  d,
  up,
  left,
  right,
  space,
  wf = false,
  af = false,
  df = false,
  upf = false,
  leftf = false,
  rightf = false,
  spacef = false,
  repeatSpeed = 30,
  walkSpeed,
  sprintSpeed,
  shiftKey;

function interpreter(e) {
  // var sound = new Sound(
  //   "https://cdn.glitch.com/ea12a708-fe8c-4d9d-b63b-0601e81995c9%2Fjump.mp3?v=1581905143382"
  // );
  shiftKey = e.shiftKey;
  switch (e.code) {
    case "Escape":
      cancelFullscreen();
      break;
    case "KeyW":
      if (!wf) {
        wf = true;
        w = setInterval(function() {
          jump();
        }, repeatSpeed);
      }
      break;
    case "ArrowUp":
      if (!upf) {
        upf = true;
        up = setInterval(function() {
          jump();
        }, repeatSpeed);
      }
      break;
    case "KeyD":
      if (!df) {
        df = true;
        d = setInterval(function() {
          if (!shiftKey) {
            moveAll(-walkSpeed, 0, "back");
            moveAll(-walkSpeed, 0, "special");
            moveAll(-walkSpeed, 0, "fore");
          } else {
            moveAll(-sprintSpeed, 0, "back");
            moveAll(-sprintSpeed, 0, "special");
            moveAll(-sprintSpeed, 0, "fore");
          }
          walkRight();
        }, repeatSpeed);
      }
      break;
    case "ArrowRight":
      if (!rightf) {
        rightf = true;
        right = setInterval(function() {
          if (!shiftKey) {
            moveAll(-walkSpeed, 0, "back");
            moveAll(-walkSpeed, 0, "special");
            moveAll(-walkSpeed, 0, "fore");
          } else {
            moveAll(-sprintSpeed, 0, "back");
            moveAll(-sprintSpeed, 0, "special");
            moveAll(-sprintSpeed, 0, "fore");
          }
          walkRight();
        }, repeatSpeed);
      }
      break;
    case "KeyA":
      if (!af) {
        af = true;
        a = setInterval(function() {
          if (!shiftKey) {
            moveAll(walkSpeed, 0, "back");
            moveAll(walkSpeed, 0, "special");
            moveAll(walkSpeed, 0, "fore");
          } else {
            moveAll(sprintSpeed, 0, "back");
            moveAll(sprintSpeed, 0, "special");
            moveAll(sprintSpeed, 0, "fore");
          }
          walkLeft();
        }, repeatSpeed);
      }
      break;
    case "ArrowLeft":
      if (!leftf) {
        leftf = true;
        left = setInterval(function() {
          if (!shiftKey) {
            moveAll(walkSpeed, 0, "back");
            moveAll(walkSpeed, 0, "special");
            moveAll(walkSpeed, 0, "fore");
          } else {
            moveAll(sprintSpeed, 0, "back");
            moveAll(sprintSpeed, 0, "special");
            moveAll(sprintSpeed, 0, "fore");
          }
          walkLeft();
        }, repeatSpeed);
      }
      break;
    case "Space":
      println("screet");

      var glarp = new Circle(20);
      if (player.facing() == "right") {
        glarp.setPosition(player.getX() + player.size[0], player.getY() + 50);
      } else {
        glarp.setPosition(player.getX(), player.getY() + 50);
      }
      add(glarp, "fore");
      //welp
      //i have to go to do math
      //bai
      break;
  }
}

function upInterpreter(e) {
  shiftKey = e.shiftKey;
  switch (e.code) {
    case "KeyW":
      wf = false;
      clearInterval(w);
      break;
    case "ArrowUp":
      upf = false;
      clearInterval(up);
      break;
    case "KeyD":
      df = false;
      clearInterval(d);
      break;
    case "ArrowRight":
      rightf = false;
      clearInterval(right);
      break;
    case "KeyA":
      af = false;
      clearInterval(a);
      break;
    case "ArrowLeft":
      leftf = false;
      clearInterval(left);
      break;
  }
}

function getWidth() {
  return Math.round(screen.width * 1.6);
}

function getHeight() {
  return Math.round(screen.height * 1.6);
}

function readLine(text) {
  return String(prompt(text));
}

function readInt(text, min = -Infinity, max = Infinity) {
  var selection;
  do {
    selection = parseInt(prompt(text), 10);
  } while (isNaN(selection) || selection > max || selection < min);
  return Number(selection);
}

function readFloat(text, min = -Infinity, max = Infinity) {
  var selection;
  do {
    selection = prompt(text);
  } while (isNaN(selection) || selection > max || selection < min);
  return Number(selection);
}

function setTimer(func, interval) {
  setInterval(func, interval);
}

function stopTimer() {
  clearInterval();
}

function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  };
  this.loop = function() {
    this.sound.setAttribute("loop", "true");
  };
  this.stopLoop = function() {
    this.sound.setAttribute("loop", "false");
  };
  this.stop = function() {
    this.sound.pause();
  };
}

function speak(text) {
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

var Color = {
  red: "red",
  green: "green",
  blue: "blue",
  cyan: "cyan",
  magenta: "magenta",
  yellow: "yellow",
  brown: "brown",
  black: "black"
};

function Player(w, h, src) {
  this.type = "player";
  this.canvas = "normal";
  this.src = src;
  this.width = w;
  this.height = h;
  this.x = 0;
  this.y = 0;
  this.getType = () => {
    return this.type;
  };
  this.getX = () => {
    return Number(this.x);
  };
  this.getY = () => {
    return Number(this.y);
  };
  this.getWidth = () => {
    return this.width;
  };
  this.getHeight = () => {
    return this.height;
  };
  this.move = (dx, dy) => {
    remove(this);
    this.x += dx;
    this.y += dy;
    add(this);
  };
  this.facing = () => {
    let facing;
    var src = this.src.id;
    if (src == "one" || src == "two" || src == "three") {
      facing = "right";
    } else {
      facing = "left";
    }
    return facing;
  };
  this.setPosition = (x, y) => {
    this.x = x;
    this.y = y;
  };
}

function Rectangle(w, h) {
  this.type = "rectangle";
  this.canvas = "normal";
  this.color = "black";
  this.width = w;
  this.height = h;
  this.x = 0;
  this.y = 0;
  this.stroke = false;
  this.getType = () => {
    return this.type;
  };
  this.getX = () => {
    return this.x;
  };
  this.getY = () => {
    return this.y;
  };
  this.getWidth = () => {
    return this.width;
  };
  this.getHeight = () => {
    return this.height;
  };
  this.move = (dx, dy) => {
    remove(this);
    this.x += dx;
    this.y += dy;
    add(this);
  };
  this.setPosition = (x, y) => {
    this.x = x;
    this.y = y;
  };
  this.setColor = color => {
    this.color = color;
  };
  this.setStroke = () => {
    this.stroke = true;
  };
  this.setFill = () => {
    this.stroke = false;
  };
}

function Circle(r) {
  this.type = "circle";
  this.canvas = "normal";
  this.fillStyle = "black";
  this.radius = r;
  this.x = 0;
  this.y = 0;
  this.stroke = false;
  this.getType = () => {
    return this.type;
  };
  this.getX = () => {
    return this.x;
  };
  this.getY = () => {
    return this.y;
  };
  this.move = (dx, dy) => {
    remove(this);
    this.position[0] += dx;
    this.position[1] += dy;
    add(this);
  };
  this.setPosition = (x, y) => {
    this.position = [x, y];
  };
  this.setColor = color => {
    this.color = color;
  };
  this.setStroke = () => {
    this.stroke = true;
  };
  this.setFill = () => {
    this.stroke = false;
  };
}

function Text(text, font) {
  this.type = "text";
  this.canvas = "normal";
  this.color = "black";
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.stroke = false;
  this.getType = () => {
    return this.type;
  };
  this.getX = function() {
    return this.position[0];
  };
  this.getY = function() {
    return this.position[1];
  };
  this.text = text;
  this.font = font;
  this.move = function(dx, dy, shape) {
    remove(this);
    this.position[0] += dx;
    this.position[1] += dy;
    add(this);
  };
  this.setPosition = function(x, y) {
    this.position = [x, y];
  };
  this.setColor = function(color) {
    this.color = color;
  };
  this.setStroke = function() {
    this.stroke = true;
  };
  this.setFill = function() {
    this.stroke = false;
  };
}

var databaseBack = [];
var databaseSpec = [];
var databaseNorm = [];
var databaseFore = [];

function add(shape, canvas = shape.canvas) {
  canvas = canvas || "normal";
  var color = shape.color;
  var x = shape.x;
  var y = shape.y;
  var r1, r2, r3, r4;
  var stroke = shape.stroke;
  var ctx = $("#" + canvas);
  switch (shape.type) {
    case "rectangle":
      var w = shape.width;
      var h = shape.height;
      ctx.drawRect({
        shape
      });
      r1 = x;
      r2 = y;
      r3 = x + w;
      r4 = y + h;
      break;
    case "circle":
      var r = shape.radius;
      ctx.drawArc({
        shape
      });
      r1 = x - r;
      r2 = y - r;
      r3 = x + r;
      r4 = y + r;
      break;
    case "player":
      var w = shape.size[0];
      var h = shape.size[1];
      var src = shape.src;
      ctx.beginPath();
      ctx.drawImage(src, x, y, w, h);
      r1 = x;
      r2 = y;
      r3 = x + w;
      r4 = y + h;
      break;
    case "text":
      var text = shape.text;
      var font = shape.font;
      ctx.font = font;
      if (stroke == true) {
        ctx.strokeStyle = color;
        ctx.strokeText(text, x, y);
      } else {
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
      }
      break;
  }

  shape.canvas = canvas;
  switch (canvas) {
    case "back":
      databaseBack.push(
        String(r1) + " " + String(r2) + " " + String(r3) + " " + String(r4),
        shape
      );
      break;
    case "special":
      databaseSpec.push(
        String(r1) + " " + String(r2) + " " + String(r3) + " " + String(r4),
        shape
      );
      break;
    case "normal":
      databaseNorm.push(
        String(r1) + " " + String(r2) + " " + String(r3) + " " + String(r4),
        shape
      );
      break;
    case "fore":
      databaseFore.push(
        String(r1) + " " + String(r2) + " " + String(r3) + " " + String(r4),
        shape
      );
      break;
  }
  return "Successful at making shape";
}

function remove(shape) {
  var x = shape.position[0];
  var y = shape.position[1];
  var ctx = document.getElementById(shape.canvas).getContext("2d");
  var r1, r2, r3, r4;
  var thing = "Fail";
  switch (shape.type) {
    case "player":
      ctx.clearRect(x - 1, y - 1, x + shape.size[0] + 2, y + shape.size[1] + 2);
      r1 = x;
      r2 = y;
      r3 = x + shape.size[0];
      r4 = y + shape.size[1];
      break;
    case "rectangle":
      ctx.clearRect(x - 1, y - 1, shape.size[0] + 2, shape.size[1] + 2);
      r1 = x;
      r2 = y;
      r3 = x + shape.size[0];
      r4 = y + shape.size[1];
      break;
    case "circle":
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, shape.radius + 1, 0, 2 * Math.PI);
      ctx.clip();
      ctx.clearRect(0, 0, getWidth(), getHeight());
      ctx.restore();
      r1 = x - shape.radius;
      r2 = y - shape.radius;
      r3 = x + shape.radius;
      r4 = y + shape.radius;
  }

  switch (shape.canvas) {
    case "fore":
      for (var i = 0; i < databaseFore.length; i += 2) {
        var a = databaseFore[i].split(" ");
        if (a[0] == r1 && a[1] == r2 && a[2] == r3 && a[3] == r4) {
          databaseFore.splice(i, 2);
          thing = "Success";
          break;
        }
      }
      break;
    case "normal":
      for (var i = 0; i < databaseNorm.length; i += 2) {
        var a = databaseNorm[i].split(" ");
        if (a[0] == r1 && a[1] == r2 && a[2] == r3 && a[3] == r4) {
          databaseNorm.splice(i, 2);
          thing = "Success";
          break;
        }
      }
      break;
    case "special":
      for (var i = 0; i < databaseSpec.length; i += 2) {
        var a = databaseSpec[i].split(" ");
        if (a[0] == r1 && a[1] == r2 && a[2] == r3 && a[3] == r4) {
          databaseSpec.splice(i, 2);
          thing = "Success";
          break;
        }
      }
      break;
    case "back":
      for (var i = 0; i < databaseBack.length; i += 2) {
        var a = databaseBack[i].split(" ");
        if (a[0] == r1 && a[1] == r2 && a[2] == r3 && a[3] == r4) {
          databaseBack.splice(i, 2);
          thing = "Success";
          break;
        }
      }
      break;
  }
  return thing;
}

function moveAll(dx, dy, canvas = "all") {
  if (canvas == "back" || canvas == "all") {
    var x = 1,
      y = [],
      z = databaseBack.length;
    while (x < z) {
      var shape = databaseBack[1];
      remove(shape);
      shape.position[0] += dx;
      shape.position[1] += dy;
      y.push(shape);
      x += 2;
    }
    x = 0;
    while (x < z / 2) {
      var shape = y[x];
      add(shape, "back");
      x++;
    }
    y = [];
  }

  if (canvas == "special" || canvas == "all") {
    var x = 1,
      y = [],
      z = databaseSpec.length;
    while (x < z) {
      var shape = databaseSpec[1];
      remove(shape);
      shape.position[0] += dx;
      shape.position[1] += dy;
      y.push(shape);
      x += 2;
    }
    x = 0;
    while (x < z / 2) {
      var shape = y[x];
      add(shape, "special");
      x++;
    }
    y = [];
  }

  if (canvas == "normal" || canvas == "all") {
    var x = 1,
      y = [],
      z = databaseNorm.length;
    while (x < z) {
      var shape = databaseNorm[1];
      remove(shape);
      shape.position[0] += dx;
      shape.position[1] += dy;
      y.push(shape, "normal");
      x += 2;
    }
    x = 0;
    while (x < z / 2) {
      var shape = y[x];
      add(shape, "normal");
      x++;
    }
    y = [];
  }

  if (canvas == "fore" || canvas == "all") {
    var x = 1,
      y = [],
      z = databaseFore.length;
    while (x < z) {
      var shape = databaseFore[1];
      remove(shape);
      shape.position[0] += dx;
      shape.position[1] += dy;
      y.push(shape);
      x += 2;
    }
    x = 0;
    while (x < z / 2) {
      var shape = y[x];
      add(shape, "fore");
      x++;
    }
    y = [];
  }
  return "Moved";
}

function getElementAt(x, y, canvas = "normal") {
  var positions,
    final = false,
    i = 0;
  switch (canvas) {
    case "back":
      for (i = 0; i < databaseBack.length; i += 2) {
        positions = databaseBack[i].split(" ");
        if (
          positions[0] <= x &&
          positions[1] <= y &&
          positions[2] >= x &&
          positions[3] >= y
        ) {
          final = databaseBack[i + 1];
          break;
        } else {
          final = null;
        }
      }
      break;
    case "normal":
      for (i = 0; i < databaseNorm.length; i += 2) {
        positions = databaseNorm[i].split(" ");
        if (
          positions[0] <= x &&
          positions[1] <= y &&
          positions[2] >= x &&
          positions[3] >= y
        ) {
          final = databaseNorm[i + 1];
          break;
        } else {
          final = null;
        }
      }
      break;
    case "fore":
      for (i = 0; i < databaseFore.length; i += 2) {
        positions = databaseFore[i].split(" ");
        if (
          positions[0] <= x &&
          positions[1] <= y &&
          positions[2] >= x &&
          positions[3] >= y
        ) {
          final = databaseFore[i + 1];
          break;
        } else {
          final = null;
        }
      }
      break;
  }
  return final;
}

var Randomizer = {
  nextInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var fullscreenf = false;

function fullscreen() {
  fullscreenf = true;
  document.getElementById("game").requestFullscreen();
  let elements = document.querySelectorAll(".game");
  for (let x of elements) {
    x.style.left = 0;
    x.style.top = 0;
    x.style.width = "100vw";
    x.style.height = "100vh";
    x.style.border = 0;
    x.className = "fullGame";
  }
}

function cancelFullscreen() {
  if (
    document.getElementsByClassName("game")[0] == null ||
    document.getElementsByClassName("game")[0] == undefined
  ) {
    fullscreenf = false;
    let elements = document.querySelectorAll(".fullGame");
    for (var x of elements) {
      x.className = "game";
    }
    elements = document.querySelectorAll(".game");
    let elements2 = document.querySelector("#game");
    for (var x of elements) {
      x.style.width = "80vw";
      x.style.height = "80vh";
      x.style.border = "2px solid black";
    }
    elements2.style.left = "0";
    elements2.style.top = "0";
  }
}

function screenRes() {
  var input = prompt("Screen Resolution");
  input = input.split(" ");
  var elements = document.querySelectorAll("canvas");
  for (var x of elements) {
    x.width = input[0];
    x.height = input[1];
  }
}

function cheat(code) {
  switch (code) {
    case 0:
      break;
  }
}

var walking = false,
  walkingR = false,
  walkingL = false;

function walkRight() {
  if (!walking) {
    walking = true;
    walkingR = true;
    remove(player);
    player.src = document.getElementById("two");
    add(player);
    var one = setTimeout(function() {
      remove(player);
      player.src = document.getElementById("one");
      add(player);
    }, 1000 / 7);
    var two = setTimeout(function() {
      remove(player);
      player.src = document.getElementById("three");
      add(player);
    }, 2000 / 7);
    var three = setTimeout(function() {
      remove(player);
      player.src = document.getElementById("one");
      add(player);
      walking = false;
      walkingR = false;
    }, 3000 / 7);
  }
  var test = setInterval(function() {
    if (!rightf && !df) {
      walkingR = false;
      if (!walkingL) {
        walking = false;
      }
      remove(player);
      player.src = document.getElementById("one");
      add(player);
      clearTimeout(one);
      clearTimeout(two);
      clearTimeout(three);
      clearTimeout(test);
      return;
    }
  }, 1);
}

function walkLeft() {
  if (!walking) {
    walking = true;
    walkingL = true;
    remove(player);
    player.src = document.getElementById("five");
    add(player);
    var one = setTimeout(function() {
      remove(player);
      player.src = document.getElementById("four");
      add(player);
    }, 1000 / 7);
    var two = setTimeout(function() {
      remove(player);
      player.src = document.getElementById("six");
      add(player);
    }, 2000 / 7);
    var three = setTimeout(function() {
      remove(player);
      player.src = document.getElementById("four");
      add(player);
      walking = false;
      walkingL = false;
    }, 3000 / 7);
  }
  var test = setInterval(function() {
    if (!leftf && !af) {
      walkingL = false;
      if (!walkingR) {
        walking = false;
      }
      remove(player);
      player.src = document.getElementById("four");
      add(player);
      clearTimeout(one);
      clearTimeout(two);
      clearTimeout(three);
      clearTimeout(test);
      return;
    }
  }, 1);
}

var jumpHeight,
  jumping = false;

function jump() {
  if (
    !jumping &&
    (getElementAt(
      player.getX(),
      player.getY() + player.getHeight() + 1,
      "back"
    ) !== null ||
      getElementAt(
        player.getX() + player.getWidth(),
        player.getY() + player.getHeight() + 1,
        "back"
      ) !== null ||
      getElementAt(
        player.getX() + player.getWidth() / 2,
        player.getY() + player.getHeight() + 1,
        "back"
      ) !== null)
  ) {
    let jumpCounter = 0;
    jumping = true;
    var up = setInterval(function() {
      if (jumpCounter < jumpHeight) {
        player.move(0, -1);
        jumpCounter++;
      } else {
        clearInterval(up);
        jumpCounter = 0;
      }
    }, 1);
    setTimeout(function() {
      jumping = false;
    }, jumpHeight * 5);
  }
}

function mousePosition() {}

function loading() {
  let x = 0,
    y = document.getElementById("text"),
    load = setInterval(function() {
      if (x === 0) {
        y.innerHTML = "Loading";
        x++;
      } else if (x === 1) {
        y.innerHTML = "Loading.";
        x++;
      } else if (x === 2) {
        y.innerHTML = "Loading..";
        x++;
      } else if (x === 3) {
        y.innerHTML = "Loading...";
        x = 0;
      } else {
        x = 0;
      }
    }, 300);
  setTimeout(function() {
    setup();
  }, Randomizer.nextInt(750, 1500));
  setTimeout(function() {
    clearInterval(load);
    setTimeout(function() {
      $(".loading").remove();
      setTimeout(function() {
        start();
      }, Randomizer.nextInt(50, 100));
    }, Randomizer.nextInt(250, 750));
  }, Randomizer.nextInt(1000, 2500));
}

function setup() {
  let elements = document.querySelectorAll("canvas");
  for (let x of elements) {
    x.width = screen.width * 1.6;
    x.height = screen.height * 1.6;
    x.style.width = x.width / 2 + "px";
    x.style.height = x.height / 2 + "px";
  }
  jumpHeight = getHeight() / 10;
  walkSpeed = 5;
  sprintSpeed = 10;
}

var trunk, tree, ground, ground2, player, player2, mouseX, mouseY;
// why?
FremonteSection: {
  function start() {
    trunk = new Rectangle(70, 80, "trunk");
    trunk.setPosition(160, getHeight() - 230);
    trunk.setColor(Color.brown);
    add(trunk, "special");

    tree = new Circle(100, "tree");
    tree.setPosition(195, getHeight() - 320);
    tree.setColor(Color.green);
    add(tree, "special");

    ground2 = new Rectangle(400, 100, "ground2");
    ground2.setPosition(0, getHeight() - 100);
    ground2.setColor(Color.brown);
    add(ground2, "back");

    ground = new Rectangle(400, 50, "ground");
    ground.setPosition(0, getHeight() - 150);
    ground.setColor(Color.green);
    add(ground, "back");

    trunk = new Rectangle(70, 80, "trunk");
    trunk.setPosition(560, getHeight() - 230);
    trunk.setColor(Color.brown);
    add(trunk, "special");

    tree = new Circle(100, "tree");
    tree.setPosition(595, getHeight() - 320);
    tree.setColor(Color.green);
    add(tree, "special");

    ground2 = new Rectangle(400, 100, "ground2");
    ground2.setPosition(400, getHeight() - 100);
    ground2.setColor(Color.brown);
    add(ground2, "back");

    ground = new Rectangle(400, 50, "ground");
    ground.setPosition(400, getHeight() - 150);
    ground.setColor(Color.green);
    add(ground, "back");

    trunk = new Rectangle(70, 80, "trunk");
    trunk.setPosition(960, getHeight() - 230);
    trunk.setColor(Color.brown);
    add(trunk, "special");

    tree = new Circle(100, "tree");
    tree.setPosition(995, getHeight() - 320);
    tree.setColor(Color.green);
    add(tree, "special");

    ground2 = new Rectangle(400, 100, "ground2");
    ground2.setPosition(800, getHeight() - 100);
    ground2.setColor(Color.brown);
    add(ground2, "back");

    ground = new Rectangle(400, 50, "ground");
    ground.setPosition(800, getHeight() - 150);
    ground.setColor(Color.green);
    add(ground, "back");

    trunk = new Rectangle(70, 80, "trunk");
    trunk.setPosition(1360, getHeight() - 230);
    trunk.setColor(Color.brown);
    add(trunk, "special");

    tree = new Circle(100, "tree");
    tree.setPosition(1395, getHeight() - 320);
    tree.setColor(Color.green);
    add(tree, "special");

    ground2 = new Rectangle(400, 100, "ground2");
    ground2.setPosition(1200, getHeight() - 100);
    ground2.setColor(Color.brown);
    add(ground2, "back");

    ground = new Rectangle(400, 50, "ground");
    ground.setPosition(1200, getHeight() - 150);
    ground.setColor(Color.green);
    add(ground, "back");

    player = new Player(300, 252, document.getElementById("one"));
    player.setPosition((getWidth() - 600) / 2, getHeight() - 400);
    add(player, "normal");
  }
}

gravity: {
  setInterval(function() {
    if (
      !jumping &&
      getElementAt(
        player.getX(),
        player.getY() + player.getHeight() + 1,
        "back"
      ) === null &&
      getElementAt(
        player.getX() + player.getWidth(),
        player.getY() + player.getHeight() + 1,
        "back"
      ) === null &&
      getElementAt(
        player.getX() + player.getWidth() / 2,
        player.getY() + player.getHeight() + 1,
        "back"
      ) === null
    ) {
      player.move(0, 1);
    }
  }, 10);
}

eventListeners: {
  document.addEventListener("keydown", interpreter);
  document.addEventListener("keyup", upInterpreter);
  document.addEventListener("mousemove", mousePosition);
}

loading();
