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
    }

});
