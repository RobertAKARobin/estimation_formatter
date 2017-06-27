'use strict';

function parseInput(raw){
	var rowsIn = JSON.parse(raw);
	var rowsOut = [];
	var sections = {};
	var project = {};
	var mapping = {
		1:	['section'],
		2:	['title'],
		3:	['description'],
		33:	['Front-end', 'lo'],
		34:	['Front-end', 'hi'],
		35:	['Back-end', 'lo'],
		36:	['Back-end', 'hi'],
		37:	['Android', 'lo'],
		38:	['Android', 'hi'],
		39:	['iOS', 'lo'],
		40:	['iOS', 'hi'],
		41:	['Design', 'lo'],
		42:	['Design', 'hi']
	}

	rowsIn.forEach(function(rowIn){
		var rowOut = {}, value, title, range;
		for(var i = 0, l = rowIn.length; i < l; i++){
			if(!mapping[i]){
				continue;
			}
			title = mapping[i][0];
			range = mapping[i][1];
			value = rowIn[i];
			if(range){
				rowOut[title] = (rowOut[title] || {'lo': 0, 'hi': 0});
				rowOut[title][range] = Number(value);
			}else{
				rowOut[title] = value;
			}
		}
		rowsOut.push(rowOut);
	});

	return rowsOut;
}

var Input;

var Wrapper = (function(){
	return {
		view: function(){
			return [
				m('p', JSON.stringify(Input))
			];
		}
	}
})();

window.addEventListener('message', function(event){
	Input = parseInput(event.data);
	console.log(Input);
	m.mount(document.getElementById('output'), Wrapper);
});
