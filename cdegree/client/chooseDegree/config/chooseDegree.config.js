Router.route('/choose', function () {
    this.layout('content');
    this.render('chooseDegree', {to: 'content'});
});