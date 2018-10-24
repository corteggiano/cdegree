Accounts.onCreateUser(function(options, user) {

    user.profile = {
        username: options.profile.username,
        role: 'LISTENER',
        completedCourses:[]
    };

    console.log(user);
    return user;

});
