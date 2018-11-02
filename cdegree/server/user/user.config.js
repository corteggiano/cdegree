Accounts.onCreateUser(function(options, user) {

    if(user.username === "ursula") {
        user.profile = {
            completedReqCourses: ["CS 1200", "CS 1210", "CS 1800", "CS 1802",
                "CS 2500", "CS 2501", "CS 2510", "CS 2511", "CS 2801",
                "ENGW 1111", "MATH 1341"],
            inProgressCourses: ["CS 2800", "MATH 1342", "CS 3800", "CS 3650"],
            completedElectives: [[3, "SOCL 1280"]],
            degree: "Bachelor of Science in Computer Science",
            capstone: null,
            fulfilledNUPath: false
        };
    }

    if(user.username === "frieda") {
        user.profile = {
            completedReqCourses: [],
                inProgressCourses: ["CS 1200", "CS 1800", "CS 2500", "CS 2501", "ENGW 1111"],
                completedElectives: [],
                degree: "Bachelor of Science in Computer Science",
                capstone: null,
                fulfilledNUPath: false
        }
    }

    return user;

});
