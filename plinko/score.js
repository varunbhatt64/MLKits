const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  //console.log(Outputs);
}

function runAnalysis() {
  const testSetSize = 100;
  const k = 10;

  // let numberCorrect = 0;
  // testSet.forEach(data => {
  //   const bucket = knn(trainingSet, data[0]);
  //   if(bucket === data[3])
  //     numberCorrect++;    
  // });

  // do the same as above using lodash
  // now try different k values

  // now in place of k, run knn for each individual feature
  _.range(0,3).forEach( feature => {
    // feature === 0, feature === 1, feature === 2
    const data = _.map(outputs, r => [r[feature], _.last(r)])
    const [testSet, trainingSet] = splitDataset(minMax(data, 1), testSetSize); // destucturing syntax
  const accuracy = _.chain(testSet)
    .filter(testPoint => knn(trainingSet, _.initial(testPoint), k) === _.last(testPoint))
    .size()
    .divide(testSetSize)
    .value();

  console.log('For feature of', feature, 'accuracy is', accuracy);
})
}

function knn(data, point, k){
  // assume point has 3 values - it doesn't have last element - result
  return _.chain(data)
    .map(r => {
      return [
        distance(_.initial(r), point), 
        _.last(r)
      ];      
    })
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

// to include multiple variables - assume pointA & pointB are array of 
// variables in place of just numbers
// we need to apply the pythagoras theorem for multiple dimention 
function distance(pointA, pointB) {
  return  _.chain(pointA)
	.zip(pointB) // zip the same inde values from 2 arrays together in separate arrays
	.map( ([a, b]) => (a - b) ** 2) // for each zip array get the difference between 1st & 2nd elements and square
	.sum() // a^2 + b^2 + c^2 + ...
	.value() ** 0.5; // finally take square root to get the result
}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}

function minMax(data, featureCount){
  const clonedData = _.cloneDeep(data);

  for(let i = 0; i < featureCount; i++){
    const column = clonedData.map(r => r[i]);

    const min = _.min(column);
    const max = _.max(column);

    for(let j = 0; j < featureCount; j++){
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
    }
  }

  return clonedData;
}