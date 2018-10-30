Router.route('/', function () {
    this.layout('layoutDefault');
    //this.render('layoutSidebar', {to: 'sidebar'});
    this.render('login', {to: 'content'});
});