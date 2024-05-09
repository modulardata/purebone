function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  }
}

const increment = counter();
increment();
increment();
increment(); // Output: ?

