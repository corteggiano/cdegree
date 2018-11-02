Template.overlayCourse.events({

    'click .overlay-close': function(event) {
        $('#overlay').fadeOut();
    },

    'click .select-elective': function(event) {
        Meteor.user().profile.selectedElectives.push([Session.get("selectedCurse"), event.currentTarget.dataset.id]);
    }

});
