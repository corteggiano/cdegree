Template.node.helpers({

    // returns whether the current course has been completed or not
    isCompleted:function(){
        let userCompletedCourses = Meteor.user().profile.completedReqCourses;
        return userCompletedCourses.includes(this.id);
    },

    // returns whether the current course is in progress
    isInProgress:function(){
        let userInProgressCourses = Meteor.user().profile.inProgressCourses;
        return userInProgressCourses.includes(this.id);
    },

    // returns whether the current course is in progress
    hasChilds:function(){
        let degreeName = Meteor.user().profile.degree;
        let degree = Degree.findOne({name: degreeName});
        let requirements = degree.sections.majorRequirements;
        let selectiveElectives = Meteor.user().profile.selectiveElectives;
        let selectedElectiveIds = selectiveElectives.map(el => el[1]);
        requirements.concat(selectedElectiveIds);
        let prereqs = Course.find({"prereqs" : this.id});

        let childs = [];

        requirements.forEach(function(element) {
            let course = Course.findOne({id: element});

            prereqs.forEach(function(element) {
                if(course.id === element.id) {
                    childs.push(course);
                }
            });

        });

        return childs.length > 0;
    },


    childs:function(){

        let degreeName = Meteor.user().profile.degree;
        let degree = Degree.findOne({name: degreeName});
        let requirements = degree.sections.majorRequirements;
        let prereqs = Course.find({"prereqs" : this.id});

        let childs = [];

        requirements.forEach(function(element) {
            let course = Course.findOne({id: element});

            prereqs.forEach(function(element) {
                if(course.id === element.id) {
                    childs.push(course);
                }
            });

        });

        return childs;

    },

});
