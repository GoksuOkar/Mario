export interface User {
  login: Object,
  stats: Object,
  friends: Array<String>,
  events: Array<String>,
  picture: String,
  conversations: Array<String>, // array of conversation IDs
}

export interface Conversation {
  users: String[], // array of usernames
  messages: Message[],
}

export interface Message {
  conversationId: Number,
  username: String,
  text: String,
  time: Date
}

export interface Event {
  eventName: string,
  eventDescription: string,
  peopleAttending: Array<string>,
  comments: Array<string>, //comment ids
  location: String,
  startTime: Date,
  endTime: Date,
  creator: string,
}

export interface Comment {
  username: string,
  date: Date,
  body: string,
}