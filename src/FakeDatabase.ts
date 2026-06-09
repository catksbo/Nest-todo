export interface Task {
  id: number;
  userId: string;
  title: string;
}

export const tasks: Task[] = [
    { id: 1, title: 'Eat', userId: '1' },
    { id: 2, title: 'Sleep', userId: '1' },
    { id: 3, title: 'Conquer', userId: '1' },
    { id: 4, title: 'Repeat', userId: '1' },
    { id: 5, title: 'Workout', userId: '2' },
    { id: 6, title: 'Rest', userId: '2' },
    { id: 7, title: 'Bulk', userId: '2' },
    { id: 8, title: 'Repeat', userId: '2' },
  ];

  
