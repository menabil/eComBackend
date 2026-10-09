let age = 18;

let promise = new Promise(function (resolve, reject) {
  if (age >= 18) {
    resolve("done");
  } else {
    reject("error");
  }
});

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });
