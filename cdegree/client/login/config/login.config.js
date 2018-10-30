Router.route('/', function () {
    this.layout('content');
    //this.render('layoutSidebar', {to: 'sidebar'});
    this.render('login', {to: 'content'});
});