define(['guesser', 'storage', 'jquery', 'testcase', 'notifier', 'textarea'], 
	function(guesser, storage, $, testcase, notifier, textarea) {
	
	$(document).ready(function() {
		var done;
		var currentTC;
		var lock;
		var currentGuess;
		var remaining;

		var answer = function(x) {
			textarea.insertRight("0 " + x);
			if(x === testcase.getAnswer(currentTC)) {
				notifier.createAlert("Jawaban Anda Benar!");
			} else {
				notifier.createAlert("Jawaban Anda Salah!");
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
			title.innerHTML = "Pilih Jawaban Anda";
			notifBox.appendChild(title);

			var appendButton = function(x) {
				var div = document.createElement("div");
				div.setAttribute("class", "col-md-4");
				notifBox.appendChild(div);

				var btn = document.createElement("div");
				btn.setAttribute("id", "answer" + x);
				btn.setAttribute("class", "number");
				btn.innerHTML = x;
				div.appendChild(btn);

				$("#answer" + x).click(function() {
					$("#overlay").remove();
					answer(x);
				});
			};

			for(var i=1 ; i<=testcase.getNVariable(currentTC) ; i++) {
				appendButton(i);
			}

			var clear = document.createElement("div");
			clear.setAttribute("class", "clearfix");
			notifBox.appendChild(clear);

			var button = document.createElement("button");
			button.setAttribute("class", "btn btn-warning");
			button.setAttribute("id", "notif-button");
			notifBox.appendChild(button);

			$("#notif-button").html("Batalkan");

			$("#notif-button").click(function() {
				$("#overlay").remove();
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
			var isSame = false;
			var isClose = false;


			if(remaining == 0) {
				notifier.createAlert("Batas anda menebak telah habis.");
			} else {
				if(currentGuess.length > 0) {
					var str = currentGuess.length + "";
					for(var i=0 ; i<currentGuess.length ; i++) {
						str = str + " " + currentGuess[i];
					}
					textarea.insertRight(str);

					for(var i=0 ; i<currentGuess.length ; i++) {
						if(currentGuess[i] == testcase.getAnswer(currentTC)) {
							isSame = true;
						} else if(Math.abs(currentGuess[i] - testcase.getAnswer(currentTC)) == 1) {
							isClose = true;
						}
					}

					if(isSame === true) {
						notifier.createAlert("YA");
						textarea.insertLeft("YA");
					} else if(isClose === true) {
						notifier.createAlert("BISAJADI");
						textarea.insertLeft("BISAJADI");
					} else {
						notifier.createAlert("TIDAK");
						textarea.insertLeft("TIDAK");
					}

					remaining--;
				} else {
					notifier.createAlert("Tidak bisa menebak himpunan kosong.");
				}
			}

			for(var i=currentGuess.length-1 ; i>=0 ; i--) {
				removeTemp(currentGuess[i]);
			}
		}

		var setSubtaskTrue = function(numTC) {
			storage.setTrue(numTC);
			colorSubtask();
		};

		var removeTemp = function(x) {
			$("#divNumber" + x).remove();
			var index = currentGuess.indexOf(x);
			currentGuess.splice(index, 1);
			$("#number" + x).css("visibility", "visible");
		};

		var addToGuess = function(x) {
			currentGuess.push(x);
			var outerDiv = document.createElement("div");
			outerDiv.setAttribute("id", "divNumber" + x);
			outerDiv.setAttribute("class", "col-md-3");
			document.getElementById("guess").appendChild(outerDiv);

			var number = document.createElement("div");
			number.setAttribute("class", "number");
			number.setAttribute("id", "numberTemp" + x);
			number.innerHTML = x;
			outerDiv.appendChild(number);

			$("#number" + x).css("visibility", "hidden");
			$("#numberTemp" + x).click(function() {
				removeTemp(x);
			});
		};

		var appendToNumberBox = function(x) {
			var outerDiv = document.createElement("div");
			outerDiv.setAttribute("class", "col-md-4");
			document.getElementById("numberBox").appendChild(outerDiv);

			var number = document.createElement("div");
			number.setAttribute("class", "number");
			number.setAttribute("id", "number" + x);
			number.innerHTML = x;
			outerDiv.appendChild(number);

			$("#number" + x).click(function() {
				addToGuess(x);
			});
		};

		var init = function(numTC) {
			currentTC = numTC;
			colorSubtask();
			done = false;
			textarea.reset();
			currentGuess = [];
			$("#guess").empty();
			$("#numberBox").empty();
			textarea.insertLeft(testcase.getNVariable(currentTC) + " " + testcase.getKVariable(currentTC));
			remaining = testcase.getKVariable(currentTC);
			for(var i=1 ; i<=testcase.getNVariable(currentTC) ; i++) {
				appendToNumberBox(i);
			}

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
	});

});