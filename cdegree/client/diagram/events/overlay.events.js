Template.overlayCourse.events({

    'click .overlay-close': function(event) {
        $('#overlay').fadeOut();
    },

    'click .select-elective': function(event) {
        let electiveType = parseInt(Session.get("selectedCourse"));
        let profile = Meteor.user().profile;
        let newElectives = profile.selectedElectives.slice()
        newElectives.push([electiveType, event.currentTarget.dataset.id]);
        profile['selectedElectives'] = newElectives;
        Meteor.users.update({_id:Meteor.user()._id}, {$set: {profile: profile}});
        $('#overlay').fadeOut();
    }

});
