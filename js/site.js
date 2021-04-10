// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
let currentTurn = "O";
//count boxes marked
let counter = 0;
let setTimer;
let elapsed_seconds = 0;

startTimer();
$("#lblText").text(currentTurn + "'s turn");
$("#lblNew").hide();

$("[id^='btn']").click(function () {
  $(this).text(currentTurn);
  $(this).attr("disabled", "disabled");
  if (currentTurn === "O") {
    currentTurn = "X";
  } else {
    currentTurn = "O";
  }
  counter++;
  $("#lblText").text(currentTurn + "'s turn");
  isOver();
});

function isOver() {
  //is game complete?
  let chk = false;
  let winner = [];
  // eight possible cases
  // 3 horizontals, 3 verticals, 2 diagonals
  let c1 =
    $("#btn-a1").text() === $("#btn-a2").text() &&
    $("#btn-a2").text() === $("#btn-a3").text() &&
    !!$("#btn-a1").text();
  winner.push(c1, $("#btn-a1").text());

  let c2 =
    $("#btn-b1").text() === $("#btn-b2").text() &&
    $("#btn-b2").text() === $("#btn-b3").text() &&
    !!$("#btn-b1").text();
  winner.push(c2, $("#btn-b1").text());
  let c3 =
    $("#btn-c1").text() === $("#btn-c2").text() &&
    $("#btn-c2").text() === $("#btn-c3").text() &&
    !!$("#btn-c1").text();
  winner.push(c3, $("#btn-c1").text());
  let c4 =
    $("#btn-a1").text() === $("#btn-b1").text() &&
    $("#btn-b1").text() === $("#btn-c1").text() &&
    !!$("#btn-a1").text();
  winner.push(c4, $("#btn-a1").text());
  let c5 =
    $("#btn-a2").text() === $("#btn-b2").text() &&
    $("#btn-b2").text() === $("#btn-c2").text() &&
    !!$("#btn-a2").text();
  winner.push(c5, $("#btn-a2").text());
  let c6 =
    $("#btn-a3").text() === $("#btn-b3").text() &&
    $("#btn-b3").text() === $("#btn-c3").text() &&
    !!$("#btn-a3").text();
  winner.push(c6, $("#btn-a3").text());
  //diagonal
  let c7 =
    $("#btn-a1").text() === $("#btn-b2").text() &&
    $("#btn-b2").text() === $("#btn-c3").text() &&
    !!$("#btn-a1").text();
  winner.push(c7, $("#btn-a1").text());
  let c8 =
    $("#btn-a3").text() === $("#btn-b2").text() &&
    $("#btn-b2").text() === $("#btn-c1").text() &&
    !!$("#btn-a3").text();
  winner.push(c8, $("#btn-a3").text());
  console.log(winner);
  chk = jQuery.inArray(true, winner);
  console.log(chk);
  if (chk != -1 || counter == 9) {
    // if so, show the result,
    if (chk > -1) {
      //there is awinner
      $("#lblText").text("winner is " + winner[chk + 1]);
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
