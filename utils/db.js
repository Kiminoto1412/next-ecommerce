import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    // console.log(mongoose.connections,'mongoose.connections')
    // console.log(mongoose.connections[0].readyState,'mongoose.connections[0].readyState')
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  });
//   const db = await mongoose.connect(process.env.MONGODB_URI, {});
  console.log("new connection");
  connection.isConnected = db.connection[0].readyState;
  console.log(connection.isConnected,'connection.isConnected')
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      // developement mode we didn't have to disconnect just console.log
      console.log("not disconnected");
    }
  }
}

function convertDocToObj(doc){
    doc._id = doc._id.toString()
    doc.createdAt = doc.createdAt.toString()
    doc.updatedAt = doc.updatedAt.toString()
    return doc
}
const db = { connect, disconnect ,convertDocToObj};
export default db;
