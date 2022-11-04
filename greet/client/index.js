const grpc = require('@grpc/grpc-js')
const { GreetServiceClient } = require('../proto/greet_grpc_pb')
const { GreetRequest } = require('../proto/greet_pb')

function doGreet(client) {
  const req = new GreetRequest()
  req.setFirstName('John')

  client.greet(req, (err, res) => {
    if (err) {
      return console.error(err)
    }
    console.log(`Greet: ${res.getResult()}`)
  })
}

function main() {
  const addr = 'localhost:50051'
  const client = new GreetServiceClient(addr, grpc.credentials.createInsecure())

  doGreet(client)

  client.close()
}

main()
