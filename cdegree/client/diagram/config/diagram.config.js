Router.route('/diagram', function () {
    this.layout('layoutDefault');
    this.render('diagramSidebar', {to: 'sidebar'});
    this.render('diagram', {to: 'content'});
    this.render('overlayCourse', {to: 'overlay'});
});