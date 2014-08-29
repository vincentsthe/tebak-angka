define(['storage', 'jquery', 'testcase', 'notifier', 'textarea', 'message'], 
	function(storage, $, testcase, notifier, textarea, message) {
	
	$(document).ready(function() {
		var done;
		var currentTC;
		var lock;
		var remaining;

		var answer = function(x) {
			textarea.insertRight("0 " + x);
			if(x === testcase.getAnswer(currentTC)) {
				notifier.createAlert("Correct Answer!");
			} else {
				notifier.createAlert("Wrong Answer!");
			}
			done = true;
		};

		var displayOption = function() {
			var overlay = document.createElement("div");
			overlay.setAttribute("id", "overlay");
			document.body.appendChild(overlay);

			var notifBox = document.createElement("div");
			notifBox.setAttribute("id", "notif-box");
			overlay.appendChild(notifBox);

			var title = document.createElement("p");
			title.innerHTML = "Write your guessed number.";
			notifBox.appendChild(title);

			var input = document.createElement("input");
			input.setAttribute("class", "form-control answer");
			input.setAttribute("id", "answer");
			notifBox.appendChild(input);

			var answerButton = document.createElement("button");
			answerButton.setAttribute("class", "btn btn-warning notif-button");
			answerButton.setAttribute("id", "answer-button");
			notifBox.appendChild(answerButton);

			var button = document.createElement("button");
			button.setAttribute("class", "btn btn-danger notif-button");
			button.setAttribute("id", "notif-button");
			notifBox.appendChild(button);

			$("#notif-button").html("Cancel");
			$("#answer-button").html("Answer");

			$("#notif-button").click(function() {
				$("#overlay").remove();
			});

			$("#answer-button").click(function() {
				var ans = parseInt($("#answer").val());
				$("#overlay").remove();
				if(isNaN(ans)) {
					notifier.createAlert("Invalid Answer");
				} else {
					if(ans == testcase.getAnswer(currentTC)) {
						notifier.createAlert("Correct Answer!");
						setSubtaskTrue(currentTC);
						colorSubtask();
						done = true;
					} else {
						notifier.createAlert("Wrong Answer!");
						done = true;
						$("#warning").html("You lose! click on reset button to play again.");
					}
				}
			});
		};

		var colorSubtask = function() {
			for(var i=1 ; i<=2 ; i++) {
				if(storage.isTrue(i)) {
					$("#tc-" + i).css("background-color", "#2ca02c");
				}
			}
		}

		var tebak = function() {
			if(remaining == 0) {
				notifier.createAlert("You may not submit guess anymore.");
			} else {
				var str = $("#text").val();
				var array = str.split(" ");

				var currentGuess = [];

				for(var i=0 ; i<array.length ; i++) {

					if(!isNaN(parseInt(array[i]))) {
						var ada = false;
						for(var j=0 ; j<currentGuess.length ; j++) {
							if(currentGuess[j] == parseInt(array[i])) {
								ada = true;
							}
						}

						if((!ada) && (parseInt(array[i]) <= testcase.getNVariable(currentTC)) && (parseInt(array[i]) > 0)) {
							currentGuess.push(parseInt(array[i]));
						}
					}
				}
				if(currentGuess.length > 0) {
					var str = currentGuess.length + "";
					for(var i=0 ; i<currentGuess.length ; i++) {
						str = str + " " + currentGuess[i];
					}
					textarea.insertLeft(str);

					var isSame = false;
					var isClose = false;

					for(var i=0 ; i<currentGuess.length ; i++) {
						if(Math.abs(currentGuess[i] - testcase.getAnswer(currentTC)) == 1) {
							isClose = true;
						}
						if(currentGuess[i] == testcase.getAnswer(currentTC)) {
							isSame = true;
						}
					}

					if(isSame === true) {
						textarea.insertRight("YA");
					} else if(isClose === true) {
						textarea.insertRight("BISAJADI");
					} else {
						textarea.insertRight("TIDAK");
					}
					remaining--;
				} else {
					notifier.createAlert("Your number set is empty.");
				}
			}
			$("#text").val("");
		}

		var setSubtaskTrue = function(numTC) {
			storage.setTrue(numTC);
			colorSubtask();
		};

		var init = function(numTC) {
			currentTC = numTC;
			colorSubtask();
			done = false;
			textarea.reset();
			$("#warning").html("");
			$("#text").val("");
			textarea.insertLeft(testcase.getNVariable(currentTC) + " " + testcase.getKVariable(currentTC));
			remaining = testcase.getKVariable(currentTC);
		};

		init(1);

		$("#guessButton").click(function() {
			if(!done) {
				tebak();
			}
		});

		$("#answerButton").click(function() {
			if(!done) {
				displayOption();
			}
		});

		$("#reset").click(function() {
			init(currentTC);
		});

		$("#play").click(function() {
			init($("#testcase").val());
		});

		$("#help").click(function() {
			notifier.createText(message.help());
		});

		$("#about").click(function() {
			notifier.createText(message.about());
		});

		$("#source").click(function() {
			notifier.createSource(message.code());
		});
	});

});