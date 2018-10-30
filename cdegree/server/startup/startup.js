import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    //Clear DB
    Meteor.users.remove({});
    Course.remove({});
    Elective.remove({});

    //Add all Users
    Accounts.createUser({
        username: 'frieda',
        email: 'frieda@frieda.com',
        password: 'frieda',
        profile: {
            completedCourses: [],
            degree: 'BSCS',
        }
    });

    // Altering the User data structure, the completedElectives field
    // will hold some kind of pair from elective id to the class used to
    // satisfy it
    Accounts.createUser({
        username: 'ursula',
        email: 'usursula@ursula.com',
        password: 'ursula',
        profile: {
            completedReqCourses: ["CS 1200", "CS 1210", "CS 1800", "CS 1802",
            "CS 2500", "CS 2501", "CS 2510", "CS 2511", "CS 2800", "CS 2801",
            "ENGW 1111", "MATH 1341", "CS 3800", "CS 3650"],
            completedElectives: {},
            degree: "Bachelor of Science in Computer Science",
            capstone: null
        }
    });

    //Add all degrees
    Degree.insert({
        sections: {
            majorRequirements: ["CS 1200", "CS 1210", "CS 1800", "CS 1802",
            "CS 2500", "CS 2501", "CS 2510", "CS 2511", "CS 2800", "CS 2801",
            "CS 3000", "CS 3500", "CS 3650", "CS 3700", "CS 3800", "CS 4400",
            "CS 4500", "CS 4501", "THTR 1170", "MATH 1341", "MATH 1342",
            "MATH 2331", "MATH 3081", "EECE 2160", "ENGW 1111"],
            electives: [1, 1, 2, 2, 3, 4],
            capstone: ["CS 4550", "CS 4100"],
        },
        name: "Bachelor of Science in Computer Science",
    });

    //Add all Electives
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

    //ADD all courses
    var coursesJSON = [
        {
            "id": "CS 1200",
            "name": "Leadership Skill Development",
            "credits": 1,
            "prereqs": [],
            "coreqs": [],
            "description": "Focuses on leadership skill development to support student success in the College of Computer and Information Science and Northeastern University. Topics include ethics and accountability, leadership and communication, career development, and student services and resources. The course serves as a shared experience for students to make connections with faculty, staff, and students within CCIS and the Northeastern community.",
        },
        {
            "id": "CS 1210",
            "name": "Professional Development for CCIS Co-op",
            "credits": 1,
            "prereqs": [],
            "coreqs": [],
            "description": "Continues the preparation of students for careers in the computing and information fields by discussing co-op and co-op processes. Offers students an opportunity to prepare a professional résumé; practice proper interviewing techniques; explore current job opportunities; learn how to engage in the job and referral process; and to understand co-op policies, procedures, and expectations. Discusses professional behavior and ethical issues in the workplace.",
        },
        {
            "id": "CS 1800",
            "name": "Discrete Structures",
            "credits": 4,
            "prereqs": [],
            "coreqs": ["CS 1802"],
            "description": "Introduces the mathematical structures and methods that form the foundation of computer science. Studies structures such as sets, tuples, sequences, lists, trees, and graphs. Discusses functions, relations, ordering, and equivalence relations. Examines inductive and recursive definitions of structures and functions. Discusses principles of proof such as truth tables, inductive proof, and basic logic. Also covers the counting techniques and arguments needed to estimate the size of sets, the growth of functions, and the space-time complexity of algorithms.",
        },
        {
            "id": "CS 1802",
            "name": "Seminar for CS 1800",
            "credits": 1,
            "prereqs": [],
            "coreqs": ["CS 1800"],
            "description": "Accompanies CS 1800. Illustrates topics from the lecture course through discussions, quizzes, and homework assignments."
        },
        {
            "id": "CS 2500",
            "name": "Fundamentals of Computer Science 1",
            "credits": 4,
            "prereqs": [],
            "coreqs": ["CS 2501"],
            "description": "Introduces the fundamental ideas of computing and the principles of programming. Discusses a systematic approach to word problems, including analytic reading, synthesis, goal setting, planning, plan execution, and testing. Presents several models of computing, starting from nothing more than expression evaluation in the spirit of high school algebra. No prior programming experience is assumed; therefore, suitable for freshman students, majors and nonmajors alike who wish to explore the intellectual ideas in the discipline.",
        },
        {
            "id": "CS 2501",
            "name": "Lab for CS 2500",
            "credits": 1,
            "prereqs": [],
            "coreqs": ["CS 2500"],
            "description": "Accompanies CS 2500. Covers topics from the course through various experiments.",
        },
        {
            "id": "CS 2510",
            "name": "Fundamentals of Computer Science 2",
            "credits": 4,
            "prereqs": ["CS 2500"],
            "coreqs": ["CS 2511"],
            "description": "Continues CS 2500. Examines object-oriented programming and associated algorithms using more complex data structures as the focus. Discusses nested structures and nonlinear structures including hash tables, trees, and graphs. Emphasizes abstraction, encapsulation, inheritance, polymorphism, recursion, and object-oriented design patterns. Applies these ideas to sample applications that illustrate the breadth of computer science."
        },
        {
            "id": "CS 2511",
            "name": "Lab for CS 2510",
            "credits": 1,
            "prereqs": [],
            "coreqs": ["CS 2510 "],
            "description": "Accompanies CS 2510. Covers topics from the course through various experiments."
        },
        {
            "id": "CS 2800",
            "name": "Logic and Computation",
            "credits": 4,
            "prereqs": ["CS 1800"],
            "coreqs": ["CS 2801"],
            "description": "Introduces formal logic and its connections to computer and information science. Offers an opportunity to learn to translate statements about the behavior of computer programs into logical claims and to gain the ability to prove such assertions both by hand and using automated tools. Considers approaches to proving termination, correctness, and safety for programs. Discusses notations used in logic, propositional and first order logic, logical inference, mathematical induction, and structural induction. Introduces the use of logic for modeling the range of artifacts and phenomena that arise in computer and information science."
        },
        {
            "id": "CS 2801",
            "name": "Lab for CS 2800",
            "credits": 1,
            "prereqs": [],
            "coreqs": ["CS 2800"],
            "description": "Accompanies CS 2800. Covers topics from the course through various experiments."
        },
        {
            "id": "CS 3000",
            "name": "Algorithms and Data",
            "credits": 4,
            "prereqs": ["CS 1500"],
            "coreqs": [],
            "description": "Introduces the basic principles and techniques for the design, analysis, and implementation of efficient algorithms and data representations. Discusses asymptotic analysis and formal methods for establishing the correctness of algorithms. Considers divide-and-conquer algorithms, graph traversal algorithms, and optimization techniques. Introduces information theory and covers the fundamental structures for representing data. Examines flat and hierarchical representations, dynamic data representations, and data compression. Concludes with a discussion of the relationship of the topics in this course to complexity theory and the notion of the hardness of problems."
        },
        {
            "id": "CS 3500",
            "name": "Object Oriented Design",
            "credits": 4,
            "prereqs": ["CS 2510"],
            "coreqs": [],
            "description": "Presents a comparative approach to object-oriented programming and design. Discusses the concepts of object, class, meta-class, message, method, inheritance, and genericity. Reviews forms of polymorphism in object-oriented languages. Contrasts the use of inheritance and composition as dual techniques for software reuse: forwarding vs. delegation and subclassing vs. subtyping. Fosters a deeper understanding of the principles of object-oriented programming and design including software components, object-oriented design patterns, and the use of graphical design notations such as UML (unified modeling language). Basic concepts in object-oriented design are illustrated with case studies in application frameworks and by writing programs in one or more object-oriented languages."
        },
        {
            "id": "CS 3650",
            "name": "Computer Systems",
            "credits": 4,
            "prereqs": ["CS 2510"],
            "coreqs": [],
            "description": "Introduces the basic design of computing systems, computer operating systems, and assembly language using a RISC architecture. Describes caches and virtual memory. Covers the interface between assembly language and high-level languages, including call frames and pointers. Covers the use of system calls and systems programming to show the interaction with the operating system. Covers the basic structures of an operating system, including application interfaces, processes, threads, synchronization, interprocess communication, deadlock, memory management, file systems, and input/output control."
        },
        {
            "id": "CS 3700",
            "name": "Networks and Distributed Systems",
            "credits": 4,
            "prereqs": ["CS 2510"],
            "coreqs": [],
            "description": "Introduces the fundamentals of computer networks, including network architectures, network topologies, network protocols, layering concepts (for example, ISO/OSI, TCP/IP reference models), communication paradigms (point-to-point vs. multicast/broadcast, connectionless vs. connection oriented), and networking APIs (sockets). Also covers the construction of distributed programs, with an emphasis on high-level protocols and distributed state sharing. Topics include design patterns, transactions, performance trade-offs, security implications, and reliability. Uses examples from real networks (TCP/IP, Ethernet, 802.11) and distributed systems (Web, BitTorrent, DNS) to reinforce concepts."
        },
        {
            "id": "CS 3800",
            "name": "Theory of Computation",
            "credits": 4,
            "prereqs": ["CS 2510"],
            "coreqs": [],
            "description": "Introduces the theory behind computers and computing aimed at answering the question, \"What are the capabilities and limitations of computers?\" Covers automata theory, computability, and complexity. The automata theory portion includes finite automata, regular expressions, nondeterminism, nonregular languages, context-free languages, pushdown automata, and noncontext-free languages. The computability portion includes Turing machines, the Church-Turing thesis, decidable languages, and the Halting theorem. The complexity portion includes big-O and small-o notation, the classes P and NP, the P vs. NP question, and NP-completeness."
        },
        {
            "id": "CS 4400",
            "name": "Programming Languages",
            "credits": 4,
            "prereqs": ["CS 3500", "CS 3800"],
            "coreqs": [],
            "description": "Introduces a systematic approach to understanding the behavior of programming languages. Covers interpreters; static and dynamic scope; environments; binding and assignment; functions and recursion; parameter-passing and method dispatch; objects, classes, inheritance, and polymorphism; type rules and type checking; and concurrency."
        },
        {
            "id": "CS 4500",
            "name": "Software Development",
            "credits": 4,
            "prereqs": ["CS 3500", "ENGL 1111"],
            "coreqs": ["CS 4501"],
            "description": "Considers software development as a systematic process involving specification, design, documentation, implementation, testing, and maintenance. Examines software process models; methods for software specification; modularity, abstraction, and software reuse; and issues of software quality. Students, possibly working in groups, design, document, implement, test, and modify software projects. "
        },
        {
            "id": "CS 4501",
            "name": "Recitation for CS 4500",
            "credits": 0,
            "prereqs": [],
            "coreqs": ["CS 4500"],
            "description": "Accompanies CS 4500. Provides students with additional opportunities to ask questions and engage with course material."
        },
        {
            "id": "CS 4550",
            "name": "Web Development",
            "credits": 4,
            "prereqs": ["CS 3500"],
            "coreqs": [],
            "description": "Discusses Web development for sites that are dynamic, data driven, and interactive. Focuses on the software development issues of integrating multiple languages, assorted data technologies, and Web interaction. Considers ASP.NET, C#, HTTP, HTML, CSS, XML, XSLT, JavaScript, AJAX, RSS/Atom, SQL, and Web services. Requires each student to deploy individually designed Web experiments that illustrate the Web technologies and at least one major integrative Web site project. Students may work as a team with the permission of the instructor. Each student or team must also create extensive documentation of their goals, plans, design decisions, accomplishments, and user guidelines. All source files must be open and be automatically served by a sources server."
        },
        {
            "id": "CS 4100",
            "name": "Artificial Intelligence",
            "credits": 4,
            "prereqs": ["CS 3500"],
            "coreqs": [],
            "description": "Introduces the fundamental problems, theories, and algorithms of the artificial intelligence field. Includes heuristic search; knowledge representation using predicate calculus; automated deduction and its applications; planning; and machine learning. Additional topics include game playing; uncertain reasoning and expert systems; natural language processing; logic for common-sense reasoning; ontologies; and multiagent systems."
        },
        {
            "id": "IS 4300",
            "name": "Human Computer Interaction",
            "credits": 4,
            "prereqs": ["CS 3500"],
            "coreqs": [],
            "description": "Studies the principles of human-computer interaction and the practice of user interface design. Discusses the major human information processing subsystems (perception, memory, attention, and problem solving), and how the properties of these systems influence the design of interactive systems. Reviews guidelines and specification languages for designing user interfaces, with an emphasis on tool kits of standard graphical user interface (GUI) objects. Introduces usability metrics and evaluation methods. Additional topics may include World Wide Web design principles and tools; wireless/mobile device interfaces; computer-supported cooperative work; information visualization; and virtual reality. Course work includes designing user interfaces, creating working prototypes using a GUI tool kit, and evaluating existing interfaces using the methods studied."
        },
        {
            "id": "CS 3200",
            "name": "Database Design",
            "credits": 4,
            "prereqs": ["CS 2500"],
            "coreqs": [],
            "description": "Studies the design of a database for use in a relational database management system. The entity-relationship model and normalization are used in problems. Relational algebra and then the SQL (structured query language) are presented. Advanced topics include triggers, stored procedures, indexing, elementary query optimization, and fundamentals of concurrency and recovery. Students implement a database schema and short application programs on one or more commercial relational database management systems."
        },

        {
            "id": "CS 4120",
            "name": "Natural Language Processing",
            "credits": 4,
            "prereqs": ["CS 3500", "CS 3800"],
            "coreqs": [],
            "description": "Introduces the computational modeling of human language; the ongoing effort to create computer programs that can communicate with people in natural language; and current applications of the natural language field, such as automated document classification, intelligent query processing, and information extraction. Topics include computational models of grammar and automatic parsing, statistical language models and the analysis of large text corpora, natural language semantics and programs that understand language, models of discourse structure, and language use by intelligent agents. Course work includes formal and mathematical analysis of language models and implementation of working programs that analyze and interpret natural language text. Knowledge of statistics is helpful."
        },
        {
            "id": "THTR 1170",
            "name": "The Eloquent Presenter",
            "credits": 1,
            "prereqs": [],
            "coreqs": [],
            "description": "Designed to help students to enhance the effectiveness with which they present themselves in front of an audience. Uses the application of theatre training exercises and practical tools to offer students an opportunity to improve the quality of their spoken voice, the clarity with which they articulate their ideas, and their ability to command the attention of audiences in diverse interpersonal and professional interactions.",
        },
        {
            "id": "ENGW 1111",
            "name": "First Year Writing",
            "credits": 4,
            "prereqs": [],
            "coreqs": [],
            "description": "Designed for students to study and practice writing in a workshop setting. Students read a range of texts in order to describe and evaluate the choices writers make and apply that knowledge to their own writing and explore how writing functions in a range of academic, professional, and public contexts. Offers students an opportunity to learn how to conduct research using primary and secondary sources; how to write for various purposes and audiences in multiple genres and media; and how to give and receive feedback, to revise their work, and to reflect on their growth as writers.",
        },
        {
            "id": "ENGW 3302",
            "name": "Advanced Writing in the Technical Professions",
            "credits": 4,
            "prereqs": ["ENGW 1111"],
            "coreqs": [],
            "description": "Offers writing instruction for students in the College of Engineering and the College of Computer and Information Science. Students practice and reflect on writing in professional, public, and academic genres—such as technical reports, progress reports, proposals, instructions, presentations, and technical reviews—relevant to technical professions and individual student goals. In a workshop setting, offers students an opportunity to evaluate a wide variety of sources and develop expertise in audience analysis, critical research, peer review, and revision.",
        },
        {
            "id": "ENGW 3315",
            "name": "Interdisciplinary Advanced Writing in the Disciplines",
            "credits": 4,
            "prereqs": ["ENGW 1111"],
            "coreqs": [],
            "description": "Offers writing instruction for students interested in interdisciplinary study or who wish to explore multiple disciplines. Students practice and reflect on writing in professional, public, and academic genres relevant to their individual experiences and goals. In a workshop setting, offers students an opportunity to evaluate a wide variety of sources and to develop expertise in audience analysis, critical research, peer review, and revision.",
        },
        {
            "id": "PHYS 1161",
            "name": "Physics 1",
            "credits": 4,
            "prereqs": [],
            "coreqs": ["PHYS 1162", "PHYS 1163"],
            "description": "Offers an opportunity for interactive problem solving.",
        },
        {
            "id": "PHYS 1162",
            "name": "Lab for Physics 1",
            "credits": 1,
            "prereqs": [],
            "coreqs": ["PHYS 1161", "PHYS 1163"],
            "description": "Covers topics from the course through various experiments.",
        },
        {
            "id": "PHYS 1163",
            "name": "Recitation for Physics 1",
            "credits": 0,
            "prereqs": [],
            "coreqs": ["PHYS 1161", "PHYS 1162"],
            "description": "Offers an opportunity for interactive problem solving.",
        },
        {
            "id": "PHYS 1165",
            "name": "Physics 2",
            "credits": 4,
            "prereqs": ["PHYS 1161"],
            "coreqs": ["PHYS 1166", "PHYS 1167"],
            "description": "Continues PHYS 1161. Offers the second semester of a two-semester integrated lecture and laboratory sequence intended primarily for science students. Includes topics such as electrostatics; capacitors; resistors and direct-current circuits; magnetism and magnetic induction; RC, LR, and LRC circuits; waves; electromagnetic waves; and fluids.",
        },
        {
            "id": "PHYS 1166",
            "name": "Lab for Physics 2",
            "credits": 1,
            "prereqs": [],
            "coreqs": ["PHYS 1165", "PHYS 1167"],
            "description": "Covers topics from the course through various experiments.",
        },
        {
            "id": "PHYS 1167",
            "name": "Recitation for Physics 2",
            "credits": 0,
            "prereqs": [],
            "coreqs": ["PHYS 1165", "PHYS 1166"],
            "description": "Offers an opportunity for interactive problem solving.",
        },
        {
            "id": "BIOL 1111",
            "name": "General Biology 1",
            "credits": 4,
            "prereqs": [],
            "coreqs": ["BIOL 1112"],
            "description": "Explores basic principles of biology with a focus on those features shared by all living organisms and seen through the lens of evolutionary theory. Through lectures, readings and discussion, offers students an opportunity to understand how the scientific method has been and is used to address biological questions. Central topics include recent advances in cell anatomy and physiology, including the interplay between organelles, membrane transport, and cell-signaling; energy transfer through cells and through the biosphere; cellular reproduction and cancer; heredity and human genetic disorders; and protein synthesis and biotechnology. Explores the societal implications of such topics as biopharmaceuticals, ocean acidification, climate change, human diseases, epigenetics, cancer, and cloning.",
        },
        {
            "id": "BIOL 1112",
            "name": "Lab for General Biology 1",
            "credits": 1,
            "prereqs": [],
            "coreqs": ["BIOL 1111"],
            "description": "Offers students an opportunity to collect quantitative data through hands-on experimentation as well as simulations. Data is analyzed statistically and presented in written form.",
        },
        {
            "id": "BIOL 1113",
            "name": "General Biology 2",
            "credits": 4,
            "prereqs": ["BIOL 1111"],
            "coreqs": ["BIOL 1114"],
            "description": "Examines the evolution of structural and functional diversity of organisms; the integrative biology of multicellular organisms; and ecological relationships at the population, community, and ecosystem levels.",
        },
        {
            "id": "BIOL 1114",
            "name": "Lab for General Biology 2",
            "credits": 1,
            "prereqs": [],
            "coreqs": ["BIOL 1113"],
            "description": "Covers topics from the course through various experiments.",
        },
        {
            "id": "EECE 2160",
            "name": "Embedded Design: Enabling Robotics",
            "credits": 4,
            "prereqs": [],
            "coreqs": [],
            "description": "Offers an integrated lecture/lab course that covers the basics of the Unix operating system, high-level programming concepts, introductory digital design, wireless networking, and Simulink design. Offers students a hands-on experience developing a remote-controlled robotic arm using an embedded systems platform.",
        },
        {
            "id": "PHIL 1145",
            "name": "Technology and Human Values",
            "credits": 4,
            "prereqs": [],
            "coreqs": [],
            "description": "Studies philosophy of technology, as well as ethics and modern technology. Considers the relationship between technology and humanity, the social dimensions of technology, and ethical issues raised by emerging technologies. Discusses emerging technologies such as biotechnology, information technology, nanotechnology, and virtual reality.",
        },
        {
            "id": "SOCL 1280",
            "name": "The 21st-Century Workplace",
            "credits": 4,
            "prereqs": [],
            "coreqs": [],
            "description": "Analyzes dramatic changes occurring in the work lives of Americans and considers the future of American workers within the global economy. Explores emerging labor markets, gender, race, and technology in shaping contemporary American work settings.",
        },
        {
            "id": "MATH 1341",
            "name": "Calculus 1 for Science and Engineering",
            "credits": 4,
            "prereqs": [],
            "coreqs": [],
            "description": "Covers definition, calculation, and major uses of the derivative, as well as an introduction to integration. Topics include limits; the derivative as a limit; rules for differentiation; and formulas for the derivatives of algebraic, trigonometric, and exponential/logarithmic functions. Also discusses applications of derivatives to motion, density, optimization, linear approximations, and related rates. Topics on integration include the definition of the integral as a limit of sums, antidifferentiation, the fundamental theorem of calculus, and integration by substitution.",
        },
        {
            "id": "MATH 1342",
            "name": "Calculus 2 for Science and Engineering",
            "credits": 4,
            "prereqs": ["MATH 1341"],
            "coreqs": [],
            "description": "Covers further techniques and applications of integration, infinite series, and introduction to vectors. Topics include integration by parts; numerical integration; improper integrals; separable differential equations; and areas, volumes, and work as integrals. Also discusses convergence of sequences and series of numbers, power series representations and approximations, 3D coordinates, parameterizations, vectors and dot products, tangent and normal vectors, velocity, and acceleration in space. Requires prior completion of MATH 1341 or permission of head mathematics advisor.",
        },
        {
            "id": "MATH 2331",
            "name": "Linear Algebra",
            "credits": 4,
            "prereqs": ["MATH 1342"],
            "coreqs": [],
            "description": "Uses the Gauss-Jordan elimination algorithm to analyze and find bases for subspaces such as the image and kernel of a linear transformation. Covers the geometry of linear transformations: orthogonality, the Gram-Schmidt process, rotation matrices, and least squares fit. Examines diagonalization and similarity, and the spectral theorem and the singular value decomposition. Is primarily for math and science majors; applications are drawn from many technical fields. Computation is aided by the use of software such as Maple or MATLAB, and graphing calculators.",
        },
        {
            "id": "MATH 3081",
            "name": "Probability and Statistics",
            "credits": 4,
            "prereqs": ["MATH 1342"],
            "coreqs": [],
            "description": "Focuses on probability theory. Topics include sample space; conditional probability and independence; discrete and continuous probability distributions for one and for several random variables; expectation; variance; special distributions including binomial, Poisson, and normal distributions; law of large numbers; and central limit theorem. Also introduces basic statistical theory including estimation of parameters, confidence intervals, and hypothesis testing.",
        }

    ];

    for (var i = 0; i< coursesJSON.length; i++) {
        Course.insert(coursesJSON[i]);
    }

});
