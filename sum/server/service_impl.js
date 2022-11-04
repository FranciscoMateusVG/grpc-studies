const pb = require('../proto/sum_pb')

exports.sum = (call, callback) => {
  const req = call.request
  const res = new pb.SumResponse()
  const number1 = req.getFirst()
  const number2 = req.getSecond()
  const result = number1 + number2

  res.setResult(result)

  callback(null, res)
}
