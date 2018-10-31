Router.route('/', function () {
    this.layout('content');
    this.render('login', {to: 'content'});
});