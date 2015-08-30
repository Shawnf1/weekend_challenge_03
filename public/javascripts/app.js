/**
 * Created by Shawn on 8/28/15.
 */
var chance = new Chance();
var $student = $('#student_div');
$(document).ready(function () {
	var studentsArray = [];
	console.log('ready');
	var ajaxCall = $.ajax({
		dataType: 'json',
		type: 'GET',
		url: '/students'
	});

	ajaxCall.done(function (data) {
		//$('body').append($('<p>').text(data));
		studentsArray = JSON.parse(data);
		console.log("json", studentsArray);
		display();
	});

	function display() {
		var index = chance.integer({min: 0, max: studentsArray.length});


		//$div = $('<div>').append($('<p>', {
		//
		//}))
		$div = $('<div>', {
			"class" : "student"
		});
		$pName = $('<p>', {
			"class": "name"
		}).text(studentsArray[index].name);
		$pShout = $('<p>', {
			"class": "shout"
		}).text(studentsArray[index].shoutOut);

		//$div.clone().append($pName.clone().text(studentsArray[index])).
		//	$student.empty()
		//	.append($div.clone()
		//		.append($pName.clone().text(studentsArray[index].name))
		//		.append($pShout.clone().text(studentsArray[index].shoutOut)));
		$student.append($div.append($pName, $pShout));
		//var counter = 0;
		//studentsArray.forEach(function (elem) {
		//	$('body').append($('<p>').text("Counter "+ counter +" "+ JSON.stringify(elem)));
		//	counter++;
		//})
	}
});