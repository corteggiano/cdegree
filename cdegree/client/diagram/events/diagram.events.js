Template.diagram.events({

    'click .course-node': function(event) {
        $('#overlay').fadeIn();

        var course = Course.findOne({id: event.currentTarget.dataset.id});

        $('.prereq').removeClass("prereq");

        course.prereqs.forEach(function(id) {

            $('[data-id="'+id+'"]').addClass("prereq");

        });

        Session.set('selectedCourse', event.currentTarget.dataset.id);
    }

});
