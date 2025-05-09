export const courses = [
  {
    _id: "1",
    title: "Modern Web Development with React",
    description:
      "Master React hooks, context API and modern frontend development techniques with hands-on projects.",
    level: "intermediate",
    price: 89.99,
    discount: 15,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    avgRatings: 4.7,
    lessonCount: 24,
    duration: 720, // in minutes
    enrolled: Array(125).fill(0), // Mock 125 enrolled students
  },
  {
    _id: "2",
    title: "Python for Beginners",
    description:
      "Learn Python programming fundamentals from scratch with practical exercises.",
    level: "beginner",
    price: 49.99,
    discount: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    avgRatings: 4.5,
    lessonCount: 18,
    duration: 540,
    enrolled: Array(89).fill(0),
  },
  {
    _id: "3",
    title: "Advanced Machine Learning",
    description:
      "Deep dive into neural networks, NLP and computer vision with TensorFlow.",
    level: "advanced",
    price: 129.99,
    discount: 20,
    thumbnail:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    avgRatings: 4.9,
    lessonCount: 32,
    duration: 960,
    enrolled: Array(72).fill(0),
  },
];
