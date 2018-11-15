import cytoscape from 'cytoscape';

let container = document.getElementById("cy");
console.log("outside events", container);

Template.diagram.events({

  'click .course-node': function (event) {
    $('#overlay').fadeIn();

    var course = Course.findOne({id: event.currentTarget.dataset.id});

    $('.prereq').removeClass("prereq");

    course.prereqs.forEach(function (id) {

      $('[data-id="' + id + '"]').addClass("prereq");

    });

    Session.set('selectedCourse', event.currentTarget.dataset.id);
  },
});

Template.diagram.onRendered(function () {

  let container = document.getElementById("cy");
  console.log(container);

  data = {
    container: container,

    boxSelectionEnabled: false,
    autounselectify: true,

    layout: {
      name: 'dagre'
    },

    style: [
      {
        selector: 'node',
        style: {
          'shape': 'roundrectangle',
          'content': 'data(name)',
          'height': 80,
          'width': 150,
          'text-opacity': 0.5,
          'text-valign': 'center',
          'text-halign': 'center',
          'text-wrap': 'wrap',
          'text-max-width': 130,
          'background-color': '#efefef'
        }
      },

      {
        selector: "node[status = 'incomplete']",
        style: {
          'color': 'white',
          'background-color': '#448bb2',
        }
      },
      {
        selector: "node[status = 'ip']",
        style: {
        }
      },

      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'width': 4,
          'target-arrow-shape': 'triangle',
          'line-color': '#9dbaea',
          'target-arrow-color': '#9dbaea'
        }
      }
    ],

    elements: {
      nodes: [
        {
          data: {
            id: 'CS 1800',
            name: 'Discrete Structures',
            status: 'complete'
          }
        },
        {data: {id: 'CS 2800', name: 'Logic and Computation', status: 'ip'}},
        {
          data: {
            id: 'CS 2500',
            name: 'Fundamentals of Computer Science',
            status: 'complete'
          }
        },
        {
          data: {
            id: 'CS 2510',
            name: 'Fundamentals of Computer Science 2',
            status: 'complete'
          }
        },
        {
          data: {
            id: 'CS 3500',
            name: 'Object Oriented Design',
            status: 'incomplete'
          }
        },
        {data: {id: 'CS 3650', name: 'Computer Systems', status: 'ip'}},
        {
          data: {
            id: 'CS 3700',
            name: 'Networks and Distributed Systems',
            status: 'incomplete'
          }
        },
        {data: {id: 'CS 3800', name: 'Theory of Computation', status: 'ip'}},
        {
          data: {
            id: 'CS 4400',
            name: 'Programming Languages',
            status: 'incomplete'
          }
        },
      ],
      edges: [
        {data: {source: 'CS 1800', target: 'CS 2800'}},
        {data: {source: 'CS 2500', target: 'CS 2510'}},
        {data: {source: 'CS 2500', target: 'CS 3500'}},
        {data: {source: 'CS 2500', target: 'CS 3650'}},
        {data: {source: 'CS 2500', target: 'CS 3700'}},
        {data: {source: 'CS 3500', target: 'CS 4400'}},
        {data: {source: 'CS 3800', target: 'CS 4400'}},

      ]
    },
  };

  // cytoscapeData = data;
  cytoscape(data);
});