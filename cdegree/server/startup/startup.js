import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {


    Meteor.users.remove({});
    Course.remove({});
    Elective.remove({});


    Accounts.createUser({
        username: 'frieda',
        email: 'frieda@frieda.com',
        password: 'frieda',
        profile: {
            completedCourses: [],
            degree: 'BSCS',
        }
    });

    Accounts.createUser({
        username: 'ursula',
        email: 'usursula@ursula.com',
        password: 'ursula',
        profile: {
            completedCourses: ["CS1200"],
            degree: 'BSCS',
        }
    });

    Degree.insert({
        sections: {
            majorRequirements: ["CS 1200", "CS 1210", "CS 1800", "CS 1802", "CS 2500", "CS 2501", "CS 2510", "CS 2511", "CS 2800", "CS 2801", "CS 3000", "CS 3500", "CS 3650", "CS 3700", "CS 3800", "CS 4400", "CS 4500", "CS 4501", "THTR 1170", "MATH 1341", "MATH 1342", "MATH 2331", "MATH 3081", "EECE 2160", "ENGW 1111"],
            electives: [1, 1, 2, 2, 3, 4],
            capstone: ["CS 4550", "CS 4100"],
        },
        name: "Bachelor of Science in Computer Science",
    });

    Elective.insert({
        id: 1,
        name: "Upper Division CS Elective",
        courses: ["IS 4300", "CS 3200", "CS 4120"]
    });

    Elective.insert({
        id: 2,
        name: "Science Requirement",
        courses: ["BIOL 1111","BIOL 1112","BIOL 1113","BIOL 1114", "PHYS 1161","PHYS 1162","PHYS 1163","PHYS 1165","PHYS 1166","PHYS 1167"]
    });

    Elective.insert({
        id: 3,
        name: "Computing and Social Issues",
        courses: ["PHIL 1145", "SOCL 1280"]
    });

    Elective.insert({
        id: 4,
        name: "Advanced Writing in the Disciplines",
        courses: ["ENGW 3302", "ENGW 3315"]
    });

    Course.insert({
        "id": "CS 1200",
        "name": "Leadership Skill Development",
        "credits": 1,
        "prereqs": [],
        "coreqs": [],
        "description": "Focuses on leadership skill development to support student success in the College of Computer and Information Science and Northeastern University. Topics include ethics and accountability, leadership and communication, career development, and student helpers and resources. The course serves as a shared experience for students to make connections with faculty, staff, and students within CCIS and the Northeastern community.",
    });

    Course.insert({
        "id": "CS 1210",
        "name": "Professional Development for CCIS Co-op",
        "credits": 1,
        "prereqs": [],
        "coreqs": [],
        "description": "Continues the preparation of students for careers in the computing and information fields by discussing co-op and co-op processes. Offers students an opportunity to prepare a professional résumé; practice proper interviewing techniques; explore current job opportunities; learn how to engage in the job and referral process; and to understand co-op policies, procedures, and expectations. Discusses professional behavior and ethical issues in the workplace.",
    });

    Course.insert({
        "id": "CS 1800",
        "name": "Discrete Structures",
        "credits": 4,
        "prereqs": [],
        "coreqs": ["CS 1802"],
        "description": "Introduces the mathematical structures and methods that form the foundation of computer science. Studies structures such as sets, tuples, sequences, lists, trees, and graphs. Discusses functions, relations, ordering, and equivalence relations. Examines inductive and recursive definitions of structures and functions. Discusses principles of proof such as truth tables, inductive proof, and basic logic. Also covers the counting techniques and arguments needed to estimate the size of sets, the growth of functions, and the space-time complexity of algorithms.",
    });

});
