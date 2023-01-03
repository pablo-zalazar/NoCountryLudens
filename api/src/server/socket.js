// import { Server as SocketServer } from "socket.io";
// import http from "http";
// import server from "./index.js";
// import jwt from "jsonwebtoken";

// const serverSocket = http.createServer(server);
// const io = new SocketServer(serverSocket, {
//   cors: {
//     origin: process.env.ORIGINS_ALLOWED.replace(/ /g, "").split(",")
//   }
// });

// io.use(function (socket, next) {
//   if (socket.handshake.query && socket.handshake.query.token) {
//     console.log(socket.handshake.query.token);
//     jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function (err, decoded) {
//       if (err) {
//         console.log(err);
//         return next(new Error("Authentication error"));
//       }
//       socket.decoded = decoded;
//       console.log("decoded", socket.decoded);
//       next();
//     });
//   } else {
//     console.log("error");
//     next(new Error("Authentication error"));
//   }
// });

// io.on("connect", socket => {
//   console.log("you are connected as ", socket.decoded.id);

//   socket.on("leaveRoom", (room, message) => {
//     socket.leave(room);
//     message(room);
//   });

//   socket.on("joinRoom", (room, message) => {
//     socket.join(room);
//     message(room);
//   });

//   socket.on("sendMessage", (message, room) => {
//     // const mensaje = { id: message.id, message: message.message };
//     // console.log(mensaje);
//     // console.log("message id" + message.id);
//     // console.log("message" + message.message);
//     if (room === "") {
//       console.log("NO ROOM");
//     } else {
//       console.log(room);
//       socket.to(room).emit("receiveMessage", message);
//     }
//   });
// });

// // if (room === '') {
// //   /**
// //    * emite un evento a los demas clientes menos a el mismo
// //    */
// //   socket.broadcast.emit('message', { body: message, from: socket.id });
// // } else {
// //   socket.to(room).emit('message', { body: message, from: socket.id });
// // }
// // socket.on("joinRoom", room => {
// //   socket.join(room);
// // });
// // });

// // export default serverSocket;
