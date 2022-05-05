var song=""
var leftWristX=0
var rightWristX=0
var leftWristY=0
var rightWristY=0
var scoreLeftWrist=0

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500)
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotResult)
}

function draw(){
    image(video,0,0,600,500)

    fill("red");
    stroke("red");

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        inNumberLeftWristY=Number(leftWristY);
        remove_decimal=floor(inNumberLeftWristY);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume)
        }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("poseNet is initialised")
}

function gotResult(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist= "+scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftwristX= "+leftWristX+", leftWristY= "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
      console.log("rightwristX= "+rightWristX+", rightWristY= "+rightWristY);
    }
}