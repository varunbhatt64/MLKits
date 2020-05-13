const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  //console.log(Outputs);
}

function runAnalysis() {
  const testSetSize = 100;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize); // destucturing syntax

  // let numberCorrect = 0;
  // testSet.forEach(data => {
  //   const bucket = knn(trainingSet, data[0]);
  //   if(bucket === data[3])
  //     numberCorrect++;    
  // });

  // do the same as above using lodash
  // now try different k values
  _.range(1,20).forEach( k => {
  const accuracy = _.chain(testSet)
    .filter(testPoint => knn(trainingSet, testPoint[0], k) === testPoint[3])
    .size()
    .divide(testSetSize)
    .value();

  console.log('For k of', k, 'accuracy is', accuracy);
})
}

function knn(data, point, k){
  return _.chain(data)
    .map(r => [distance(r[0], point), r[3]])
    .sortBy(r => r[0])
    .slice(0, k)
    .countBy(r => r[1])
    .toPairs()
    .sortBy(r => r[0])
    .last()
    .first()
    .parseInt()
    .value()
}


function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}