import Todo from './model';

export default {
  todo: ({ id }) => Todo.findById(id),
  todos: ({ status }) => Todo.find({ status }),
  createTodo: ({ input }) => Todo.create(input),
};
