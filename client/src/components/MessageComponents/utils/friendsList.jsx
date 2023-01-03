// assets
import friend1 from "../assets/friend-1.svg";
import friend2 from "../assets/friend-2.svg";
import friend3 from "../assets/friend-3.svg";
import friend4 from "../assets/friend-4.svg";
import friend5 from "../assets/friend-5.svg";

export const FRIENDS = [
  {
    name: "maria",
    image: friend1,
    message: "!Hola cómo estás?",
    userId: "123rfgt",
    messages: [
      {
        sendId: "123rfgt",
        createDate: Date.now(),
        text: "¡Hola!,"
      },
      {
        sendId: "123456",
        createDate: Date.now(),
        text: "¡Hola!,"
      },
      {
        sendId: "123rfgt",
        createDate: Date.now(),
        text: "¿Cómo estás?,"
      },
      {
        sendId: "123456",
        createDate: Date.now(),
        text: "¡Muy bien!, ¿y tú?,"
      }
    ]
  },
  {
    name: "jose",
    image: friend2,
    message: "Mi nombre es Jose",
    userId: "123rfg43",
    messages: [
      {
        sendId: "123rfgt",
        createDate: Date.now(),
        text: "hola!,"
      }
    ]
  },
  {
    name: "freddy",
    image: friend3,
    message: "Mañana voy al trabajo",
    userId: "dfjd87y"
  },
  {
    name: "nancy",
    image: friend4,
    message: "¿Quieres ir al parque?",
    userId: "23hbhj"
  },
  {
    name: "pablo",
    image: friend5,
    message: "Voy a jugar memoria",
    userId: "jndusw676"
  }
];
