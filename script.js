let SongsArray = [
	['JEOPARDY! THE GREATEST OF ALL TIME MAIN THEME (FAN EDIT)', "Jeopardy_The_Greatest.mp3", "WBrbp8kyNVw"],
	['JEOPARDY! Theme 2008 - 2020', "Jeopardy_Theme_2008.mp3", "g3Kq1vURcL8"],
	['JEOPARDY! College Championship Theme 2020', "Jeopardy_College_2020.mp3", "WeqKpR32s4M"],
	['JEOPARDY! Think theme 1964 - 1975', "Jeopardy_Think_1964.mp3", "9rwA3k5CmBc"],
	['JEOPARDY! Think theme 1984 - 1997', "Jeopardy_Think_1984.mp3", "vXGhvoekY44"],
	['JEOPARDY! Think theme 1997 - 2008', "Jeopardy_Think_1997.mp3", "4003xkcTJmI"],
	['JEOPARDY! Think theme 2008 - 2020', "Jeopardy_Think_2008.mp3", "dwH1daa8NY8"],
	['JEOPARDY! THE GREATEST OF ALL TIME Think Theme', "Jeopardy_The_Greatest_Think.mp3", "jAopae-9Kgw"]
];

var song = document.getElementById('song');

window.onload = firstFunction();

function firstFunction() {
	if(localStorage["loading.darktheme"] == 1) {
		var checkBox = $("#switchToggle");
		checkBox.prop("checked", true);
		changeTheme(checkBox[0]);
	} else {
		localStorage["loading.darktheme"] = 0;
	}
	let RandomSong = Math.floor(Math.random() * SongsArray.length);
	console.log(RandomSong);
	song.src = "resourcen/music/" + SongsArray[RandomSong][1];
	songtitle = $("#song_title");
	songtitle.attr("href", "https://www.youtube.com/watch?v=" + SongsArray[RandomSong][2]);
	songtitle.text(SongsArray[RandomSong][0])
}

function loadsong() {
	if (song.paused) {
		song.play();
	}
}

function addpoint() {
	var span_text = $("#text").text();
	if(span_text.indexOf("...") !== -1){
		$("#text").text("Loading Please Wait");
	} else {
		$("#text").append(".");
	}
}

function songmute() {
	if(song.volume > 0) {
		song.volume = 0;
		$("#change_volume").removeClass("fa-volume-up");
		$("#change_volume").addClass("fa-volume-mute");
	} else {
		song.volume = 1;
		$("#change_volume").removeClass("fa-volume-mute");
		$("#change_volume").addClass("fa-volume-up");
	}
}

//Ajax ruft die Funktion jede Sekunde auf.
setInterval(function(){
	addpoint()
}, 1000);

//Custom Context

$(document).bind("contextmenu",function(e){
	e.preventDefault();
	console.log(e.pageX + "," + e.pageY);
	$("#menu").css("left", e.pageX);
	$("#menu").css("top", e.pageY);
	$("#menu").fadeIn(200, startFocusOut());
});

function startFocusOut() {
	$(document).on("click",function(){
		$("#menu").hide();
		$(document).off("click");
		console.log("bla")
	});
}

//Prevent console

$(document).keydown(function (event) {
	if (event.keyCode == 123 || event.ctrlKey && event.shiftKey && event.keyCode == 67 || event.ctrlKey && event.shiftKey && event.keyCode == 73) {
		return false;
	}
});

//Nightmode

function changeTheme(checkboxElem) {
	console.log(checkboxElem);
	if(checkboxElem.checked) {
		$('body').addClass('dark_design');
		$('#menu').css("background-color", "#1F232A");
		$('.fa-eye').css("color", "rgba(18,20,25,0.1)");
		localStorage["loading.darktheme"] = 1;
	} else {
		$('body').removeClass('dark_design');
		$('#menu').css("background-color", "");
		$('.fa-eye').css("color", "");
		localStorage["loading.darktheme"] = 0;
	}
}

//Confetti

function letitrain() {

    $("#text").addClass("rainbow");
    $(".fa-eye").removeAttr("onclick");

	let W = window.innerWidth;
	let H = window.innerHeight;
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	const maxConfettis = 150;
	const particles = [];
	const possibleColors = [
	  "DodgerBlue",
	  "OliveDrab",
	  "Gold",
	  "Pink",
	  "SlateBlue",
	  "LightBlue",
	  "Gold",
	  "Violet",
	  "PaleGreen",
	  "SteelBlue",
	  "SandyBrown",
	  "Chocolate",
	  "Crimson"
	];
	function randomFromTo(from, to) {
	  return Math.floor(Math.random() * (to - from + 1) + from);
	}
	function confettiParticle() {
	  this.x = Math.random() * W; // x
	  this.y = Math.random() * H - H; // y
	  this.r = randomFromTo(11, 33); // radius
	  this.d = Math.random() * maxConfettis + 11;
	  this.color =
		possibleColors[Math.floor(Math.random() * possibleColors.length)];
	  this.tilt = Math.floor(Math.random() * 33) - 11;
	  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
	  this.tiltAngle = 0;
	  this.draw = function() {
		context.beginPath();
		context.lineWidth = this.r / 2;
		context.strokeStyle = this.color;
		context.moveTo(this.x + this.tilt + this.r / 3, this.y);
		context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
		return context.stroke();
	  };
	}
	function Draw() {
	  const results = [];
	  // Magical recursive functional love
	  requestAnimationFrame(Draw);
	  context.clearRect(0, 0, W, window.innerHeight);
	  for (var i = 0; i < maxConfettis; i++) {
		results.push(particles[i].draw());
	  }
	  let particle = {};
	  let remainingFlakes = 0;
	  for (var i = 0; i < maxConfettis; i++) {
		particle = particles[i];
		particle.tiltAngle += particle.tiltAngleIncremental;
		particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
		particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;
		if (particle.y <= H) remainingFlakes++;
		// If a confetti has fluttered out of view,
		// bring it back to above the viewport and let if re-fall.
		if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
		  particle.x = Math.random() * W;
		  particle.y = -30;
		  particle.tilt = Math.floor(Math.random() * 10) - 20;
		}
	  }
	  return results;
	}
	window.addEventListener(
	  "resize",
	  function() {
		W = window.innerWidth;
		H = window.innerHeight;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	  },
	  false
	);
	// Push new confetti objects to `particles[]`
	for (var i = 0; i < maxConfettis; i++) {
	  particles.push(new confettiParticle());
	}
	// Initialize
	canvas.width = W;
	canvas.height = H;
	Draw();
}
