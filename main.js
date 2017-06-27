'use strict';

var Input;

var Wrapper = (function(){
	return {
		view: function(){
			return [
				m('p', Input)
			];
		}
	}
})();

window.addEventListener('message', function(event){
	Input = event.data;
	m.mount(document.getElementById('output'), Wrapper);
});
