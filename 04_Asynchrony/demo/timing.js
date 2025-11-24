
setTimeout(() => {
  console.log('A done');
  setTimeout(() => {
    console.log('B done');
  }, 2000);
}, 1000);

