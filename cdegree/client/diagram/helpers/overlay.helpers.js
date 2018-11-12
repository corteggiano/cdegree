Template.overlayCourse.helpers({

    // returns whether the current course has been completed or not
    course:function(){

        return Course.findOne({id: Session.get('selectedCourse')});

    },

    // returns whether the current course has been completed or not
    isElective:function(){

        return Session.get('selectedCourse') === "1"
            || Session.get('selectedCourse') === "2"
            || Session.get('selectedCourse') === "3"
            || Session.get('selectedCourse') === "4";

    },

    isSelectedElective:function(){
        let courseId = Session.get('selectedCourse');
        let selectedElectiveIds = Meteor.user().profile.selectedElectives.map(el => el[1]);
        return selectedElectiveIds.includes(courseId);
    },

    // returns whether the current course has been completed or not
    current:function(){

        return Elective.findOne({id: parseInt(Session.get('selectedCourse'))});

    },

    // returns whether the current course has been completed or not
    electives:function(){

        let electives = [];

        let elective = Elective.findOne({id: parseInt(Session.get('selectedCourse'))});

        elective.parents.forEach(function(element) {

            let course = Course.findOne({id: element});

            electives.push(course);

        });

        return electives;

    }
});
