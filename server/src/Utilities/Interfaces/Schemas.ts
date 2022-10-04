import { Schema } from "mongoose"

export interface User {
  username: string,
  email: string,
  password: string,
  city: string,
  state: string,
  overallSkill: string,
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

// export interface Attendee {
//   _id: Schema.Types.ObjectId
// }

export interface Event {
  eventName: string,
  eventDescription: string,
  peopleAttending: Array<string>,
  comments: Array<string>, //comment ids
  location: String,
  startTime: Date,
  endTime: Date,
  creator: Schema.Types.ObjectId,
}

export interface Comment {
  username: string,
  date: Date,
  body: string,
}