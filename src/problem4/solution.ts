// Use a simple loop
// Time Complexity: O(n)
// Space Complexity: O(1)
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Use mathematical formula
// Time Complexity: O(1)
// Space Complexity: O(1)
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

// Use recursive
// Time Complexity: O(n)
// Space Complexity: O(n)
function sum_to_n_c(n: number): number {
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_c(n - 1);
  }
}

function main() {
  const n = 5;

  console.log("Testing with n = ", n);

  // Using solution 1 (loop)
  const result_a = sum_to_n_a(n);
  console.log(`Solution 1: ${result_a}`);

  // Using solution 2 (mathematical formula)
  const result_b = sum_to_n_b(n);
  console.log(`Solution 2: ${result_b}`);

  // Using solution 3 (recursive)
  const result_c = sum_to_n_c(5);
  console.log(`Solution 3: ${result_c}`);
}

main();
