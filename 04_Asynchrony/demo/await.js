
function sleep(duration) {
  return new Promise(resolve =>
    setTimeout(() => resolve(), duration)
  )
}


console.log("1")

await sleep(1000)

console.log("2")

await sleep(2000)

console.log("3")

