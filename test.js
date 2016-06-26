// var fs = require('fs');
//
// var playing_status = 'playing ' + play_count + ' times at ' + time.toLocaleTimeString();
//
//
// fs.writeFile('playing_status.txt', playing_status, (err) => {
//   if (err){
//       throw err;
//   }
//   console.log('It\'s saved!');
// });


setTimeout(function(str1, str2) {
  console.log(str1 + " " + str2);
}, 1000, "Hello.", "How are you?");

setTimeout(function(str1, str2) {
  console.log(str1 + " " + str2);
}, 2000, "Hi.", "How are you?");

setTimeout(function(str1, str2) {
  console.log(str1 + " " + str2);
}, 3000, "HEO.", "How are you?");