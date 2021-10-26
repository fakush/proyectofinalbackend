const isPrime = (num: number): boolean => {
  if ([2, 3].indexOf(num) >= 0) return true;
  else if ([2, 3].some((n) => num % n == 0)) return false;
  else {
    let i = 5,
      w = 2;
    while (i * i <= num) {
      if (num % i == 0) return false;
      i += w;
      w = 6 - w;
    }
  }
  return true;
};

export const getprimes = (num: number) => {
  let primes = [];
  for (let i = 1; i <= num; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
};
