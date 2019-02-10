export default (render, name) => (mutation, result) => render({
  mutation,
  result: {
    ...result,
    data: result.data && result.data[name],
  },
  name,
});
