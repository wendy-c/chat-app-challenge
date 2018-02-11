export const users = [
  {
    name: "laura",
    chats: [1, 2]
  },
  {
    name: "rob",
    chats: [1, 3]
  }
];

export const messages = [
  {
    id: 1,
    users: ["laura", "rob"],
    messages: [
      {
        sentFrom: "rob",
        text: "hi laura!",
        time: "Fri Feb 09 2018 16:42:31 GMT-0800 (PST)"
      },
      {
        sentFrom: "laura",
        text: "hi rob, this is laura from the React meetup.",
        time: "Wed Feb 07 2018 13:15:21 GMT-0800 (PST)"
      }
    ]
  },
  {
    id: 2,
    users: ["laura", "allison"],
    messages: [
      {
        sentFrom: "allison",
        text: "oh thanks! I will come by to pick it up",
        time: "Wed Feb 07 2018 15:12:21 GMT-0800 (PST)"
      },
      {
        sentFrom: "laura",
        text: "hey allison, you left your jacket at the party last night",
        time: "Wed Feb 07 2018 14:55:21 GMT-0800 (PST)"
      }
    ]
  },
  {
    id: 3,
    users: ["rob", "michael"],
    messages: [
      {
        sentFrom: "rob",
        text:
          "do you have time next Tue to talk about that project I mentioned?",
        time: "Fri Feb 09 2018 10:42:31 GMT-0800 (PST))"
      },
      {
        sentFrom: "michael",
        text: "Hey What's up? Great to hear from you.",
        time: "Fri Feb 09 2018 10:22:51 GMT-0800 (PST)"
      },
      {
        sentFrom: "rob",
        text: "hey Michael!",
        time: "Fri Feb 09 2018 10:18:54 GMT-0800 (PST)"
      }
    ]
  }
];