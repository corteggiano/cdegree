if(!Meteor.user()) {
    //Router.go("/");
    //TODO remove
    Meteor.loginWithPassword("ursula@ursula.com", "ursula");
}

Template.diagram.helpers({

    //Returns all the courses for now TODO hook to user data
    parents:function(){

        let degreeName = Meteor.user().profile.degree;
        let degree = Degree.findOne({name: degreeName});
        let requirements = degree.sections.majorRequirements;

        let parents = [];

        requirements.forEach(function(element) {
            let course = Course.findOne({id: element});

            var lastChar = element[element.length -1];

            if(course.prereqs.length === 0 && lastChar !== "1" && lastChar !== "2") {
                parents.push(course);
            }
        });

        return parents;

    },

    degree:function () {
        let degreeName = Meteor.user().profile.degree;
        return Degree.findOne({name: degreeName});
    }
    
});
