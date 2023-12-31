export interface Todos {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  type: TodoType;
}

export enum TodoType {
  HARD = 'hard',
  EASY = 'easy',
}

export const todos: Todos[] = [
  {
    id: 1,
    todo: 'Do something nice for someone I care about',
    completed: true,
    userId: 26,
    type: TodoType.HARD,
  },
  {
    id: 2,
    todo: 'Memorize the fifty states and their capitals',
    completed: false,
    userId: 48,
    type: TodoType.HARD,
  },
  {
    id: 3,
    todo: 'Watch a classic movie',
    completed: false,
    userId: 4,
    type: TodoType.EASY,
  },
  {
    id: 4,
    todo: 'Contribute code or a monetary donation to an open-source software project',
    completed: false,
    userId: 48,
    type: TodoType.HARD,
  },
  {
    id: 5,
    todo: "Solve a Rubik's cube",
    completed: false,
    userId: 31,
    type: TodoType.EASY,
  },
  {
    id: 6,
    todo: 'Bake pastries for me and neighbor',
    completed: false,
    userId: 39,
    type: TodoType.EASY,
  },
  {
    id: 7,
    todo: 'Go see a Broadway production',
    completed: false,
    userId: 32,
    type: TodoType.HARD,
  },
  {
    id: 8,
    todo: 'Write a thank you letter to an influential person in my life',
    completed: true,
    userId: 13,
    type: TodoType.EASY,
  },
  {
    id: 9,
    todo: 'Invite some friends over for a game night',
    completed: false,
    userId: 47,
    type: TodoType.HARD,
  },
  {
    id: 10,
    todo: 'Have a football scrimmage with some friends',
    completed: false,
    userId: 19,
    type: TodoType.HARD,
  },
  {
    id: 11,
    todo: "Text a friend I haven't talked to in a long time",
    completed: false,
    userId: 39,
    type: TodoType.EASY,
  },
  {
    id: 12,
    todo: 'Organize pantry',
    completed: true,
    userId: 39,
    type: TodoType.EASY,
  },
  {
    id: 13,
    todo: 'Buy a new house decoration',
    completed: false,
    userId: 16,
    type: TodoType.HARD,
  },
  {
    id: 14,
    todo: "Plan a vacation I've always wanted to take",
    completed: false,
    userId: 28,
    type: TodoType.EASY,
  },
  {
    id: 15,
    todo: 'Clean out car',
    completed: false,
    userId: 33,
    type: TodoType.EASY,
  },
  {
    id: 16,
    todo: 'Draw and color a Mandala',
    completed: true,
    userId: 24,
    type: TodoType.HARD,
  },
  {
    id: 17,
    todo: 'Create a cookbook with favorite recipes',
    completed: false,
    userId: 1,
    type: TodoType.HARD,
  },
  {
    id: 18,
    todo: 'Bake a pie with some friends',
    completed: false,
    userId: 1,
    type: TodoType.EASY,
  },
  {
    id: 19,
    todo: 'Create a compost pile',
    completed: true,
    userId: 5,
    type: TodoType.HARD,
  },
  {
    id: 20,
    todo: 'Take a hike at a local park',
    completed: true,
    userId: 43,
    type: TodoType.EASY,
  },
  {
    id: 21,
    todo: 'Take a class at local community center that interests you',
    completed: false,
    userId: 22,
    type: TodoType.HARD,
  },
  {
    id: 22,
    todo: 'Research a topic interested in',
    completed: false,
    userId: 4,
    type: TodoType.EASY,
  },
  {
    id: 23,
    todo: 'Plan a trip to another country',
    completed: true,
    userId: 37,
    type: TodoType.HARD,
  },
  {
    id: 24,
    todo: 'Improve touch typing',
    completed: false,
    userId: 45,
    type: TodoType.HARD,
  },
  {
    id: 25,
    todo: 'Learn Express.js',
    completed: false,
    userId: 49,
    type: TodoType.EASY,
  },
  {
    id: 26,
    todo: 'Learn calligraphy',
    completed: false,
    userId: 50,
    type: TodoType.HARD,
  },
  {
    id: 27,
    todo: 'Have a photo session with some friends',
    completed: false,
    userId: 14,
    type: TodoType.EASY,
  },
  {
    id: 28,
    todo: 'Go to the gym',
    completed: false,
    userId: 15,
    type: TodoType.HARD,
  },
  {
    id: 29,
    todo: 'Make own LEGO creation',
    completed: false,
    userId: 30,
    type: TodoType.HARD,
  },
  {
    id: 30,
    todo: 'Take cat on a walk',
    completed: false,
    userId: 15,
    type: TodoType.EASY,
  },
];
