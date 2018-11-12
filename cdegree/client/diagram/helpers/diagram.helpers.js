if(!Meteor.user()) {
   // Router.go("/");
}

Template.diagram.helpers({

    //Returns all the courses for now TODO hook to user data
    parents:function(){

        let degree = Degree.findOne({_id: Router.current().params._id});
        let requirements = degree.sections.majorRequirements;

        let parents = [];

        requirements.forEach(function(element) {
            let course = Course.findOne({id: element});

            if(course.prereqs.length === 0 && course.credits > 2) {
                parents.push(course);
            }
        });

        return parents;

    }
    
});
