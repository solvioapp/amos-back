const R = require('ramda')

// const Var = function (name) {
//   this.name = name
// }

// const MyVar = function (name) {
//   Var.call(this, name)
// }

class Var {
  constructor (name) {
    this.name = name
  }
}

class MyVar extends Var {
  constructor (name) {
    super(name)
  }
}

// Var.constructor = name => 

// const vars = 

const vars = new MyVar('x')

console.log(vars.constructor.name);

console.log(vars instanceof Object);
console.log(vars instanceof Function);
console.log(vars instanceof Var);
console.log(vars instanceof MyVar);

console.log('--')

console.log(R.is(Object, vars))
console.log(R.is(Function, vars))
console.log(R.is(Var, vars))
console.log(R.is(MyVar, vars))

console.log('--')

console.log(Var instanceof Object);
console.log(Var instanceof Function);
console.log(Var instanceof Var);
console.log(Var instanceof MyVar);

console.log('--')

console.log(R.is(Object, Var))
console.log(R.is(Function, Var))
console.log(R.is(Var, Var))
console.log(R.is(MyVar, Var))
