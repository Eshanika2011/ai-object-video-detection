video = "";
status = "";
objects=[];
function preload() {
  video = createVideo("video.mp4");
}

function setup() {
  canvas = createCanvas(480, 380)
  canvas.center();
  video.hide()
}

function draw() {
  image(video, 0, 0, 480, 380);
  if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectdetector.detect(video, got_result);
    for (let index = 0; index < objects.length; index++) {
      document.getElementById("status").innerHTML = "Status : object detected";
      document.getElementById("number_of_objects").innerHTML = "Number of object : " + objects.length;
      fill(r, g, b)
      percent = floor(objects[index].confidence * 100)
      text(objects[index].label + " " + percent + "%", objects[index].x + 15, objects[index].y + 15)
      noFill();
      stroke(r, g, b)
      rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);
    }
  }

}
function got_result (error,results){
if (error) {
  console.log(error);
}
else{ 
  console.log(results);
  objects=results;
}
}
function start() {
  objectdetector = ml5.objectDetector('cocossd', modelloaded);
  document.getElementById("status").innerHTML = "Status : detecting objects"
}

function modelloaded() {
  console.log("model loaded")
  status = true;
  video.loop();
  video.speed(1)
  video.volume(1);
}