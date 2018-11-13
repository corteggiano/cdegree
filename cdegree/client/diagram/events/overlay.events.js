Template.overlayCourse.events({
  "click .overlay-close": function(event) {
    $("#overlay").fadeOut();
      $('.prereq').removeClass("prereq");
  },

  "click .select-elective": function(event) {
    let electiveType = parseInt(Session.get("selectedCourse"));
    let profile = Meteor.user().profile;
    let newElectives = profile.selectedElectives.slice();
    newElectives.push([electiveType, event.currentTarget.dataset.id]);
    profile["selectedElectives"] = newElectives;
    Meteor.users.update(
      { _id: Meteor.user()._id },
      { $set: { profile: profile } }
    );
    $("#overlay").fadeOut();
    $("#course-added")
      .fadeIn(100)
      .delay(1200)
      .fadeOut(400);
  },

  'click .replace-elective': function(event) {
      let electiveId = Session.get("selectedCourse");
      let selectedElectives = Meteor.user().profile.selectedElectives;
      let electiveType = -1;
      selectedElectives.forEach(elective => {
          if (elective[1] === electiveId) {
              electiveType = elective[0]
          }
      });
      if (electiveType !== -1) {

          Session.set("selectedCourse", electiveType.toString());
          let foundIndex = selectedElectives.findIndex(elective => {
              return elective[1] === electiveId;
          });
          selectedElectives.splice(foundIndex,1);
          let toBeRemoved = [];
          selectedElectives.forEach(elective => {
             let course = Course.findOne({"id":elective[1]});
             if (course.prereqs.includes(electiveId)) {
                 toBeRemoved.push(elective);
             }
          });
          toBeRemoved.forEach(el => {
              let index = selectedElectives.indexOf(el);
              selectedElectives.splice(index, 1);
          });

          let profile = Meteor.user().profile;
          profile['selectedElectives'] = selectedElectives;
          Meteor.users.update({_id:Meteor.user()._id}, {$set: {profile: profile}});
      } else {
          console.log("Error, elective type not found for selected elective.");
      }
  }
});
