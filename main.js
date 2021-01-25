// Required variables
    var min=25;
    var session_seconds = "00";
    var session_minutes = min;
    var completed_sessions= 0 ;
    var session_no=1;

    // Audio files
    var click_sound = new Audio("click.mp3");
    var bell = new Audio("bell.mp3");

    // Starting template for the timer
    function template() {
      document.getElementById("minutes").innerHTML = session_minutes;
      document.getElementById("seconds").innerHTML = session_seconds;
    }

    $(function () {
      var timer = null,
        interval = 1000,
        value = 0;

      $("#start").click(function () {
        if (timer !== null) return;
        click_sound.play();

        // Change the minutes and seconds to starting time
        session_minutes = session_minutes - 1;
        session_seconds = 59;

        // Add the seconds and minutes to the page
        document.getElementById("minutes").innerHTML = session_minutes;
        document.getElementById("seconds").innerHTML = session_seconds;
        document.getElementById("done").innerHTML = "";

        // Show Sessions detail on page
        document.getElementById("completed").innerHTML = "Sessions Completed : " + completed_sessions;
        document.getElementById("current").innerHTML = "Current Session : " + session_no;
        
        timer = setInterval(function () {
          session_seconds = session_seconds - 1;
          document.getElementById("seconds").innerHTML = session_seconds;

          // Check if the seconds and minutes counter has reached 0
          // If reached 0 then end the session
          if (session_seconds <= 0) {
            session_minutes = session_minutes - 1;
            document.getElementById("minutes").innerHTML = session_minutes;
            if (session_minutes < 0) {
              // Clears the interval i.e. stops the counter

              clearInterval(timer);

              // Add the message to the html
              document.getElementById("done").innerHTML =
                "Session Completed!! Take a Break";

                // increament sessions
                completed_sessions = completed_sessions + 1;
                session_no = session_no + 1;
                // Show Sessions detail on page
                document.getElementById("completed").innerHTML = "Sessions Completed : " + completed_sessions;
                document.getElementById("current").innerHTML = "Click reset button to reset the timer";

                // show the minutes and seconds
                session_minutes = 0;
                session_seconds = "00";
                // Add the seconds and minutes to the page
                template();

              // PLay the bell sound to tell the end of session
              bell.play();

            }

            // Reset the session seconds to 60
            session_seconds = 60;
          }
        }, interval);
      });
      
      // reset timer functioin
      $("#reset").click(function () {
        clearInterval(timer);

        // Add the message to the html
        document.getElementById("done").innerHTML =
          "";

        // Change the minutes and seconds to starting time
        session_minutes = min;
        session_seconds = "00";
        // Add the seconds and minutes to the page
        template();

        document.getElementById("current").innerHTML = "";
        
        timer = null
      });

      //Time changer function
      $("#time").click(function () {
        clearInterval(timer);

        // Add the message to the html
        document.getElementById("done").innerHTML =
          "";
        
          //change time
          min = $("#time").val();
          session_minutes = min;
          session_seconds = "00";
          template();
          console.log(min);


        document.getElementById("current").innerHTML = "";
        
        timer = null
      });
    });
