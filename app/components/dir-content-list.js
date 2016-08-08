import Ember from 'ember';

export default Ember.Component.extend({
	createRegion: false,
	createTopic: false,
	createExcursion: false,
	showPromptDialog: false,
	actions: {
		openPromptDialog(){
	    	this.set('showPromptDialog', true) 
	    },
	    closePromptDialog() {
	    	this.set('showPromptDialog', false)
	    },
	    saveContent() {
	    	console.log("save ...")
	    },
	}
});
