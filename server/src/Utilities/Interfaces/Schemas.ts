
import { ObjectId, Types, Schema } from "mongoose";

export interface User {
  username: string,
  email: string,
  password: string,
  city: string,
  state: string,
  overallSkill: string,
  preferedRole: string,
  height: string,
  stats: Object,
  friends: Array<String>,
  events: Array<String>,
  picture: String,
  conversations: Array<Types.ObjectId>, // array of conversation IDs
}

export interface Conversation {
  conversationName: string,
  users: String[], // array of usernames
  messages: Message[],
}

export interface Message {
  conversationId: string,
  username: String,
  text: String,
  time: Date
}

// export interface Attendee {
//   _id: Schema.Types.ObjectId
// }

export interface NewMessage {
  username: String,
  toUser: String, // receiving user
  text: String,
  time: Date
}

export interface JoinRoom {
  username: String,
  conversationId: Types.ObjectId,
}

export interface JoinGroup {
  conversationName: String,
  users: Array<String>;
}

export interface Event {
  eventName: string,
  eventDescription: string,
  peopleAttending: Array<string>,
  location: String,
  startTime: Date,
  endTime: Date,
  creator: Schema.Types.ObjectId,
}

export interface Comment {
  event_id: String,
  username: string,
  date: Date,
  body: string,
}