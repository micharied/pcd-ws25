
function add(a, b, k) {
  k(a + b);
}

function multiply(a, b, k) {
  k(a * b);
}

function multiply_add(x, k) {
  // 1 + ((3 * x) + 5)
  multiply(3, x, y => add(y, 5, z => add(1, z, k)));
}

multiply_add(4, r => console.log(r));

