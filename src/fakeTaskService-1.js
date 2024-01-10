const tasks = [
  {
    _id: "618c3432eddf61c496096578",
    title: "Stay Hydrated",
    task: "Drink da dew",
    category: "DayToDay",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: true,
  },
  {
    _id: "618c3459eddf61c49609657a",
    title: "Dishes",
    task: "Do the dishes",
    category: "Home",
    severity: { _id: "61b017a20cce782d386e736f", name: "Normal" },
    completed: true,
  },
  {
    _id: "618c345feddf61c49609657c",
    title: "Laundry",
    task: "Do Laundry",
    category: "Home",
    severity: { _id: "61b017a20cce782d386e736f", name: "Normal" },
    completed: true,
  },
  {
    _id: "618c3469eddf61c49609657e",
    title: "Report",
    task: "Make Employee Report",
    category: "Work",
    severity: { _id: "61b017cc0cce782d386e7370", name: "Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096580",
    title: "Brush Teeth",
    task: "Brush my Teeth",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: true,
  },
  {
    _id: "618c3474eddf61c496096581",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096582",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096583",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096584",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096585",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096586",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096587",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096588",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096589",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096590",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096591",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096592",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096593",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096594",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
  {
    _id: "618c3474eddf61c496096595",
    title: "Test",
    task: "Test",
    category: "Home",
    severity: { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
    completed: false,
  },
];

const severities = [
  { _id: "61b017eb0cce782d386e7371", name: "Very Important" },
  { _id: "61b017cc0cce782d386e7370", name: "Important" },
  { _id: "61b017a20cce782d386e736f", name: "Normal" },
];

export function getSeverities() {
  return severities.filter((s) => s);
}

export function getSeverity(id) {
  return severities.find((s) => s._id === id);
}

export function getTasks() {
  return tasks;
}

export function getTask(id) {
  return tasks.find((t) => t._id === id);
}

export function saveTask(task) {
  let taskInDb = tasks.find((t) => t._id === task._id) || {};
  taskInDb.title = task.title;
  taskInDb.task = task.task;
  taskInDb.category = task.category;
  taskInDb.severity = task.severity;
  taskInDb.completed = task.completed;

  if (!taskInDb._id) {
    taskInDb._id = Date.now().toString();
    tasks.push(taskInDb);
  }
  // console.log(taskInDb);
  return taskInDb;
}

export function deleteTask(id) {
  let taskInDb = tasks.find((t) => t._id === id);
  tasks.splice(tasks.indexOf(taskInDb), 1);
  return taskInDb;
}
