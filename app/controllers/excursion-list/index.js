import Ember from 'ember';

export default Ember.Controller.extend({
	createExcursionButton: true,
	createExcursion: false,
	actions: {
		openCreateExcursionDialog() {
			this.set('createExcursion', true);
		},
		closeCreateExcursionDialog() {
			this.set('createExcursion', false);
		},
		createExcursion() {
			console.log("excursion-list ctrl creates excursion");
		},
		openCreateExcursionDialog() {
			this.set('createExcursion', true);
		},
		closeCreateExcursionDialog() {
			this.set('createExcursion', false);
		},
		createExcursionConfirmed(excursionMeta) {
			let bandnummer = this.get('region.bandnummer');
			console.log(excursionMeta);

			let hugoId = bandnummer + "_E_" + excursionMeta.articleNumber
	    	let sanitizeArticleName = excursionMeta.articleName.toLowerCase().trim().dasherize();
	    	var store = this.get('store');
	    	let actualDate = new Date();

	    	var newExcursion = store.createRecord('excursion', {
				"id": `${hugoId}-${sanitizeArticleName}.md`,
				"path": `exkursionen/${hugoId}-${sanitizeArticleName}.md`,
				"hugoId": hugoId,
                "autor": "",
                "title": excursionMeta.articleName,
                "bildnachweise": [],
                "literaturangaben": [],
                "centroid": [51.299247, 12.327872],
                "date": actualDate,
                "description": "",
                "exkursion": [{lat: 51, lon: 12, nr: 1}],
                "exkursionsende": "",
                "exkursionslaenge": 0,
                "exkursionsstart": "",
                "exkursionsstationen": 1,
                "exkursionstypen": [],
                "fremdexkursion": excursionMeta.externalExcursion,
                "actionbound": excursionMeta.actionBound,
                "vg_wort_code": "",
                "vorschaubild": "",
                "zoomstufe": 8,
                "content": ""
            });

	    	var self = this;

			function transitionToPost(hugoId, sanitizeArticleName) {
			  self.transitionToRoute('excursion.edit', `${hugoId}-${sanitizeArticleName}.md`);
			};

			function failure(reason) {
			  console.log(reason);
			};

			newExcursion.save().then(function() {
        transitionToPost(hugoId, sanitizeArticleName);
        self.set('createExcursion', false);
      }).catch(failure);
		},
	}
});