// Required variables
var min = 25;
var session_seconds = "00";
var session_minutes = min;
var session_break = 5;
var last_break = 23;
var completed_sessions = 0;
var session_no = 1;

// Audio files
var click_sound = new Audio("click.mp3");
var bell = new Audio("bell.mp3");

// Starting template for the timer
function template() {
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;
}

//Session Timer function
var timer = null;
var startTimer = function () {
  if (timer !== null || completed_sessions == 4) return;
  click_sound.play();

  // Change the minutes and seconds to starting time
  session_minutes = session_minutes - 1;
  session_seconds = 59;
  template();
  document.getElementById("done").innerHTML = "Work Time";

  // Show Sessions detail on page
  document.getElementById("completed").innerHTML =
    "Sessions Completed : " + completed_sessions;
  document.getElementById("current").innerHTML =
    "Current Session : " + session_no;

  timer = setInterval(function () {
    session_seconds = session_seconds - 1;
    document.getElementById("seconds").innerHTML = session_seconds;

    //check seconds to reduce minutes
    if (session_seconds <= 0) {
      session_minutes = session_minutes - 1;
      document.getElementById("minutes").innerHTML = session_minutes;
      //check minutes to end the session
      if (session_minutes < 0) {
        clearInterval(timer);
        bell.play();

        // increament sessions
        completed_sessions = completed_sessions + 1;
        session_no = session_no + 1;
        // Show Sessions detail on page
        document.getElementById("completed").innerHTML =
          "Sessions Completed : " + completed_sessions;

        // show the minutes and seconds
        session_minutes = 0;
        session_seconds = "00";
        template();

        //start break
        if (completed_sessions == 4) {
          session_break = last_break;
        }
        break_popup();
        sessionBreak(session_break);
      }

      // Reset the session seconds to 60
      session_seconds = 60;
    }
  }, 1000);
};

//Break Counter
var sessionBreak = function (breakTime) {
  clearInterval(timer);
  click_sound.play();

  // Change the minutes and seconds
  session_minutes = breakTime - 1;
  session_seconds = 59;
  template();

  document.getElementById("done").innerHTML = "BREAK TIME";
  document.getElementById("current").innerHTML = "Current Session : Break";

  //strt counter
  timer = setInterval(function () {
    session_seconds = session_seconds - 1;
    document.getElementById("seconds").innerHTML = session_seconds;

    //check seconds to reduce minutes
    if (session_seconds <= 0) {
      session_minutes = session_minutes - 1;
      document.getElementById("minutes").innerHTML = session_minutes;
      //check minutes to end the break
      if (session_minutes < 0) {
        clearInterval(timer);
        bell.play();

        // show the minutes and seconds
        session_minutes = 0;
        session_seconds = "00";
        template();

        //start break
        if (completed_sessions == 4) {
          document.getElementById("current").innerHTML =
            "You have Completed 4 sessions. Please reset the timer to start again";
        }
        session_minutes = min;
        timer = null;
        startTimer();
      }

      // Reset the session seconds to 60
      session_seconds = 60;
    }
  }, 1000);
};

// reset timer functioin
var reset = function () {
  document.getElementById("hide-popup").style.display = "block";
  document.getElementById("myForm").style.display = "block";

  //when user click ok
  $("#ok").click(function () {
    clearInterval(timer);
    // Add the message to the html
    document.getElementById("done").innerHTML = "Timer is reset.play again";

    // Change the minutes and seconds to starting time
    session_minutes = min;
    session_seconds = "00";
    completed_sessions = 0;
    session_no = 1;
    template();

    document.getElementById("current").innerHTML = "";

    timer = null;
    document.getElementById("myForm").style.display = "none";
    document.getElementById("hide-popup").style.display = "none";
  });

  //when user click cancel
  $("#cancel").click(function () {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("hide-popup").style.display = "none";
  });
};

//Timer options function
var time = function () {
  document.getElementById("hide-popup").style.display = "block";
  document.getElementById("time-popup").style.display = "block";
  ///
  //when user click ok
  $("#change").click(function () {
    clearInterval(timer);
    if (document.getElementById("r1").checked) {
      min = 25;
      session_minutes = min;
      session_break = 5;
      last_break = 23;
      session_seconds = "00";
      template();
    }

    if (document.getElementById("r2").checked) {
      min = 25;
      session_minutes = min;
      session_break = 5;
      last_break = 15;
      session_seconds = "00";
      template();
    }

    if (document.getElementById("r3").checked) {
      min = 23;
      session_minutes = min;
      session_break = 3;
      last_break = 11;
      session_seconds = "00";
      template();
    }

    //reset sessions detail
    completed_sessions = 0;
    session_no = 1;

    // Add the message to the html
    document.getElementById("done").innerHTML =
      "23onMe Timer change.Play again";
    document.getElementById("current").innerHTML = "";
    timer = null;

    document.getElementById("time-popup").style.display = "none";
    document.getElementById("hide-popup").style.display = "none";
  });

  //when user click cancel
  $("#same").click(function () {
    document.getElementById("time-popup").style.display = "none";
    document.getElementById("hide-popup").style.display = "none";
  });
};

//Break Popup function
var break_popup = function () {
  document.getElementById("hide-popup").style.display = "block";
  document.getElementById("break-popup").style.display = "block";

  //when user click Ok
  $("#yoga").click(function () {
    window.open("https://www.businessyoga.co.uk/membership/");
    document.getElementById("break-popup").style.display = "none";
    document.getElementById("hide-popup").style.display = "none";
  });

  //when user click cancel
  $("#noYoga").click(function () {
    document.getElementById("break-popup").style.display = "none";
    document.getElementById("hide-popup").style.display = "none";
  });
};

//user click outside the box
var hide = function () {
  //hide reset-popup box
  document.getElementById("myForm").style.display = "none";
  //hide time-popup box
  document.getElementById("time-popup").style.display = "none";
  //hide break-popup box
  document.getElementById("break-popup").style.display = "none";
  //hide backscreen popup
  document.getElementById("hide-popup").style.display = "none";
};
