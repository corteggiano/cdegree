Template.diagram.helpers({

    //Returns all the courses for now TODO hook to user data
    courses:function(){
        let degree = Degree.findOne(Meteor.user().profile.degree);
        let requirements = degree.majorRequirements;
        return Course.find({requirements});
    },

    diagramToPoints:function() {

    }

});
