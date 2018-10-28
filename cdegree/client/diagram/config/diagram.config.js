Router.route('/diagram', function () {
    this.layout('layoutDefault');
    //this.render('layoutSidebar', {to: 'sidebar'});
    this.render('diagram', {to: 'content'});
});