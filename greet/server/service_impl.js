const pb = require('../proto/greet_pb')

exports.greet = (call, callback) => {
  const req = call.request
  const res = new pb.GreetResponse()

  res.setResult(`Hello, ${req.getFirstName()}!`)

  callback(null, res)
}
