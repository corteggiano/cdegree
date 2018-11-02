function getDegree() {
  let user = Meteor.user().profile;
  return Degree.findOne({name: user.degree});
}

function getCompletedCourseIds() {
  return Meteor.user().profile.completedReqCourses;
}

function getNumCompletedCredits() {
  let userCompletedCourses = getCompletedCourseIds();
  let acc = 0;
  userCompletedCourses.forEach(course => {
    acc += Course.findOne({id:course}).credits;
  });
  return acc;
}

function getRemainingElectiveIds() {
  let user = Meteor.user().profile;
  let electives = Degree.findOne({name: user.degree}).sections.electives.slice();
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
    // guard against student completing more electives than required
    let idx = electives.indexOf(el);

    if (electives.length > 0 && idx > -1) {
      electives.splice(idx, 1); // remove selected elective
    }
  });

  return electives;
}


Template.diagramSidebar.helpers({
// returns whether the current course has been completed or not
  degree: function () {
    return getDegree();
  },

  completedCredits: function () {
    return getNumCompletedCredits();
  },

  remainingCredits: function () {
    let degree = getDegree();
    return degree.semesterHoursRequired - getNumCompletedCredits() - getRemainingElectiveIds.length;
  },

  // returns incomplete courses
  remaining: function () {
    let degreeReqs = getDegree().sections.majorRequirements.slice();
    let userCompletedClasses = getCompletedCourseIds();

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
    let electives = getRemainingElectiveIds();
    let descriptions = [];
    electives.forEach(el => {
      let description = Elective.findOne({id: el});
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
