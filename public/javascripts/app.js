/**
 * Created by Shawn on 8/28/15.
 */
// g prefix means global
var gChance = new Chance(348);// for getting random numbers
var gInterval = false;// for storing automation gInterval in
var $gStudent = $('#student_div');
var gStudentsArray = [];// to store shout outs in
var gTimerInterval = false;// stores the countdown interval id
var gSpeed = 5;// how often to automagically display items

$(document).ready(function () {
	$('#show_btn').on('click', function () {
		display();
	});
	$('#magic_btn').on('click', automagic);
	$('#muggle_btn').on('click', muggle);
	$('#up_btn').on('click', function () {
		gSpeed++;
		showSpeed();
		disableDown();
		if(gInterval != false) {// only activate if already running
			muggle();
			automagic();
		}
	});
	$('#down_btn').on('click', function () {
		if(gSpeed > 1) {// don't do anything if 0
			gSpeed--;
			showSpeed();
			disableDown();
			if(gInterval != false) {// only activate if already running
				muggle();
				automagic();
			}
		}
	});
	$('#options_btn').on('click', function () {
		console.log('options clicked');
		$('#options_div').collapse('toggle');
	});

	showSpeed();

	var ajaxCall = $.ajax({
		dataType: 'json',
		type: 'GET',
		url: '/students'
	});

	ajaxCall.done(function (data) {
		gStudentsArray = JSON.parse(data);
		console.log("json", gStudentsArray);
		display();
	});

});

// displays student and shout out
function display() {
	var index = gChance.integer({min: 0, max: gStudentsArray.length - 1});
	//$gStudent.toggle('blind', 'down');

	var $div = $('<div>', {
		"class" : "student"
	});
	var $pName = $('<p>', {
		"class": "name"
	}).text(gStudentsArray[index].name);
	var $pShout = $('<p>', {
		"class": "shout"
	}).text(gStudentsArray[index].shoutOut);

	$gStudent.toggle('shake', function () {
		$gStudent.empty().append($div.append($pName, $pShout)).toggle('drop', 'slow');

	});
}

// automagically display students
function automagic() {
	countDown(gSpeed);
	gInterval = setInterval(function() {
		clearInterval(gTimerInterval);
		countDown(gSpeed);
		display();
	}, gSpeed * 1000);
}

// stop magical display
function muggle() {
	clearInterval(gInterval);
	clearInterval(gTimerInterval);
	gInterval = false;
	gTimerInterval = false;
}

// countdown timer for automagic mode
function countDown(time) {
	gTimerInterval = setInterval(function () {
		$('#timer_spn').text(time);
		time--;
	}, 900)
}

// shows speed in options and timer
function showSpeed() {
	$('#timer_spn').text(gSpeed);
	$('#speed_p').text(gSpeed);
}

// disables decrement button for speed
function disableDown() {
	$('#down_btn').prop('disabled', (gSpeed == 1) ? true: false);
}