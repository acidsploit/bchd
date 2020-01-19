// If connecting to a node using a self signed cert you will need to use:
// export NODE_TLS_REJECT_UNAUTHORIZED=0

var PROTO_PATH = __dirname + '../../../../bchrpc.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var pb = grpc.loadPackageDefinition(packageDefinition).pb;

var client = new pb.bchrpc('localhost:8335', grpc.credentials.createSsl());

client.GetNodeInfo(pb.GetNodeInfoRequest, function(error, resp) {
    if (error) {
        console.log("Error: " + error.code + ": " + error.message)
        console.log(error)
    } else {
        var nodeInfo = resp
        console.log("\nGetNodeInfo:")
        console.log(nodeInfo)
    }
});