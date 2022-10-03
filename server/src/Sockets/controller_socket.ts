import * as database from './../db/BlueOceanSchema';
import * as I from '../Utilities/Interfaces/Schemas';
import { io } from '../server';

export async function getConversationsFor (username: string): Promise<any> {
  try {
    const user = await database.User.find({username: username}).exec();

    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function updateConversation(message: I.Message) {
  // populate database ?
  try {
    database.Conversation.findByIdAndUpdate({_id: message.conversationId}, {
      $push: {
        messages: message
      }
    })
  } catch (err) {
    console.error(err);
  }
}