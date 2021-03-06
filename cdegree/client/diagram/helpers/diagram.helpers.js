if (!Meteor.user()) {
  Router.go("/");
}

Template.diagram.helpers({
  //Returns all the courses for now TODO hook to user data
  parents: function () {

    let degree = Degree.findOne({_id: Router.current().params._id});
    let requirements = degree.sections.majorRequirements;
    let selectedElectives = Meteor.user().profile.selectedElectives;
    let selectedElectiveIds = selectedElectives.map(el => el[1]);
    requirements = requirements.concat(selectedElectiveIds);
    let parents = [];

    requirements.forEach(function (element) {
      let course = Course.findOne({id: element});

      if (course.prereqs.length === 0 && course.credits > 2) {
        parents.push(course);
      }
    });

    return parents;

  }

});
