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
let camera;

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
  //ビデオのキャプチャ
  video = createCapture(VIDEO);
  video.size(width, height);
  camera = video.get();
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
  //image(video, 0, 0, width, height);
  createCanvas(coordinateX,coordinateY);
  pop();
  checkKeypoints();
  drawSkeleton();　// デバッグ用
}

function checkKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    poseArray = {};
    sc = 0;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score >= 0.2) {
        poseArray[keypoint.part] = {x: keypoint.position.x, y:keypoint.position.y};
      }
    }

    try{ // 体の同定
      body = {ldx: poseArray["leftHip"].x - poseArray["leftShoulder"].x,
              ldy: poseArray["leftHip"].y - poseArray["leftShoulder"].y,
              rdx: poseArray["rightHip"].x - poseArray["rightShoulder"].x,
              rdy: poseArray["rightHip"].y - poseArray["rightShoulder"].y,
              dx: poseArray["rightShoulder"].x - poseArray["leftShoulder"].x,
              dy: poseArray["rightShoulder"].y - poseArray["leftShoulder"].y,
              x: (poseArray["leftHip"].x + poseArray["leftShoulder"].x + poseArray["rightHip"].x + poseArray["rightShoulder"].x)/4,
              y: (poseArray["leftHip"].y + poseArray["leftShoulder"].y + poseArray["rightHip"].y + poseArray["rightShoulder"].y)/4};

//      sc = Math.sqrt(body.dx ** 2 + body.dy ** 2) / imageBodySize.x;　
    sc = (Math.sqrt(body.ldx ** 2+ body.ldy ** 2) + Math.sqrt(body.rdx ** 2+ body.rdy ** 2) ) / 2 / imageBodySize.y;
      drawParts(imgBodyF, sc, body.x, body.y, Math.atan2(body.rdx, body.rdy) * 180 / Math.PI);
    } catch(e){
    }
{
    try{ // 頭の同定
        head = {dx: poseArray["rightEar"].x - poseArray["leftEar"].x,
                dy: poseArray["rightEar"].y - poseArray["leftEar"].y,
                 x: (poseArray["rightEar"].x + poseArray["leftEar"].x)/2,
                 y: (poseArray["rightEar"].y + poseArray["leftEar"].y)/2};
                 drawParts(imgHead, sc , head.x, head.y, 0);　
    } catch(e){
    }

    try{ // 左上腕の同定
        lua = {dx: poseArray["leftElbow"].x - poseArray["leftShoulder"].x,
               dy: poseArray["leftElbow"].y - poseArray["leftShoulder"].y,
                x: (poseArray["leftElbow"].x + poseArray["leftShoulder"].x)/2,
                y: (poseArray["leftElbow"].y + poseArray["leftShoulder"].y)/2};
                 drawParts(imgArm, sc, lua.x, lua.y, Math.atan2(lua.dx, lua.dy) * 180 / Math.PI);　
    } catch(e){
    }

    try{ // 左下腕の同定
        lla = {dx: poseArray["leftWrist"].x - poseArray["leftElbow"].x,
                dy: poseArray["leftWrist"].y - poseArray["leftElbow"].y,
                 x: (poseArray["leftWrist"].x + poseArray["leftElbow"].x)/2,
                 y: (poseArray["leftWrist"].y + poseArray["leftElbow"].y)/2};
                 drawParts(imgArm, sc, lla.x, lla.y, Math.atan2(lla.dx, lla.dy) * 180 / Math.PI);　
    } catch(e){
    }

    try{ // 右上腕の同定
        rua = {dx: poseArray["rightElbow"].x - poseArray["rightShoulder"].x,
               dy: poseArray["rightElbow"].y - poseArray["rightShoulder"].y,
                x: (poseArray["rightElbow"].x + poseArray["rightShoulder"].x)/2,
                y: (poseArray["rightElbow"].y + poseArray["rightShoulder"].y)/2};
                 drawParts(imgArm, sc, rua.x, rua.y, Math.atan2(rua.dx, rua.dy) * 180 / Math.PI);　
    } catch(e){
    }

    try{ // 右下腕の同定
        rla = {dx: poseArray["rightWrist"].x - poseArray["rightElbow"].x,
                dy: poseArray["rightWrist"].y - poseArray["rightElbow"].y,
                 x: (poseArray["rightWrist"].x + poseArray["rightElbow"].x)/2,
                 y: (poseArray["rightWrist"].y + poseArray["rightElbow"].y)/2};
                 drawParts(imgArm, sc, rla.x, rla.y, Math.atan2(rla.dx, rla.dy) * 180 / Math.PI);　
    } catch(e){
    }
    try{//右太ももの同定
      rul = {dx: poseArray["rightKnee"].x - poseArray["rightHip"].x,
              dy: poseArray["rightKnee"].y - poseArray["rightHip"].y,
               x: (poseArray["rightKnee"].x + poseArray["rightHip"].x)/2,
               y: (poseArray["rightKnee"].y + poseArray["rightHip"].y)/2};
             drawParts(imgFoot, sc, rul.x, rul.y, Math.atan2(rul.dx, rul.dy) * 180 / Math.PI);　

    } catch(e){
    }
    try{//左太ももの同定
      lul = {dx: poseArray["leftKnee"].x - poseArray["leftHip"].x,
              dy: poseArray["leftKnee"].y - poseArray["leftHip"].y,
               x: (poseArray["leftKnee"].x + poseArray["leftHip"].x)/2,
               y: (poseArray["leftKnee"].y + poseArray["leftHip"].y)/2};
             drawParts(imgFoot, sc, lul.x, lul.y, Math.atan2(lul.dx, lul.dy) * 180 / Math.PI);
   }catch(e){
   }
   try{//右ふくらはぎの同定
    rll = {dx: poseArray["rightAnkle"].x - poseArray["rightKnee"].x,
           dy: poseArray["rightAnkle"].y - poseArray["rightKnee"].y,
           x: (poseArray["rightAnkle"].x + poseArray["rightKnee"].x)/2,
           y: (poseArray["rightAnkle"].y + poseArray["rightKnee"].y)/2};
           drawParts(imgFoot, sc, rll.x, rll.y, Math.atan2(rll.dx, rll.dy) * 180 / Math.PI);
 }catch(e){
 }
 try{//左ふくらはぎの同定
  lll = {dx: poseArray["leftKnee"].x - poseArray["leftAnkle"].x,
         dy: poseArray["leftKnee"].y - poseArray["leftAnkle"].y,
         x: (poseArray["leftKnee"].x + poseArray["leftAnkle"].x)/2,
         y: (poseArray["leftKnee"].y + poseArray["leftAnkle"].y)/2},
         drawParts(imgFoot, sc, lll.x, lll.y, Math.atan2(lll.dx, lll.dy) * 180 / Math.PI);
}catch(e){
}
    // 足は自分で書いてみましょう．

    break; // とりあえず一人分だけ描く
  }
}
}


function drawParts(img, sc, x, y, angle){
　push(); // 図形設定の保存
  imageMode(CENTER);
  translate(-x+coordinateX,y);
  rotate(angle);
  image(img,0,0,sc*img.width,sc*img.height);
  pop(); // 図形設定の復元
}

function drawSkeleton() {
   //Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
     //For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      line(-1 * (partB.position.x) + coordinateX, partB.position.y, -1 * (partA.position.x) + coordinateX, partA.position.y);
    }
  }
}

