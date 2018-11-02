Template.diagramSidebar.helpers({

// returns whether the current course has been completed or not
  degree: function () {
    let user = Meteor.user().profile.degree;
    return Degree.findOne({name: user});
  },

  completedCredits: function () {
    let userCompletedCourses = Meteor.user().profile.completedReqCourses;
    let acc = 0;
    userCompletedCourses.forEach(course => {
      acc += Course.findOne({id:course}).credits;
    });
    return acc;
  },

  remainingCredits: function () {
    let user = Meteor.user().profile.degree;
    let degree = Degree.findOne({name: user});

    let userCompletedCourses = Meteor.user().profile.completedReqCourses;
    let acc = 0;
    userCompletedCourses.forEach(course => {
      acc += Course.findOne({id:course}).credits;
    });

    return degree.semesterHoursRequired - acc;
  },

  // returns incomplete courses
  remaining: function () {
    let user = Meteor.user().profile;
    let degree = Degree.findOne({name: user.degree});

    let degreeReqs = degree.sections.majorRequirements.slice();
    let userCompletedClasses = user.completedReqCourses;

    let remaining = [];

    degreeReqs.forEach((req) => {
      if (!userCompletedClasses.includes(req)) {
        let course = Course.findOne({id: req});
        remaining.push(course);
      }
    });

    return remaining;
  },

  // returns incomplete, unspecified electives
  electives: function () {
    let user = Meteor.user().profile;
    let degree = Degree.findOne({name: user.degree});

    let electives = degree.sections.electives.slice();
    let userCompletedElectives = user.completedElectives.slice().map(
        el => el[0]);
    let userSelectedElectives = user.selectedElectives.slice().map(
        el => el[0]);

    userCompletedElectives.forEach(el => {
      // guard against student completing more electives than required
      let idx = electives.indexOf(el);

      if (electives.length > 0 && idx > -1) {
        electives.splice(idx, 1); // remove completed elective
      }
    });

    userSelectedElectives.forEach(el => {
        let idx = electives.indexOf(el);

        if (electives.length > 0 && idx > -1) {
            electives.splice(idx, 1);
        }
    })

    let descriptions = [];
    // get the description for each elective

    electives.forEach(el => {
      let description = Elective.findOne({id: el}).name;
      descriptions.push(description);
    });

    return descriptions;
  },

  selected:function() {
      let selectedElectiveIds = Meteor.user().profile.selectedElectives;
      let electiveClasses = [];
      selectedElectiveIds.forEach(elective => {
         electiveClasses.push(Course.findOne({id:elective[1]}))
      });
      return electiveClasses;
  }

  // TODO handle electives that have been specified but not completed
});
