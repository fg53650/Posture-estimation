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

function preload(){
  imgBodyF = loadImage("body-front.png");
  imgArm = loadImage("arm.png");
  imgFoot = loadImage("foot.png");
  imgHead = loadImage("head.png");
}

function setup() {
  createCanvas(coordinateX, coordinateY);
  angleMode(DEGREES);
  pg = createGraphics(coordinateX, coordinateY);
  button = createButton('clear');
  button.position(10,coordinateY+10);
  button.mousePressed(clearAction);
  //ビデオのキャプチャ
  video = createCapture(VIDEO);
  video.size(width, height);
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // 新しいポーズが検出されるたび配列を更新
  poseNet.on('pose', function (results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
}

function draw() {
  //カメラを反転させる
  push();
  translate(width, 0);
  scale(-1, 1);
  //ビデオの座標
  image(video, 0, 0, coordinateX, coordinateY);
  //createCanvas(coordinateX,coordinateY);
  pop();
  checkKeypoints();
  //drawSkeleton();　// デバッグ用
  n++;
}
//text(str(frameCount), coordinateX, coordinateY);
function checkKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    poseArray = {};
    sc = 0;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score >= 0.2) {
        poseArray[keypoint.part] = {x: keypoint.position.x, y: keypoint.position.y};
      }
      try{
          tmpArrayX.push(poseArray["rightWrist"].x);
          tmpArrayY.push(poseArray["rightWrist"].y);
          tmpColor.push(255);
          tmpSizeX.push(4);
          tmpSizeY.push(4);
         //ellipse(tmpArrayX[tmpArrayX.length-1], tmpArrayY[tmpArrayY.length-1], 30, 30);
          //ellipse(tmpArrayX[0+n], tmpArrayY[0+n], 50, 50);
          //console.log(tmpArray[0]);
      }catch(e){
      }
      //fill(255-n/2);
      
      for(let i = 0; i <tmpArrayX[i]; i++){
        noStroke();
        fill(255,tmpColor[i]);  
        ellipse(coordinateX-tmpArrayX[i], tmpArrayY[i], tmpSizeX[i], tmpSizeY[i]);
        tmpColor.splice(i, 1 ,tmpColor[i] - 1);
        tmpSizeX.splice(i , 1 , tmpSizeX[i] + 0.1);
        tmpSizeY.splice(i , 1 , tmpSizeY[i] + 0.1);
      }
      if(n > 50){
        clearAction();
        n = 0;
      }
      //console.log(tmpSizeX);
    
        
      
      //noStroke();
      //createCanvas(coordinateX,coordinateY);

    }
}
} 
  function clearAction(){
    tmpArrayX.splice(0);
    tmpArrayY.splice(0);
    tmpColor.splice(0);
    tmpSizeX.splice(0);
    tmpSizeY.splice(0);
    //background(0)
    
  }