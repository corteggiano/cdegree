import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

Template.diagram.onRendered(function () {
  let container = document.getElementById("cy");

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
        style: {}
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
          'background-image': 'images/stripes.png',
          'background-fit': 'cover'
        }
      },

      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'width': 2,
          'target-arrow-shape': 'triangle',
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
        {data: {source: 'CS 2510', target: 'CS 3500'}},
        {data: {source: 'CS 2500', target: 'CS 3650'}},
        {data: {source: 'CS 2500', target: 'CS 3700'}},
        {data: {source: 'CS 3500', target: 'CS 4400'}},
        {data: {source: 'CS 3800', target: 'CS 4400'}},

      ]
    },
  });

  // open course info when node is clicked
  cy.on('click', 'node', function (event) {
    $('#overlay').fadeIn();
    Session.set('selectedCourse', this.id());
  });
});