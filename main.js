'use strict';

function parseInput(raw){
	var rowsIn = JSON.parse(raw);
	var sections = {};
	var project = {};
	var mapping = {
		text: [
			[0, 'action'],
			[1, 'section'],
			[2, 'title'],
			[3, 'description']
		],
		practices: [
			[33, 'Front-end', 'lo'],
			[34, 'Front-end', 'hi'],
			[35, 'Back-end', 'lo'],
			[36, 'Back-end', 'hi'],
			[37, 'Android', 'lo'],
			[38, 'Android', 'hi'],
			[39, 'iOS', 'lo'],
			[40, 'iOS', 'hi'],
			[41, 'Design', 'lo'],
			[42, 'Design', 'hi']
		]
	}

	rowsIn.forEach(function(rowIn){
		var feature = {}, value, title, practice, colNum, range, section, sectionTitle;
		for(var i = 0, l = mapping.text.length; i < l; i++){
			colNum = mapping.text[i][0];
			title = mapping.text[i][1];
			feature[title] = rowIn[colNum];
		}

		sectionTitle = feature['section'];
		section = sections[sectionTitle] = (sections[sectionTitle] || {
			title: sectionTitle,
			features: []
		});
		section.features.push(feature);

		for(var i = 0, l = mapping.practices.length; i < l; i++){
			colNum = mapping.practices[i][0];
			practice = mapping.practices[i][1];
			range = mapping.practices[i][2];
			value = Number(rowIn[colNum]);

			feature[practice] = (feature[practice] || {
				'lo': 0,
				'hi': 0
			});
			feature[practice][range] = value;

			section[practice] = (section[practice] || {
				'lo': 0,
				'hi': 0,
				'optional': {
					'lo': 0,
					'hi': 0
				}
			});
			section[practice][range] += feature[practice][range];

			if(feature['action'] == 'o'){
				section[practice]['optional'][range] += feature[practice][range];
			}
		}
	});

	return {
		project: project,
		sections: sections
	};
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
