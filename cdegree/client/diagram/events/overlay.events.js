/**
 * Add the course with the given id to the diagram.
 * @param {String} id the course id to add to the diagram.
 */
function addToDiagram(id) {
  console.log("add", id);
  let toAdd = [];

  let course = Course.findOne({id: id});

  // create node for id
  toAdd.push(formatAsNodeToAdd(course));

  // create edges for id
  course.prereqs.forEach(prereq => {
    toAdd.push(formatAsEdgeToAdd(prereq, course.id));
  });

  console.log(toAdd);

  cy.add(toAdd);
}

/**
 * Format this course as a node for the diagram.
 * @param {Object} course
 * @returns {{group: "nodes", data: {id: String, name: String, status: String}}}
 */
function formatAsNodeToAdd(course) {
  return {
    group: "nodes",
    data: {
      id: course.id,
      name: course.name,
      status: getCourseStatus(course)
    }
  };
}

/**
 * Format the edges from this course's prerequisites to this course so that
 * they can be added to the diagram.
 * @param {String} source
 * @param {String} target
 */
function formatAsEdgeToAdd(source, target) {
  return {
    group: "edges",
    data: {
      source: source,
      target: target
    }
  };
}

/**
 * Determine the completion status of the given course.
 *
 * @param {Object} course whose status we're trying to determine
 * @return {String} complete|ip|incomplete.
 */
function getCourseStatus(course) {
  let userProfile = Meteor.user().profile;

  if (userProfile.inProgressCourses.includes(course.id)) {
    return 'ip';
  }
  if (userProfile.completedReqCourses.includes(course.id)) {
    return 'complete';
  }
  return 'incomplete';
}

Template.overlayCourse.events({
  "click .overlay-close": function (event) {
    $("#overlay").fadeOut();
    $('.prereq').removeClass("prereq");
  },

  "click .select-elective": function (event) {
    let courseId = event.currentTarget.dataset.id;

    let electiveType = parseInt(Session.get("selectedCourse"));
    let profile = Meteor.user().profile;
    let newElectives = profile.selectedElectives.slice();
    newElectives.push([electiveType, courseId]);
    profile["selectedElectives"] = newElectives;
    Meteor.users.update(
        {_id: Meteor.user()._id},
        {$set: {profile: profile}}
    );
    $("#overlay").fadeOut();
    $("#course-added")
    .fadeIn(100)
    .delay(1200)
    .fadeOut(400);
    addToDiagram(courseId);
  },

  'click .replace-elective': function (event) {
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

      // remove this elective from user model and diagram
      let foundIndex = selectedElectives.findIndex(elective => {
        return elective[1] === electiveId;
      });
      selectedElectives.splice(foundIndex, 1);
      cy.remove("node[id = \""+electiveId+"\"]");

      // remove any electives that need have this course as a prerequisite
      // todo: what should happen if this course is not the only prereq?
      let toBeRemoved = [];
      selectedElectives.forEach(elective => {
        let course = Course.findOne({"id": elective[1]});
        if (course.prereqs.includes(electiveId)) {
          toBeRemoved.push(elective);
        }
      });
      toBeRemoved.forEach(el => {
        console.log(el);
        let index = selectedElectives.indexOf(el);
        selectedElectives.splice(index, 1);

        // remove elective node from diagram
        cy.remove("node[id = \""+el[1]+"\"]");
      });

      let profile = Meteor.user().profile;
      profile['selectedElectives'] = selectedElectives;
      Meteor.users.update({_id: Meteor.user()._id}, {$set: {profile: profile}});
    } else {
      console.log("Error, elective type not found for selected elective.");
    }
  }
});
