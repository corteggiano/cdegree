Template.overlayCourse.helpers({

    // returns whether the current course has been completed or not
    course:function(){

        return Course.findOne({id: Session.get('selectedCourse')});

    }

});
