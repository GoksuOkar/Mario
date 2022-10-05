import * as mongo from './../db/BlueOceanSchema';
import * as I from '../Utilities/Interfaces/Schemas';
import { groupCollapsed } from 'console';
import { Types, ObjectId } from 'mongoose';

export async function getConversationIDsFor (username: string): Promise<any> {
  try {
    const user = await mongo.User.find({username: username});

    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function getConversationsFrom (ids: String[]): Promise<any> {
  try {
    return mongo.Conversation.find({'_id': {$in: ids} }).exec();
  } catch (err) {
    console.error(err);
  }
}

export async function getFriends (username: string): Promise<any> {
  try {
    return mongo.User.findOne({username: username})
      .then((user: any) => {
        const friends = user.friends.map(Types.ObjectId)
        return mongo.User.find({ _id: { $in: user.friends } })
      })
  } catch (err) {
    console.error(err);
  }
}

export async function updateConversation (message: I.Message): Promise<I.Conversation | null | undefined> {
  try {
    return mongo.Conversation.findByIdAndUpdate(message.conversationId, {
      $push: {
        messages: message
      }
    }).exec();
  } catch (err) {
    console.error(err);
  }
}

export async function postNewMessage (newMessage: I.NewMessage): Promise<I.Conversation | null | undefined> {
  try {
    return mongo.Conversation.create({
      users: [newMessage.username, newMessage.toUser]
    })
    .then(convo => {
      const message: I.Message = {
        conversationId: convo._id.toString(),
        username: newMessage.username,
        text: newMessage.text,
        time: newMessage.time
      }
      return mongo.Conversation.findByIdAndUpdate(convo._id.toString(), {
        $push: {
          messages: message
        }
      })
    })
  } catch (err) {
    console.error(err);
  }
}

export async function createGroupConversation (group: I.JoinGroup): Promise<I.Conversation | null | undefined> {
  try {

    //create group convo
    return mongo.Conversation.create({
      conversationName: group.conversationName,
      users: group.users,
      messages: [],
    })
    .then((convo) => {
      // add convo to users
      mongo.User.updateMany({
        username: {
          $in: convo.users
        }}, {
          $push: {
            conversations: convo._id,
      }})
      return mongo.Conversation.findById(convo._id.toString())
      // return convo;
    })
  } catch (err) {
    console.error(err);
  }
}