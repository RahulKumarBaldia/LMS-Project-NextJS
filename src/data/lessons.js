const COURSE_IDS = {
  "html-css-foundations": "6a96f80996b0cad96cf24630",
  javascript: "6a96f80996b0cad96cf24636",
  reactjs: "6a96f80996b0cad96cf2463c",
  "node-js-express": "6a96f80996b0cad96cf24643",
  "advanced-react-patterns": "6a96f80996b0cad96cf24649",
  "sql-database-design": "6a96f80996b0cad96cf2464f",
  "system-design-basics": "6a96f80996b0cad96cf24655",
  "mongodb-for-developers": "6a96f80996b0cad96cf2465b",
};

export { COURSE_IDS };

const lessons = [
  {
    title: "Introduction to HTML",
    slug: "introduction-to-html",
    duration: 12,
    videoUrl: "https://www.youtube.com/watch?v=UB1O30fR-EE",
    content:
      "HTML is the structure of every web page. In this lesson you will learn what tags are, how a basic HTML document is laid out, and how to open a file in the browser. By the end you will write a simple page with a heading, a paragraph, and a link.",
    order: 1,
    course: COURSE_IDS["html-css-foundations"],
  },
  {
    title: "HTML Elements & Attributes",
    slug: "html-elements-and-attributes",
    duration: 15,
    videoUrl: "https://www.youtube.com/watch?v=salY_Sm6mv4",
    content:
      "Elements describe content, and attributes add extra information such as href, src, alt, and class. Practice headings, lists, images, and links. Focus on writing semantic HTML so screen readers and search engines can understand your page.",
    order: 2,
    course: COURSE_IDS["html-css-foundations"],
  },
  {
    title: "Introduction to CSS",
    slug: "introduction-to-css",
    duration: 18,
    videoUrl: "https://www.youtube.com/watch?v=1PnVor36_40",
    content:
      "CSS controls how HTML looks. You will connect a stylesheet, then change colors, fonts, spacing, and backgrounds. Learn the difference between inline, internal, and external CSS, and why an external file is the best default.",
    order: 3,
    course: COURSE_IDS["html-css-foundations"],
  },
  {
    title: "CSS Selectors",
    slug: "css-selectors",
    duration: 20,
    videoUrl: "https://www.youtube.com/watch?v=l1mER1bV0N0",
    content:
      "Selectors decide which elements get a style. Practice element, class, and id selectors, then combine them with descendant and child selectors. You will also see how specificity works so your styles apply when you expect them to.",
    order: 4,
    course: COURSE_IDS["html-css-foundations"],
  },
  {
    title: "Flexbox & Grid",
    slug: "flexbox-and-grid",
    duration: 25,
    videoUrl: "https://www.youtube.com/watch?v=JJSoEo8JSnc",
    content:
      "Flexbox is great for rows and columns of items. CSS Grid is great for full page layouts. You will build a navbar with Flexbox and a simple two-column layout with Grid, then make both layouts wrap on smaller screens.",
    order: 5,
    course: COURSE_IDS["html-css-foundations"],
  },

  {
    title: "JavaScript Introduction",
    slug: "javascript-introduction",
    duration: 10,
    videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
    content:
      "JavaScript adds behavior to web pages. Learn where to put a script tag, how to use the browser console, and how to log your first message. You will also see how JS runs line by line so debugging feels less mysterious.",
    order: 1,
    course: COURSE_IDS.javascript,
  },
  {
    title: "Variables & Data Types",
    slug: "variables-and-data-types",
    duration: 15,
    videoUrl: "https://www.youtube.com/watch?v=edlFjlzxkSI",
    content:
      "Store values with let and const. Practice strings, numbers, booleans, null, and undefined. You will write a few small examples that combine values, convert types, and avoid common mistakes like reassigning a const.",
    order: 2,
    course: COURSE_IDS.javascript,
  },
  {
    title: "Conditions & Loops",
    slug: "conditions-and-loops",
    duration: 20,
    videoUrl: "https://www.youtube.com/watch?v=s9wW5JsPrE8",
    content:
      "Use if, else if, and else to make decisions. Then repeat work with for and while loops. You will build a tiny quiz checker and a loop that prints a list of course titles from an array.",
    order: 3,
    course: COURSE_IDS.javascript,
  },
  {
    title: "Functions",
    slug: "functions",
    duration: 18,
    videoUrl: "https://www.youtube.com/watch?v=N8ap4k_1QEQ",
    content:
      "Functions let you reuse logic. Learn parameters, return values, and arrow functions. You will write helpers such as formatDuration() and greetUser(), then call them from different parts of a small script.",
    order: 4,
    course: COURSE_IDS.javascript,
  },
  {
    title: "Arrays & Objects",
    slug: "arrays-and-objects",
    duration: 25,
    videoUrl: "https://www.youtube.com/watch?v=R8rmfD9Y5-c",
    content:
      "Arrays store lists. Objects store named fields. Practice push, map, filter, and reading object keys. You will model a lesson as an object and a course as an array of lessons, then print titles and durations.",
    order: 5,
    course: COURSE_IDS.javascript,
  },

  {
    title: "Introduction to React",
    slug: "introduction-to-react",
    duration: 12,
    videoUrl: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
    content:
      "React is a library for building user interfaces from components. You will see why UI is split into small pieces, how JSX looks like HTML, and how a simple App component renders on the page.",
    order: 1,
    course: COURSE_IDS.reactjs,
  },
  {
    title: "Setting Up Your Environment",
    slug: "setting-up-your-environment",
    duration: 8,
    videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
    content:
      "Create a React project, start the dev server, and look at the folder structure. You will learn where components live, how to save a file to hot-reload the browser, and how to keep the first page clean.",
    order: 2,
    course: COURSE_IDS.reactjs,
  },
  {
    title: "Components & Props",
    slug: "components-and-props",
    duration: 20,
    videoUrl: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
    content:
      "A component is a function that returns JSX. Props pass data into that function. You will build a CourseCard that receives title, instructor, and rating, then reuse it for several courses without copying markup.",
    order: 3,
    course: COURSE_IDS.reactjs,
  },
  {
    title: "State & Event Handling",
    slug: "state-and-event-handling",
    duration: 25,
    videoUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0",
    content:
      "State is data that can change after the page loads. Handle clicks and form input, then update the UI. You will build a lesson checklist where marking a lesson complete updates the count on screen.",
    order: 4,
    course: COURSE_IDS.reactjs,
  },
  {
    title: "Hooks: useState & useEffect",
    slug: "hooks-usestate-and-useeffect",
    duration: 30,
    videoUrl: "https://www.youtube.com/watch?v=0ZJgIjIuY7U",
    content:
      "useState stores local data. useEffect runs after render, which is useful for fetching data or syncing with the browser. You will load a list of lessons and show a loading message until the data arrives.",
    order: 5,
    course: COURSE_IDS.reactjs,
  },

  {
    title: "Introduction to Node.js",
    slug: "introduction-to-nodejs",
    duration: 15,
    videoUrl: "https://www.youtube.com/watch?v=ENrzD9HAZK4",
    content:
      "Node.js runs JavaScript on the server. Learn what the runtime is, how to run a file with node, and how to print output in the terminal. You will write a tiny script that reads a name and prints a welcome message.",
    order: 1,
    course: COURSE_IDS["node-js-express"],
  },
  {
    title: "Node.js Modules",
    slug: "nodejs-modules",
    duration: 20,
    videoUrl: "https://www.youtube.com/watch?v=xHLd36QoS4k",
    content:
      "Split code into modules so files stay small. Practice require/import, exporting functions, and using built-in modules like fs and path. You will move a helper into its own file and import it into your main script.",
    order: 2,
    course: COURSE_IDS["node-js-express"],
  },
  {
    title: "Express.js Basics",
    slug: "expressjs-basics",
    duration: 25,
    videoUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
    content:
      "Express is a web framework for Node.js. Create an app, listen on a port, and define GET routes. You will return JSON for /health and a welcome message for /, then test both in the browser.",
    order: 3,
    course: COURSE_IDS["node-js-express"],
  },
  {
    title: "Building REST APIs",
    slug: "building-rest-apis",
    duration: 30,
    videoUrl: "https://www.youtube.com/watch?v=pKd0Rpw7O48",
    content:
      "REST APIs use HTTP methods to create, read, update, and delete resources. You will build routes for listing and creating courses, read JSON from the request body, and send clear success and error responses.",
    order: 4,
    course: COURSE_IDS["node-js-express"],
  },
  {
    title: "MongoDB Integration",
    slug: "mongodb-integration",
    duration: 35,
    videoUrl: "https://www.youtube.com/watch?v=ofme2oE76NM",
    content:
      "Connect Express to MongoDB so data survives a server restart. You will save a course, fetch all courses, and handle a missing id. Focus on a simple, readable flow rather than advanced query tricks.",
    order: 5,
    course: COURSE_IDS["node-js-express"],
  },

  {
    title: "Advanced Component Patterns",
    slug: "advanced-component-patterns",
    duration: 20,
    videoUrl: "https://www.youtube.com/watch?v=3ia3uxrQ0Xg",
    content:
      "As apps grow, components need clearer structure. Learn composition, children, and splitting presentational pieces from containers. You will refactor a bulky course page into smaller, reusable parts without changing the UI.",
    order: 1,
    course: COURSE_IDS["advanced-react-patterns"],
  },
  {
    title: "Context API",
    slug: "context-api",
    duration: 25,
    videoUrl: "https://www.youtube.com/watch?v=5LrDIWkK_Bc",
    content:
      "Context shares data without passing props through every layer. You will create an AuthContext, provide a user value, and read it in a nested navbar. Start with a small example so the pattern stays easy to follow.",
    order: 2,
    course: COURSE_IDS["advanced-react-patterns"],
  },
  {
    title: "Custom Hooks",
    slug: "custom-hooks",
    duration: 30,
    videoUrl: "https://www.youtube.com/watch?v=6ThnEQamz8k",
    content:
      "Custom hooks extract repeated logic. Build useToggle and useFetch, then use them in two screens. You will see how naming a function with use lets React track state while keeping components short.",
    order: 3,
    course: COURSE_IDS["advanced-react-patterns"],
  },
  {
    title: "Performance Optimization",
    slug: "performance-optimization",
    duration: 35,
    videoUrl: "https://www.youtube.com/watch?v=0ZJgIjIuY7U",
    content:
      "Unnecessary re-renders can slow a list of courses. Learn when to use React.memo, useMemo, and useCallback. You will profile a list, then apply one small change that stops child cards from rendering too often.",
    order: 4,
    course: COURSE_IDS["advanced-react-patterns"],
  },
  {
    title: "React Testing",
    slug: "react-testing",
    duration: 30,
    videoUrl: "https://www.youtube.com/watch?v=8Xwq35cPwYg",
    content:
      "Tests catch UI bugs before users do. Write a simple test that renders a button, clicks it, and checks the text. You will test a CourseCard title and an enroll button disabled state using beginner-friendly examples.",
    order: 5,
    course: COURSE_IDS["advanced-react-patterns"],
  },

  {
    title: "Introduction to SQL",
    slug: "introduction-to-sql",
    duration: 15,
    videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    content:
      "SQL is the language of relational databases. Learn what a table is, how rows and columns work, and how to run a query. You will select all rows from a students table and read the result set.",
    order: 1,
    course: COURSE_IDS["sql-database-design"],
  },
  {
    title: "Tables & Relationships",
    slug: "tables-and-relationships",
    duration: 20,
    videoUrl: "https://www.youtube.com/watch?v=ztHopE5Wnpc",
    content:
      "Real apps store data in related tables. Practice primary keys, foreign keys, and one-to-many links. You will model courses and lessons so each lesson belongs to one course, just like this LMS.",
    order: 2,
    course: COURSE_IDS["sql-database-design"],
  },
  {
    title: "SELECT Queries",
    slug: "select-queries",
    duration: 25,
    videoUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
    content:
      "SELECT reads data. Use WHERE, ORDER BY, and LIMIT to filter and sort. You will list beginner courses, find a course by slug, and return only the title and instructor columns.",
    order: 3,
    course: COURSE_IDS["sql-database-design"],
  },
  {
    title: "Joins",
    slug: "joins",
    duration: 30,
    videoUrl: "https://www.youtube.com/watch?v=9yeOJ0ZMUYw",
    content:
      "Joins combine rows from two tables. Start with INNER JOIN, then look at LEFT JOIN. You will list each lesson next to its course title so you can see which lessons belong to which course.",
    order: 4,
    course: COURSE_IDS["sql-database-design"],
  },
  {
    title: "Indexes & Database Design",
    slug: "indexes-and-database-design",
    duration: 25,
    videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    content:
      "Indexes speed up lookups on columns you search often, such as email or slug. You will add an index, compare a slow scan with a fast lookup, and review a few simple rules for clean table design.",
    order: 5,
    course: COURSE_IDS["sql-database-design"],
  },

  {
    title: "Introduction to System Design",
    slug: "introduction-to-system-design",
    duration: 20,
    videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
    content:
      "System design is about how pieces of an app work together at scale. Learn clients, servers, databases, and APIs in plain language. You will sketch the path of a request when a student opens the dashboard.",
    order: 1,
    course: COURSE_IDS["system-design-basics"],
  },
  {
    title: "Scalability",
    slug: "scalability",
    duration: 25,
    videoUrl: "https://www.youtube.com/watch?v=K0Ta65OqQkY",
    content:
      "A system scales when it can handle more users without falling over. Compare vertical scaling and horizontal scaling with simple LMS examples. You will list what might break first if enrollments suddenly jump.",
    order: 2,
    course: COURSE_IDS["system-design-basics"],
  },
  {
    title: "Load Balancing",
    slug: "load-balancing",
    duration: 30,
    videoUrl: "https://www.youtube.com/watch?v=sCR3SAVdyCc",
    content:
      "A load balancer spreads traffic across several servers. Learn why that helps availability and how a health check works. You will draw a diagram with one balancer and two API servers serving course pages.",
    order: 3,
    course: COURSE_IDS["system-design-basics"],
  },
  {
    title: "Caching",
    slug: "caching",
    duration: 25,
    videoUrl: "https://www.youtube.com/watch?v=U3RkDLtS7uY",
    content:
      "Caching stores a copy of data that is slow to fetch, such as a popular course list. Learn browser cache, CDN, and server cache at a beginner level. You will decide what is safe to cache and what must stay fresh.",
    order: 4,
    course: COURSE_IDS["system-design-basics"],
  },
  {
    title: "Real-World Architecture",
    slug: "real-world-architecture",
    duration: 40,
    videoUrl: "https://www.youtube.com/watch?v=lT4nC_3TUV4",
    content:
      "Put the ideas together: client, API, database, cache, and file storage for videos. You will walk through enrollment, lesson playback, and dashboard reads, then note one bottleneck you would watch in production.",
    order: 5,
    course: COURSE_IDS["system-design-basics"],
  },

  {
    title: "Introduction to MongoDB",
    slug: "introduction-to-mongodb",
    duration: 15,
    videoUrl: "https://www.youtube.com/watch?v=-56x56UcpCs",
    content:
      "MongoDB stores data as JSON-like documents instead of rows. Learn databases, collections, and documents. You will insert a sample course document and find it again in the MongoDB shell or Compass.",
    order: 1,
    course: COURSE_IDS["mongodb-for-developers"],
  },
  {
    title: "Collections & Documents",
    slug: "collections-and-documents",
    duration: 20,
    videoUrl: "https://www.youtube.com/watch?v=ofme2oE76NM",
    content:
      "A collection groups similar documents, like lessons or users. Practice nested fields and arrays inside a document. You will store a course with an embedded lessons array, then discuss when embedding is enough.",
    order: 2,
    course: COURSE_IDS["mongodb-for-developers"],
  },
  {
    title: "CRUD Operations",
    slug: "crud-operations",
    duration: 25,
    videoUrl: "https://www.youtube.com/watch?v=pWbMrx5q2ME",
    content:
      "CRUD means create, read, update, and delete. Use insertOne, find, updateOne, and deleteOne. You will add a lesson, change its duration, and remove a draft lesson without touching other documents.",
    order: 3,
    course: COURSE_IDS["mongodb-for-developers"],
  },
  {
    title: "Mongoose",
    slug: "mongoose",
    duration: 30,
    videoUrl: "https://www.youtube.com/watch?v=DZBGEVgL2eE",
    content:
      "Mongoose adds schemas on top of MongoDB in Node.js. Define a Lesson model with title, slug, duration, videoUrl, content, order, and course. You will create one lesson and populate its parent course.",
    order: 4,
    course: COURSE_IDS["mongodb-for-developers"],
  },
  {
    title: "Aggregation Pipelines",
    slug: "aggregation-pipelines",
    duration: 35,
    videoUrl: "https://www.youtube.com/watch?v=A8Xq5O0fZmE",
    content:
      "Aggregation is a pipeline of stages that transform documents. Start with $match and $group. You will count lessons per course and compute the total duration so a course page can show how long it takes to finish.",
    order: 5,
    course: COURSE_IDS["mongodb-for-developers"],
  },
];

export default lessons;
