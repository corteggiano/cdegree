Accounts.onCreateUser(function(options, user) {

    user.profile = {
        username: options.profile.username,
        completedCourses:[]
    };

    return user;

});
