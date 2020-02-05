var numCells = 4;
var containerWidth;
var containerPadding;
var cellWidth;
var cellSpace;

var board = new Array(numCells);
var availPlace = new Array(numCells*numCells); //an array that stores the index of available positions
var score = 0;
var prev_score = 0;

$(document).ready(function () {
  containerWidth = $("#grid-container").width(); 
  cellWidth = $(".grid-cell").width();
  containerPadding = parseInt($('#grid-container').css("padding").replace("px", "")); 
  cellSpace = (containerWidth - numCells * cellWidth) / (numCells - 1);
  initView();
  initGame();
});

function initView() {
  for(var i = 0; i < numCells; i++) {
    for(var j = 0; j < numCells; j++) {
      var gridCell = $('#grid-cell-' + i + '-' + j);
      gridCell.css('top', containerPadding + i * (cellWidth + cellSpace));
      gridCell.css('left', containerPadding + j * (cellWidth + cellSpace));
    }
  }
}

function initGame() {
  score = 0;
  for(var i = 0; i < numCells; i++) {
    board[i] = Array(numCells);
    for(var j = 0; j < numCells; j++) board[i][j] = 0;
  }
  // board[0][2] = 0;
  for(i = 0; i < numCells*numCells; i++) 
    availPlace[i] = i;
  genNum();
  genNum();
  for(i = 0; i < numCells; i++) {
    for(j = 0; j < numCells; j++) {
      showNum(i, j, board[i][j]);
    }
  }
}

function showNum(row, col, number) {
  var gridCell = $('#grid-cell-' + row + '-' + col);
  gridCell.css('top', containerPadding + row * (cellWidth + cellSpace));
  gridCell.css('left', containerPadding + col * (cellWidth + cellSpace));
  gridCell.css('background-color', getNumBgColor(number));
  gridCell.css('color', getNumColor(number));
  if(number != 0) gridCell.text(number);
}

function genNum() {
  availPlace = [];
  for(var i = 0; i < numCells; i++) {
    for(var j = 0; j < numCells; j++) {
      if(board[i][j] == 0) availPlace.push(i*numCells+j);
    }
  }
  var length = availPlace.length;
  if(length == 0) return;
  var index = Math.floor(Math.random()*length);
  var place = availPlace[index];
  var number = (Math.random() < 0.5) ? 2 : 4;
  board[parseInt(place/numCells)][place%numCells] = number;
  availPlace.splice(index, 1);
  var row = Math.floor(place / numCells);
  var col = place - numCells * row;
  console.log(row);
  console.log(col);
  showNum(row, col, number);
}

$(document).keydown(function(event) {
  prev_score = score;
  switch(event.keyCode) {
    case 37: //left
      moveLeft();
      break;
    case 38: //up
      moveUp();
      break;
    case 39: //right
      moveRight();
      break;
    case 40: //down
      moveDown();
      break;
    default:
      return;
  }
});

function moveUp() {
  for(var i = 0; i < numCells; i++) {
    var col = [];
    var ori_pos = [];
    var final_pos = [];
    //find numbers of each row
    //merge and update score
    for(var j = 0; j < numCells; j++) {
      if(board[j][i] != 0) {
        col.push(board[j][i]);
        ori_pos.push(j);
      }
    }

    final_pos.push(0);
    for(j = 1; j < col.length; j++) {
      if(col[j] == col[j-1]) {
        col[j-1] += col[j];
        score += col[j-1];
        final_pos.push(j-1);
        if(j != col.length - 1) final_pos.push(j);
        col.splice(j,1);
      } else {
        final_pos.push(j);
      }
    }
    //update board values
    for(j = 0; j < col.length; j++) board[j][i] = col[j];
    for(j = col.length; j < numCells; j++) board[j][i] = 0;

    //show animation
    for(j = 0; j < ori_pos.length; j++) {
      moveAnimation(ori_pos[j], i, final_pos[j], i);
    }
  }
  setTimeout(function() {
    updateBoardView();
  }, 200);
}

function moveLeft() {
  for(var i = 0; i < numCells; i++) {
    var row = [];
    var ori_pos = [];
    var final_pos = [];
    //find numbers of each row
    //merge and update score
    for(var j = 0; j < numCells; j++) {
      if(board[i][j] != 0) {
        row.push(board[i][j]);
        ori_pos.push(j);
      }
    }

    final_pos.push(0);
    for(j = 1; j < row.length; j++) {
      if(row[j] == row[j-1]) {
        row[j-1] += row[j];
        score += row[j-1];
        final_pos.push(j-1);
        if(j != row.length - 1) final_pos.push(j);
        row.splice(j,1);
      } else {
        final_pos.push(j);
      }
    }
    //update board values
    for(j = 0; j < row.length; j++) board[i][j] = row[j];
    for(j = row.length; j < numCells; j++) board[i][j] = 0;

    //show animation
    for(j = 0; j < ori_pos.length; j++) {
      moveAnimation(i, ori_pos[j], i, final_pos[j]);
    }
  }
  setTimeout(function() {
    updateBoardView();
  }, 200);
}

function moveRight() {
  for(var i = 0; i < numCells; i++) {
    var row = [];
    var ori_pos = [];
    var final_pos = [];
    //find numbers of each row
    //merge and update score
    for(var j = numCells - 1; j >= 0; j--) {
      if(board[i][j] != 0) {
        row.push(board[i][j]);
        ori_pos.push(j);
      }
    }

    final_pos.push(numCells-1);
    for(j = 1; j < row.length; j++) {
      if(row[j] == row[j-1]) {
        row[j-1] += row[j];
        score += row[j-1];
        final_pos.push(numCells-1-(j-1));
        if(j != row.length - 1) final_pos.push(numCells-1-j);
        row.splice(j,1);
      } else {
        final_pos.push(numCells-1-j);
      }
    }
    //update board values
    for(j = 0; j < row.length; j++) board[i][numCells-1-j] = row[j];
    for(j = row.length; j < numCells; j++) board[i][numCells-1-j] = 0;

    //show animation
    for(j = 0; j < ori_pos.length; j++) {
      moveAnimation(i, ori_pos[j], i, final_pos[j]);
    }
  }
  setTimeout(function() {
    updateBoardView();
  }, 200);
}

function moveDown() {
  for(var i = 0; i < numCells; i++) {
    var col = [];
    var ori_pos = [];
    var final_pos = [];
    //find numbers of each row
    //merge and update score
    for(var j = numCells - 1; j >= 0; j--) {
      if(board[j][i] != 0) {
        col.push(board[j][i]);
        ori_pos.push(j);
      }
    }

    final_pos.push(numCells-1);
    for(j = 1; j < col.length; j++) {
      if(col[j] == col[j-1]) {
        col[j-1] += col[j];
        score += col[j-1];
        final_pos.push(numCells-1-(j-1));
        if(j != col.length - 1) final_pos.push(numCells-1-j);
        col.splice(j,1);
      } else {
        final_pos.push(numCells-1-j);
      }
    }
    //update board values
    for(j = 0; j < col.length; j++) board[numCells-1-j][i] = col[j];
    for(j = col.length; j < numCells; j++) board[numCells-1-j][i] = 0;

    //show animation
    for(j = 0; j < ori_pos.length; j++) {
      moveAnimation(ori_pos[j], i, final_pos[j], i);
    }
  }
  setTimeout(function() {
    updateBoardView();
  }, 200);
}

function moveAnimation(fromx, fromy, tox, toy) {
  var cell = $("#grid-cell-"+fromx+"-"+fromy);
  cell.animate({
    top: containerPadding + tox * (cellWidth + cellSpace),
    left: containerPadding + toy * (cellWidth + cellSpace)
  }, 200);
}

function updateBoardView() {
  genNum();
  $(".grid-cell").remove();
  for(var i = 0; i < numCells; i++) {
    for(var j = 0; j < numCells; j++) {
      $("#grid-container").append('<div class="grid-cell" id="grid-cell-'+i+'-'+j+'"></div>');
      showNum(i, j, board[i][j]);
    }
  }
  $("#score").text("Score: "+score);
}