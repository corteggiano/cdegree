Template.diagram.events({

    'click .course-node': function(event) {
        $('#overlay').fadeIn();
        Session.set('selectedCourse', event.currentTarget.dataset.id);
    }

});
