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
        let degree = Degree.findOne({_id: Router.current().params._id});
        let requirements = degree.sections.majorRequirements;
        let selectedElectives = Meteor.user().profile.selectedElectives;
        let selectedElectiveIds = selectedElectives.map(el => el[1]);
        requirements = requirements.concat(selectedElectiveIds);
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

        let degree = Degree.findOne({_id: Router.current().params._id});
        let requirements = degree.sections.majorRequirements;
        let selectedElectives = Meteor.user().profile.selectedElectives;
        let selectedElectiveIds = selectedElectives.map(el => el[1]);
        requirements = requirements.concat(selectedElectiveIds);
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
