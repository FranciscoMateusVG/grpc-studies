const grpc = require('@grpc/grpc-js')
const serviceImpl = require('./service_impl')
const { SumServiceService } = require('../proto/sum_grpc_pb')

const addr = 'localhost:50051'

function cleanUp(server) {
  if (server) {
    console.log('Server shut down!')
    server.forceShutdown()
  }
}

function main() {
  const server = new grpc.Server()
  const creds = grpc.ServerCredentials.createInsecure()

  process.on('SIGINT', () => {
    console.log('Shutting down...')
    cleanUp(server)
  })

  server.addService(SumServiceService, serviceImpl)
  server.bindAsync(addr, creds, (err, port) => {
    if (err) {
      return cleanUp(server)
    }
    console.log(`Server listening on ${addr}`)
    server.start()
  })
}

main()
