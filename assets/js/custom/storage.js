 define([], function() {
	var storage = {
		init: function() {
			if(!(localStorage.subtaskta1)) {
				localStorage.subtaskta1 = "false";
			};
			if(!(localStorage.subtaskta2)) {
				localStorage.subtaskta2 = "false";
			};
		},
		setTrue: function(n) {
			if(n === 1) {
				localStorage.subtaskta1 = "true";
			} else if(n === 2) {
				localStorage.subtaskta2 = "true";
			}
		},
		isTrue: function(n) {
			if(n == 1) {
				return (localStorage.subtaskta1 === "true");
			} else if(n == 2) {
				return (localStorage.subtaskta2 === "true");
			}
		}
	};
	return storage;
});