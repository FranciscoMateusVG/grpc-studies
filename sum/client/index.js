const grpc = require('@grpc/grpc-js')
const { SumServiceClient } = require('../proto/sum_grpc_pb')
const { SumRequest } = require('../proto/sum_pb')

function doSum(client) {
  const req = new SumRequest()
  const first = 2
  const second = 2
  req.setFirst(first)
  req.setSecond(second)

  client.sum(req, (err, res) => {
    if (err) {
      return console.error(err)
    }
    console.log(`${first} + ${second} = ${res.getResult()}`)
  })
}

function main() {
  const addr = 'localhost:50051'
  const client = new SumServiceClient(addr, grpc.credentials.createInsecure())

  doSum(client)

  client.close()
}

main()
