import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		publishSite() {
			console.log("get action from component")
		},
		previewSite() {
			console.log("get previewSite action from component")
		},
		savePage(page) {
			console.log("get savePage action from component", page)
		},
		saveRegion() {
	    	let regionId = this.get('model.id');
			let regionName = this.get('model.title');
			console.log(regionId, regionName)
			let newRegion = this.store.createRecord('region', {
				bandnummer: regionId,
				title: regionName,
				path: `regionen/${regionId}-${regionName}.md`,
				subtitle: "",
				description: "",
				date: "",
				dateOfPublication: "",
				editor: "",
				editorInstitut: "",
				isbn: "",
				location: "",	
				editionTitle: "",
				pagination: 100,
				extent: [],
				publisher: "",
				bundesland: ["Sachsen", "Thüringen"],
				content: "some content text"
			});

			newRegion.save().then((response) => {
				this.set('model.id', '');
				this.set('model.title', '');
				this.set('showPromptDialog', false);
				this.transitionToRoute('region.edit', `${regionId}-${regionName}.md`);			
			});
	    },
	},
	model() {
    	return this.store.findAll('region-list'); 
  	}
});
