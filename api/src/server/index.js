import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "../config/db.js";
import cors from "cors";
//  import cors from "../middlewares/cors.js";
import usersRouter from "../routes/userRouter.js";
import authRouter from "../routes/authRouter.js";
import gameRoutes from "../routes/gamesRouter.js";
import scoreRouter from "../routes/scoreRouter.js";
import chatRouter from "../routes/chatRouter.js";
import friendsRouter from "../routes/friendsRouter.js";
import favoritesRouter from "../routes/favoritesRouter.js";
import notificationRouter from "../routes/notificationsRouter.js";
import imagesRouter from "../routes/imagesRouter.js";
import Pusher from "pusher";

// Node 14 path import
import path from "path";
import checkAuth from "../middlewares/checkAuth.js";
const __dirname = path.resolve();

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
// server.use(cors);
server.use(
  cors({
    origin: "*",
    // origin: ["https://ludens-two.vercel.app", "https://ludens-two.vercel.app/"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,PATCH",
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 200
  })
);

server.options("/*", (_, res) => {
  res.sendStatus(200);
});

connectDB();

const APP_KEY = process.env.VITE_key;
const APP_CLUSTER = process.env.VITE_cluster;
const APP_ID = process.env.VITE_app_id;
const APP_SECRET = process.env.VITE_secret;

const pusher = new Pusher({
  appId: APP_ID,
  key: APP_KEY,
  secret: APP_SECRET,
  cluster: APP_CLUSTER,
  useTLS: true
});

// server.post("api/message", (req, res) => {
//   console.log("first");
//   console.log(payload);
//   const payload = req.body;
//   pusher.trigger(req.query.channel, "message", payload);
//   res.send(payload);
//   // pusher.trigger(channel_name, event,  {message => 'hello world'});
// });

server.use(helmet({ crossOriginResourcePolicy: false }));

// app.use(express.static(path.join(__dirname, "build")));

// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "build/index.html"));
// });

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/games", gameRoutes);
server.use("/api/scores", scoreRouter);
server.use("/api/friends", friendsRouter);
server.use("/api/chat", chatRouter);
server.use("/api/favorites", favoritesRouter);
server.use("/api/notifications", notificationRouter);
server.use("api/images", imagesRouter);

server.route("/api/message").post((req, res) => {
  const payload = req.body;
  pusher.trigger(req.query.channel, "message", payload);
  return res.status(200).json(payload);
  // pusher.trigger(channel_name, event,  {message => 'hello world'});
});

// Images Fixed Route
server.use("/images", express.static(path.join(__dirname, "/images")));
export default server;
