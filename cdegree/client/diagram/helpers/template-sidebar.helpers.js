Template.diagramSidebar.helpers({

// returns whether the current course has been completed or not
  degree:function(){
    let user = Meteor.user().profile.degree;
    return Degree.findOne({name:user});
  },

  // returns incomplete courses
  remaining:function(){
    let user = Meteor.user().profile;
    let degree = Degree.findOne({name:user.degree});

    let degreeReqs = degree.sections.majorRequirements.slice();
    let userCompletedClasses = user.completedReqCourses;

    let remaining = [];

    degreeReqs.forEach((req) => {
      if (!userCompletedClasses.includes(req)){
        let course = Course.findOne({id: req});
        remaining.push(course);
        console.log(course);
      }
    });

    return remaining;
  },

  // returns incomplete electives

});
