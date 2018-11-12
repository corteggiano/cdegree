Router.route('/degree/:_id', function () {
    this.layout('layoutDefault');
    this.render('diagramSidebar', {to: 'sidebar'});
    this.render('diagram', {to: 'content'});
    this.render('overlayCourse', {to: 'overlay'});
});