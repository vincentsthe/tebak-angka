define(['testcase', 'storage'], function(testcase, storage) {
	var message = {
		help: function() {

			var str = "<p>Scroll down to read help in English</p><br>=================================================<br><p>Bahasa Indonesia</p>=================================================<br><p>Dalam permainan ini, anda diminta untuk mencari angka yang dipikirkan juri. Masukan himpunan angka pada text area di kiri, masing-masing angka dipisahkan oleh sebuah spasi, tekan tombol 'Submit Guess' dan program akan memberikan respon seperti yang dijelaskan di soal. Bila anda ingin menebak angka yang dipikirkan juri, maka klik tombol 'answer' dan masukkan angka juri tebakkan anda.</p><br><p>Untuk mengganti subtask yang ingin dimainkan, pilih subtask yang ingin dimainkan pada menu dropdown subtask dan klik tombol 'play'. Untuk Mengulang game klik tombol 'reset'.</p><p>Indikator subtask mengindikasikan subtask mana yang telah anda selesaikan, indikator bewarna hijau berarti anda telah berhasil menyelesaikan subtask tersebut. Tekan tombol 'Download Source Code' untuk menghasilkan source code yang berisi kode untuk menyelesaikan subtask yang telah anda selesaikan (anda bisa mengumpulkan source code ini).</p>=================================================<br><p>English</p>=================================================<br><p>In this game, you have to guess the jury's number. Enter the set of number on the left text area, each seperated by a space, and click 'submit guess', the program will give response as described in the problem. If you want to guess the jury's number, click on 'answer' button and input your guess.</p><br><p>To change the subtask played, choose the subtask you want to play in subtask dropdown menu and click 'play'. To reset the game, click on 'reset' button</p><p>Subtask Indicator indicate which subtask you have solve, green indicator means you hage successfully solve that subtask. Press 'Download Source Code' to generate source code that will solve the subtask you have solved (you can submit this source code).</p>";

			return str;
		},
		about: function() {
			var str = "<p>This game is created for the visualisation purpose of Olimpiade Sains Nasional (OSN) 2014 purpose.</p>&#169; 2014 TOKI";

			return str;
		},
		code: function() {
			var ans1,ans2;

			if(storage.isTrue(1)) {
				ans1 = testcase.getAnswer(1);
			} else {
				ans1 = "You have not solve this subtask.";
			}

			if(storage.isTrue(2)) {
				ans2 = testcase.getAnswer(2);
			} else {
				ans2 = "You have not solve this subtask.";
			}

			var str = '<pre>#include &lt;cstdio&gt;\n#include &lt;cstring&gt;\n\nusing namespace std;\nchar subtask[100];\n\nint main() {\n\tscanf("%d", subtask);\n\tif(!strcmp(subtask, ".1.....")) { printf("' + ans1 + '"); }\n\tif(!strcmp(subtask, "..2....")) { printf("' + ans2 + '"); }\n\treturn 0;\n}</pre>';

			return str;
		},
	};

	return message;
});