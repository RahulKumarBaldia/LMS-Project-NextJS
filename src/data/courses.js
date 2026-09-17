const mockCourses = [
  {
    slug: "html-css-foundations",
    thumbnail:
      "https://placehold.co/600x338/e5e5e5/525252?text=HTML+%26+CSS",
    title: "HTML & CSS Foundations",
    description:
      "Build responsive, well-structured web pages from the ground up.",
    difficulty: "Beginner",
    category: "Web Development",
    instructor: "Ankit Sharma",
    rating: 4.7,
    lessons: [
      { title: "Introduction to HTML", duration: "12 min" },
      { title: "HTML Elements & Attributes", duration: "15 min" },
      { title: "Introduction to CSS", duration: "18 min" },
      { title: "CSS Selectors", duration: "20 min" },
      { title: "Flexbox & Grid", duration: "25 min" },
    ],
  },

  {
    slug: "javascript",
    thumbnail:
      "https://placehold.co/600x338/e5e5e5/525252?text=JavaScript",
    title: "JavaScript Essentials",
    description:
      "Master core JS concepts — variables, functions, arrays, and DOM manipulation.",
    difficulty: "Beginner",
    category: "JavaScript",
    instructor: "Priya Verma",
    rating: 4.8,
    lessons: [
      { title: "JavaScript Introduction", duration: "10 min" },
      { title: "Variables & Data Types", duration: "15 min" },
      { title: "Conditions & Loops", duration: "20 min" },
      { title: "Functions", duration: "18 min" },
      { title: "Arrays & Objects", duration: "25 min" },
    ],
  },

  {
    slug: "reactjs",
    thumbnail:
      "https://placehold.co/600x338/e5e5e5/525252?text=React+JS",
    title: "React JS for Beginners",
    description:
      "Learn components, props, state, and hooks by building real projects.",
    difficulty: "Intermediate",
    category: "React",
    instructor: "Rohan Mehta",
    rating: 4.9,
    lessons: [
      { title: "Introduction to React", duration: "12 min" },
      { title: "Setting Up Your Environment", duration: "8 min" },
      { title: "Components & Props", duration: "20 min" },
      { title: "State & Event Handling", duration: "25 min" },
      { title: "Hooks: useState & useEffect", duration: "30 min" },
      { title: "Building a Real Project", duration: "45 min" },
    ],
  },

  {
    slug: "node-js-express",
    thumbnail:
      "https://placehold.co/600x338/e5e5e5/525252?text=Node+%26+Express",
    title: "Node.js & Express Crash Course",
    description:
      "Build REST APIs from scratch using Node.js, Express, and MongoDB.",
    difficulty: "Intermediate",
    category: "Backend",
    instructor: "Sanya Kapoor",
    rating: 4.6,
    lessons: [
      { title: "Introduction to Node.js", duration: "15 min" },
      { title: "Node.js Modules", duration: "20 min" },
      { title: "Express.js Basics", duration: "25 min" },
      { title: "Building REST APIs", duration: "30 min" },
      { title: "MongoDB Integration", duration: "35 min" },
    ],
  },

  {
    slug: "advanced-react-patterns",
    thumbnail:
      "https://placehold.co/600x338/e5e5e5/525252?text=Advanced+React",
    title: "Advanced React Patterns",
    description:
      "Context API, performance optimization, custom hooks, and testing.",
    difficulty: "Advanced",
    category: "React",
    instructor: "Rohan Mehta",
    rating: 4.9,
    lessons: [
      { title: "Advanced Component Patterns", duration: "20 min" },
      { title: "Context API", duration: "25 min" },
      { title: "Custom Hooks", duration: "30 min" },
      { title: "Performance Optimization", duration: "35 min" },
      { title: "React Testing", duration: "30 min" },
    ],
  },

  {
    slug: "sql-database-design",
    thumbnail:
      "https://placehold.co/600x338/e5e5e5/525252?text=SQL+%26+Databases",
    title: "SQL & Database Design",
    description:
      "Relational databases, schema design, queries, and indexing basics.",
    difficulty: "Beginner",
    category: "Database",
    instructor: "Neha Joshi",
    rating: 4.5,
    lessons: [
      { title: "Introduction to SQL", duration: "15 min" },
      { title: "Tables & Relationships", duration: "20 min" },
      { title: "SELECT Queries", duration: "25 min" },
      { title: "Joins", duration: "30 min" },
      { title: "Indexes & Database Design", duration: "25 min" },
    ],
  },

  {
    slug: "system-design-basics",
    thumbnail:
      "https://placehold.co/600x338/e5e5e5/525252?text=System+Design",
    title: "System Design Basics",
    description:
      "Scalability, load balancing, caching, and real-world architecture.",
    difficulty: "Advanced",
    category: "Backend",
    instructor: "Sanya Kapoor",
    rating: 4.8,
    lessons: [
      { title: "Introduction to System Design", duration: "20 min" },
      { title: "Scalability", duration: "25 min" },
      { title: "Load Balancing", duration: "30 min" },
      { title: "Caching", duration: "25 min" },
      { title: "Real-World Architecture", duration: "40 min" },
    ],
  },

  {
    slug: "mongodb-for-developers",
    thumbnail:
      "https://placehold.co/600x338/e5e5e5/525252?text=MongoDB",
    title: "MongoDB for Developers",
    description:
      "NoSQL fundamentals, aggregation pipelines, and schema modeling.",
    difficulty: "Intermediate",
    category: "Database",
    instructor: "Neha Joshi",
    rating: 4.6,
    lessons: [
      { title: "Introduction to MongoDB", duration: "15 min" },
      { title: "Collections & Documents", duration: "20 min" },
      { title: "CRUD Operations", duration: "25 min" },
      { title: "Mongoose", duration: "30 min" },
      { title: "Aggregation Pipelines", duration: "35 min" },
    ],
  },
];

export default mockCourses;