if(!Meteor.user()) {
    Router.go("/");
}

import cytoscape from 'cytoscape';


//cy.on('click', 'node', function(evt){
  //  console.log( 'clicked ' + this.id() );
//});

Template.diagram.helpers({

    cy:function() {

            data = {
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
                        'background': 'repeating-linear-gradient(45deg,#e2eef5,#e2eef5 10px,#fff 0,#fff 20px);'
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
                    { data: { id: 'CS 1800', name: 'Discrete Structures', status: 'complete' } },
                    { data: { id: 'CS 2800', name: 'Logic and Computation', status: 'ip' } },
                    { data: { id: 'CS 2500', name: 'Fundamentals of Computer Science', status: 'complete' } },
                    { data: { id: 'CS 2510', name: 'Fundamentals of Computer Science 2', status: 'complete' } },
                    { data: { id: 'CS 3500', name: 'Object Oriented Design', status: 'incomplete' } },
                    { data: { id: 'CS 3650', name: 'Computer Systems', status: 'ip' } },
                    { data: { id: 'CS 3700', name: 'Networks and Distributed Systems', status: 'incomplete' } },
                    { data: { id: 'CS 3800', name: 'Theory of Computation', status: 'ip' } },
                    { data: { id: 'CS 4400', name: 'Programming Languages', status: 'incomplete'} },
                ],
                edges: [
                    { data: { source: 'CS 1800', target: 'CS 2800' } },
                    { data: { source: 'CS 2500', target: 'CS 2510' } },
                    { data: { source: 'CS 2500', target: 'CS 3500' } },
                    { data: { source: 'CS 2500', target: 'CS 3650' } },
                    { data: { source: 'CS 2500', target: 'CS 3700' } },
                    { data: { source: 'CS 3500', target: 'CS 4400' } },
                    { data: { source: 'CS 3800', target: 'CS 4400' } },

                ]
            },
        };

        return data;

    },

    //Returns all the courses for now TODO hook to user data
    parents:function(){

        let degree = Degree.findOne({_id: Router.current().params._id});
        let requirements = degree.sections.majorRequirements;
        let selectedElectives = Meteor.user().profile.selectedElectives;
        let selectedElectiveIds = selectedElectives.map(el => el[1]);
        requirements = requirements.concat(selectedElectiveIds);
        let parents = [];

        requirements.forEach(function(element) {
            let course = Course.findOne({id: element});

            if(course.prereqs.length === 0 && course.credits > 2) {
                parents.push(course);
            }
        });

        return parents;

    }

});
