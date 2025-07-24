import { a as abc } from "./a.js";
const f1 = () => {
  let c = abc();
  c[0] = c[0] * 2;
  console.log(c);
};

const f2 = () => {
  console.log(abc());
};

f1();
f2();
