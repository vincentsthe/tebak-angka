define([], function() {
	var tc = [];
	tc[1] = [8, 3, 2];
	tc[2] = [64, 6, 15];
	var header = ["", ".1.....", "..2...."];
	var testcase = {
		getNVariable: function(numTC) {
			return tc[numTC][0];
		},
		getKVariable: function(numTC) {
			return tc[numTC][1];
		},
		getAnswer: function(numTC) {
			return "0 " + tc[numTC][2] + "\\n";
		},
	};

	return testcase;
});