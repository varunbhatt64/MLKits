const outputs = [];
const k = 3;
const predictionPoint = 300;


function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  //console.log(Outputs);
}

function runAnalysis() {
  // Write code here to analyze stuff
  const bucket = _.chain(outputs)
    .map(r => [distance(r[0]), r[3]])
    .sortBy(r => r[0])
    .slice(0, k)
    .countBy(r => r[1])
    .toPairs()
    .sortBy(r => r[0])
    .last()
    .first()
    .parseInt()
    .value()

    console.log('Your ball will probably fall into bucket #'+ bucket);
}

function distance(point) {
  return Math.abs(point - predictionPoint);
}

