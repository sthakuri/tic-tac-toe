// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
let currentTurn = "O";
//count boxes marked
let counter = 1;
let setTimer;
let elapsed_seconds = 0;

startTimer();
$("#lblText").text(currentTurn + "'s turn");
$("#lblNew").hide();

$("[id^='btn']").on("click", function () {
  $(this).text(currentTurn);
  $(this).attr("disabled", "disabled");
  //display activity
  $("#activityList").append(
    '<li class="list-group-item small">' +
      counter +
      ". Player " +
      currentTurn +
      " marked (" +
      $(this).attr("id").split("-")[1] +
      "," +
      $(this).attr("id").split("-")[2] +
      ")</li>"
  );

  if (currentTurn === "O") {
    currentTurn = "X";
  } else {
    currentTurn = "O";
  }
  counter++;
  $("#lblText").text(currentTurn + "'s turn");
  isOver();

  //scroll to bottom of div
  var objDiv = document.getElementById("activityList");
  objDiv.scrollTop = objDiv.scrollHeight;
});

function isOver() {
  //is game complete?
  let chk = false;
  let winner = [];
  // eight possible cases
  // 3 horizontals, 3 verticals, 2 diagonals
  //horizontals
  let c1 =
    $("#btn-1-1").text() === $("#btn-1-2").text() &&
    $("#btn-1-2").text() === $("#btn-1-3").text() &&
    !!$("#btn-1-1").text();
  winner.push(c1, $("#btn-1-1").text());

  let c2 =
    $("#btn-2-1").text() === $("#btn-2-2").text() &&
    $("#btn-2-2").text() === $("#btn-2-3").text() &&
    !!$("#btn-2-1").text();
  winner.push(c2, $("#btn-2-1").text());
  let c3 =
    $("#btn-3-1").text() === $("#btn-3-2").text() &&
    $("#btn-3-2").text() === $("#btn-3-3").text() &&
    !!$("#btn-3-1").text();
  winner.push(c3, $("#btn-3-1").text());
  //vertical
  let c4 =
    $("#btn-1-1").text() === $("#btn-2-1").text() &&
    $("#btn-2-1").text() === $("#btn-3-1").text() &&
    !!$("#btn-1-1").text();
  winner.push(c4, $("#btn-1-1").text());
  let c5 =
    $("#btn-1-2").text() === $("#btn-2-2").text() &&
    $("#btn-2-2").text() === $("#btn-3-2").text() &&
    !!$("#btn-1-2").text();
  winner.push(c5, $("#btn-1-2").text());
  let c6 =
    $("#btn-1-3").text() === $("#btn-2-3").text() &&
    $("#btn-2-3").text() === $("#btn-3-3").text() &&
    !!$("#btn-1-3").text();
  winner.push(c6, $("#btn-1-3").text());
  //diagonal
  let c7 =
    $("#btn-1-1").text() === $("#btn-2-2").text() &&
    $("#btn-2-2").text() === $("#btn-3-3").text() &&
    !!$("#btn-1-1").text();
  winner.push(c7, $("#btn-1-1").text());
  let c8 =
    $("#btn-1-3").text() === $("#btn-2-2").text() &&
    $("#btn-2-2").text() === $("#btn-3-1").text() &&
    !!$("#btn-1-3").text();
  winner.push(c8, $("#btn-1-3").text());
  console.log(winner);
  chk = jQuery.inArray(true, winner);
  console.log(chk);
  if (chk != -1 || counter > 9) {
    // if so, show the result,
    if (chk > -1) {
      //there is awinner
      $("#lblText").text("Winner is " + winner[chk + 1]);
    } else {
      // there is no winner
      $("#alert").addClass("row alert alert-warning");
      $("#lblText").text("draw");
    }
    // enable new game button
    $("#lblNew").show();
    //disable all boxes
    $("[id^='btn']").attr("disabled", "disabled");

    //stop the timer
    clearInterval(setTimer);
    $("#lbltime").hide();

    //display activity
    $("#activityList").append(
      '<li class="list-group-item small">Winner is ' + winner[chk + 1] + "</li>"
    );
  } else {
    //if not, re-start the timer
    elapsed_seconds = 0;
    return;
  }
}

function get_elapsed_time_string(total_seconds) {
  function pretty_time_string(num) {
    return (num < 10 ? "0" : "") + num;
  }

  var hours = Math.floor(total_seconds / 3600);
  total_seconds = total_seconds % 3600;

  var minutes = Math.floor(total_seconds / 60);
  total_seconds = total_seconds % 60;

  var seconds = Math.floor(total_seconds);

  // Pad the minutes and seconds with leading zeros, if required
  hours = pretty_time_string(hours);
  minutes = pretty_time_string(minutes);
  seconds = pretty_time_string(seconds);

  // Compose the string for display
  var currentTimeString = hours + ":" + minutes + ":" + seconds;

  return currentTimeString;
}

function startTimer() {
  setTimer = setInterval(function () {
    elapsed_seconds = elapsed_seconds + 1;
    $("#lbltime").text(get_elapsed_time_string(elapsed_seconds));
  }, 1000);
}
