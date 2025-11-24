
function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

async function* asyncCounter() {
  for (let i = 0; i < 4; i++) {
    await sleep(1000);
    yield i;
  }
}

let generator = asyncCounter()

let x0 = await generator.next()
console.log(x0)

let x1 = await generator.next()
console.log(x1)

let x2 = await generator.next()
console.log(x2)

let x3 = await generator.next()
console.log(x3)

let x4 = await generator.next()
console.log(x4)
