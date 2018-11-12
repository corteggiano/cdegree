Template.overlayCourse.helpers({

  // returns whether the current course has been selected or not
  course: function () {
    return Course.findOne({id: Session.get('selectedCourse')});
  },

  // is the currently-selected course an elective?
  isElective: function () {
    return Session.get('selectedCourse') === "1"
        || Session.get('selectedCourse') === "2"
        || Session.get('selectedCourse') === "3"
        || Session.get('selectedCourse') === "4";
  },

  // returns whether the current course has been completed or not
  current: function () {
    return Elective.findOne({id: parseInt(Session.get('selectedCourse'))});
  },

  // returns whether the current course has been completed or not
  electives: function () {
    let electives = [];

    let elective = Elective.findOne(
        {id: parseInt(Session.get('selectedCourse'))});
    elective.parents.forEach(function (element) {
      let course = Course.findOne({id: element});
      electives.push(course);
    });

    return electives;
  },

  // is this course already chosen for another elective
  isAlreadyChosen: function () {
    let user = Meteor.user().profile;
    let completedElectives = user.completedElectives.slice().map(el => el[1]);
    let selectedElectives = user.selectedElectives.map(el => el[1]);

    return completedElectives.includes(this.id)
        || selectedElectives.includes(this.id);
  },

  // is this course missing a prerequisite?
  isMissingPrereq: function () {
    // major requirements
    let degree = Degree.findOne({_id: Router.current().params._id});
    let requirements = degree.sections.majorRequirements;
    console.log("reqs", requirements);

    // prerequisites for this class
    let prereqs = Course.findOne({id: this.id}).prereqs;
    let prerequisites = [];
    prereqs.forEach(prereq => {
      prerequisites.push(prereq);
    });

    console.log(this.id);
    console.log(prerequisites);

    // if no prerequisites, fine to add
    if (prerequisites.length === 0) {
      return false;
    }


    for (let i = 0; i < prerequisites.length; i++) {
      let prereq = prerequisites[i];

      // if we have a requirement not met by the degree, bad
      if (!requirements.includes(prereq)) {
        return true;
      }
    }

    // if all prerequisites will be satisfied by degree requirements, fine
    return false;
  }
});
