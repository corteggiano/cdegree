Router.route('/choose', function () {
    this.layout('content');
    //this.render('layoutSidebar', {to: 'sidebar'});
    this.render('chooseDegree', {to: 'content'});
});