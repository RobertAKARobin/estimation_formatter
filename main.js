'use strict';

var Wrapper = (function(){
	return {
		view: function(){
			return [
				m('h1', 'Hello, world')
			]
		}
	}
})();

document.addEventListener('DOMContentLoaded', function(){
	m.mount(document.getElementById('output'), Wrapper);
});
