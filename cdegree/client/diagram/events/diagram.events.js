import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

/**
 * Get all the courses we want to show in the diagram, including required
 * courses for the selected degree as well as any courses the user has
 * selected to fulfill an elective.
 *
 * @returns {Array} of course objects from Meteor.
 */
function getAllCourses() {
  let degree = Degree.findOne({_id: Router.current().params._id});
  let requirements = degree.sections.majorRequirements;
  let selectedElectives = Meteor.user().profile.selectedElectives;
  let selectedElectiveIds = selectedElectives.map(el => el[1]);
  requirements = requirements.concat(selectedElectiveIds);

  let courses = [];
  requirements.forEach(function (element) {
    let course = Course.findOne({id: element});

    if (course.credits > 2) {
      courses.push(course);
    }
  });

  return courses;
}

/**
 * Get all the nodes to be shown in the diagram.
 * @returns Node[]
 */
function getNodes() {
  let nodes = [];
  getAllCourses().forEach(course => {
    nodes.push(formatNode(course));
  });

  console.log("nodes");
  console.log(nodes);

  return nodes;
}

/**
 * A node representing a course that will be rendered in the diagram.
 * @typedef {{data: {id, name, status: String}}} Node
 */

/**
 * Format this course as a node for the diagram.
 * @param course {Object}
 * @returns Node
 */
function formatNode(course) {
  return {
    data: {
      id: course.id,
      name: course.name,
      status: getCourseStatus(course)
    }
  }
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

/**
 * Represents an edge between two Nodes in a diagram.
 * @typedef {{data: {source: String, target: String}}} Edge
 */

/**
 * Get all the edges between nodes in the diagram. Edges go from a course's
 * prerequisite to that course.
 * @returns Edge[]
 */
function getEdges() {
  let edges = [];
  getAllCourses().forEach(course => {
    edges = edges.concat(formatEdges(course));
  });

  return edges;
}

/**
 * Gets the list of edges from the given course's prerequisites to this course.
 * @param course
 * @returns Edge[]
 */
function formatEdges(course) {
  let edges = [];
  // assumes that prereqs are all at least 4 credits :/
  course.prereqs.forEach(prereq => edges.push(createEdge(prereq, course.id)));
  return edges;
}

/**
 * Creates an edge from the prerequisite course to the target course.
 * @param source {String} the id of the course
 * @param target {String}
 * @returns Edge
 */
function createEdge(source, target) {
  return {
    data: {
      source: source,
      target: target
    }
  };
}

Template.diagram.onRendered(function () {

  // cy is a global variable on purpose :O
  cy = window.cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    layout: {
      name: 'dagre'
    },

    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#ffffff',
          'content': 'data(name)',
          'font-family': 'Roboto',
          'font-weight': 'normal',
          'height': 80,
          'width': 150,
          'shape': 'roundrectangle',
          'text-valign': 'center',
          'text-halign': 'center',
          'text-wrap': 'wrap',
          'text-max-width': 130
        }
      },

      {
        selector: "node[status = 'incomplete']",
        style: {
          'color': '#ffffff',
          'background-color': '#448bb2',
        }
      },
      {
        selector: "node[status = 'ip']",
        style: {
          'background-color': '#e2eef5',
          'background-image': '/images/stripes.png',
          'background-fit': 'cover'
        }
      },

      {
        selector: 'edge',
        style: {
          // 'curve-style': 'bezier',
          'width': 2,
          'curve-style': 'unbundled-bezier',
          'control-point-distance': '10px',
          'target-arrow-shape': 'triangle',
        }
      }
    ],

    elements: {
      nodes: getNodes(),
      edges: getEdges() // todo apply topological sort to these
    },
  });

  // open course info when node is clicked
  cy.on('click', 'node', function (event) {
    $('#overlay').fadeIn();
    Session.set('selectedCourse', this.id());
  });
});