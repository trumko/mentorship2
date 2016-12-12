var thenPromise = document.getElementById("then-promise");
var allPromise = document.getElementById("all-promise");
var racePromise = document.getElementById("race-promise");
var resolvePromise = document.getElementById("resolve-promise");
var rejectPromise = document.getElementById("reject-promise");

function promise() {
  var time = Math.round(((Math.random() * 3) + 1) * 1000);
  return new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve(time/1000)
  	}, time)
  });
}

function onThenPromise() {
  thenPromise.innerHTML = 'Hello World';

  promise()
  .then(function(time) {
  	thenPromise.innerHTML = 'First promise was executed in ' + time + ' sec.'
    return promise()
  })
  .then(function(time) {
    thenPromise.innerHTML = 'Second promise was executed in ' + time + ' sec.'
    return promise()
  })
  .then(function(time) {
    thenPromise.innerHTML = 'Third promise was executed in ' + time + ' sec.'
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
  Promise.resolve(new Error('Houston, we have a problem'))
  .then(function(result) {
    rejectPromise.innerHTML = result;
    return promise()
  })
  .then(function(time) {
    rejectPromise.innerHTML = 'Fisrt promise was executed in ' + time + ' sec.'
    return promise()
  })
  .then(function(time) {
    rejectPromise.innerHTML = 'Second promise was executed in ' + time + ' sec.'
  })
}
