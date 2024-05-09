function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

// Test the function
console.log(createMultiplier(2)(3));
