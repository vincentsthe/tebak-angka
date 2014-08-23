define([], function() {
	var tc = [];
	tc[1] = [8, 3, 2];
	tc[2] = [5, 2, 5];
	var testcase = {
		getNVariable: function(numTC) {
			return tc[numTC][0];
		},
		getKVariable: function(numTC) {
			return tc[numTC][1];
		},
		getAnswer: function(numTC) {
			return tc[numTC][2];
		},
	};

	return testcase;
});