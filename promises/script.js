var thenPromise = document.getElementById("then-promise");
var allPromise = document.getElementById("all-promise");
var racePromise = document.getElementById("race-promise");
var resolvePromise = document.getElementById("resolve-promise");
var rejectPromise = document.getElementById("reject-promise");

//throw Error after second promise
var promiseWithError = function () {
  var i = 0;
  return function () {
    var time = Math.round(((Math.random() * 3) + 1) * 1000);
    return new Promise(function(resolve, reject) {

      setTimeout(function() {
        if (i == 2) {
          reject()
        }
        i++;
        resolve(time/1000)
      }, time)
    });
  }
}()

var promise = function() {
  var time = Math.round(((Math.random() * 3) + 1) * 1000);
  return new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve(time/1000)
  	}, time)
  });
}


function onThenPromise() {
  promiseWithError()
  .then(function(time) {
    thenPromise.innerHTML = 'First promise was executed in ' + time + ' sec.'
    return promiseWithError()
  })
  .then(function(time) {
    thenPromise.innerHTML = 'Second promise was executed in ' + time + ' sec. Next will return an error'
    return promiseWithError()
  })
  .catch(function() {
    console.log(new Error)
    // throw new Error
    return 2000
  })
  .then(function(time) {
    thenPromise.innerHTML = 'Third promise was executed in ' + time + ' sec, because of error'
    return promiseWithError()
  })
  .then(function(time) {
    thenPromise.innerHTML = 'Fourth promise was executed in ' + time + ' sec. '
    return promiseWithError()
  })
  .catch(function() {
    thenPromise.innerHTML = new Error('Houston, we have a problem')
  })
}

function onAllPromise() {
  Promise.all([promise(), promise(), promise()])
  .then(function(results) {
    var text = results.map(function(item, i) {
      return 'Promise #' + i + ' was executed in ' + item + ' sec.'
    }).join('<br>')
    allPromise.innerHTML = text;
  })
}

function onRacePromise() {
  Promise.race([promise(), promise(), promise()])
  .then(function(results) {
    racePromise.innerHTML = 'The fastest promise was executed in ' + results + ' sec';
  })
}

function onResolvePromise() {
  Promise.resolve('Lets start!')
  .then(function(result) {
    resolvePromise.innerHTML = result;
    return promise()
  })
  .then(function(time) {
    resolvePromise.innerHTML = 'Fisrt promise was executed in ' + time + ' sec.'
    return promise()
  })
  .then(function(time) {
    resolvePromise.innerHTML = 'Second promise was executed in ' + time + ' sec.'
  })
}

function onRejectPromise() {
  Promise.reject(new Error('Houston, we have a problem'))
  .then(function(time) {
    rejectPromise.innerHTML = 'Fisrt promise was executed in ' + time + ' sec.'
    return promise()
  })
  .then(function(time) {
    rejectPromise.innerHTML = 'Second promise was executed in ' + time + ' sec.'
  })
  .catch(function(err) {
    rejectPromise.innerHTML = err;
  })
}
