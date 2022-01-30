// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let pg;
let coordinateX = 960
let coordinateY = 720
let img;
let partArray = []
let imgBodyF;
let imgArm;
let imgFoot;
let imgHead;
let imageBodySize = {x: 80, y:160};
let poseArray = {};
let sc;
let head;
let body;
let lua;
let lla;
let rua;
let rla;
let lul;
let lll
let rul;
let rll;
var w = 800;
var h = 800;
let u = w/2;
let v = h/2;
let n = 0;
let tmpArrayX = [];
let tmpArrayY = [];
let tmpColor = [];
let tmpSizeX = [];
let tmpSizeY = [];

function setup() {
  createCanvas(coordinateX, coordinateY);
  angleMode(DEGREES);
  pg = createGraphics(coordinateX, coordinateY);
  button = createButton('clear');
  button.position(10,coordinateY+10);
  button.mousePressed(clearAction);
}

function modelReady() {
}

function draw() {
  //カメラを反転させる
  push();
  translate(width, 0);
  scale(-1, 1);
  //ビデオの座標
  //image(video, 0, 0, width, height);
  createCanvas(coordinateX,coordinateY);
  pop();
  checkKeypoints();
  //drawSkeleton();　// デバッグ用
}
//text(str(frameCount), coordinateX, coordinateY);

function checkKeypoints() {
    if(mouseIsPressed){
          tmpArrayX.push(mouseX);
          tmpArrayY.push(mouseY);
          tmpColor.push(0);
          tmpSizeX.push(4);
          tmpSizeY.push(4);
    }
         //ellipse(tmpArrayX[tmpArrayX.length-1], tmpArrayY[tmpArrayY.length-1], 30, 30);
          //ellipse(tmpArrayX[0+n], tmpArrayY[0+n], 50, 50);
      //fill(255-n/2);
      for(let i = 0; i <tmpArrayX.length; i++){
        noStroke();
        fill(tmpColor[i]);  
        ellipse(tmpArrayX[i],tmpArrayY[i],tmpSizeX[i],tmpSizeY[i]);
        tmpColor.splice(i, 1 ,tmpColor[i] + 1);
        tmpSizeX.splice(i , 1 , tmpSizeX[i] + 0.5);
        tmpSizeY.splice(i , 1 , tmpSizeY[i] + 0.5);
        //console.log(tmpArrayX[i]);
        if(tmpColor > 255){
            tmpArrayX.splice(i,1);
            tmpArrayY.splice(i,1);
            tmpSizeX.splice(i,1);
            tmpSizeY.splice(i,1);
            tmpColor.splice(i,1);
        }
        
      }
    
      //console.log(tmpSizeX);
    }

  function clearAction(){
    tmpArrayX.splice(0);
    tmpArrayY.splice(0);
    tmpColor.splice(0);
    tmpSizeX.splice(0);
    tmpSizeY.splice(0);
    background(0)
    
  }