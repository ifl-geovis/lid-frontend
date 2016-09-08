import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
      console.log("model hook from route");
      let model = {}
      model.region = this.store.findRecord('region', params.id, { reload: true });
      model.excursion = this.store.query('excursion-list', {
        id: params.id
      });
      model.topic = this.store.query('topic-list', {
        id: params.id
      });
      
      return model
  },
  actions: {
     regionList() {
      this.transitionTo('/');
    },
    deleteInfo(model) {
      let store = this.get('store');
      store.findRecord('region', model).then(function(region) {
        //store.unloadRecord(region);
        store.deleteRecord(region);
        region.save();                  
      });
      
      this.transitionTo('index');
    }
  },  
});

