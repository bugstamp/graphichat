const isEven = (n = 0) => {
  if (!n) {
    return false;
  }
  return n % 2 === 0;
};

export {
  isEven,
};
