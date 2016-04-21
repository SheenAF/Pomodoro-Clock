var sessionLength = 25;
var breakLength = 5;
var clockStopped = true;
var isSession = true;
var newTime = true;
var t=0;
var myT = new Date();

$("#actualTime").text(sessionLength);

function startClock() {
  clockStopped = !clockStopped;
  if (newTime) {
    if (isSession) myT.setHours(0, sessionLength, 0);   
    else myT.setHours(0, breakLength, 0); 
  }
  if (clockStopped) pause(); 
  else {
    if (!newTime) resume(); else myTimer();
  }
}


function minusSess() {
  if (clockStopped) {
    newTime = true;
    if (sessionLength != 1) sessionLength--;  
    $(".sL").text(sessionLength);
    if (isSession) $("#actualTime").text(sessionLength);
  }
 
}
function minusBreak() {
  if (clockStopped) {
    newTime = true;
    if (breakLength != 1) breakLength--; 
    $(".brL").text(breakLength);
    if (!isSession) $("#actualTime").text(breakLength);
  }
 
}
function plusSess() {
  if (clockStopped) {
    newTime = true;
    if (sessionLength != 59) sessionLength++;
    $(".sL").text(sessionLength);
    if (isSession) $("#actualTime").text(sessionLength);
  }
 
}
function plusBreak() {
  if (clockStopped) {
    newTime = true;
    if (breakLength != 59)breakLength++;
    $(".brL").text(breakLength);
    if (!isSession) $("#actualTime").text(breakLength);
  }
 
}

function sessOrBreak() {
  if (clockStopped) {
    changeSessOrBreak ();
  }
}



function myTimer (){
  newTime = false;
  var m = myT.getMinutes();
  var s = myT.getSeconds();
  m = (m<10) ? "0" + m : m;
  s = (s<10) ? "0" + s : s;
  
  $("#actualTime").text(m+":"+s);
  myT.setSeconds(myT.getSeconds()-1);
  if (m==0) {
    $(".clock").toggleClass("flash");
    if (s==0) {
      $(".clock").removeClass("flash");
      changeSessOrBreak ();
      if (isSession) myT.setHours(0, sessionLength, 0);   
      else myT.setHours(0, breakLength, 0); 
    }
  }
  
  t=setTimeout(myTimer, 1000);  
  
  return (myT.getSeconds());
}
  
function pause () {
  clearTimeout(t);
}
  
function resume () {
  t = setTimeout(myTimer, 1000);
}

function changeSessOrBreak () {
  isSession = !isSession;
  newTime = true;
  if (isSession) {
    $("#actualState").text("Session");
    $("#actualTime").text(sessionLength);
  }
  if (!isSession) {
    $("#actualState").text("Break!");
    $("#actualTime").text(breakLength);
  }
}