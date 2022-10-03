import * as mongo from './../db/BlueOceanSchema';
import * as I from '../Utilities/Interfaces/Schemas';

export async function getConversationIDsFor (username: string): Promise<any> {
  try {
    const user = await mongo.User.find({username: username}).exec();

    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function updateConversation (message: I.Message): Promise<void> {
  try {
    mongo.Conversation.findByIdAndUpdate({_id: message.conversationId}, {
      $push: {
        messages: message
      }
    }).exec();
  } catch (err) {
    console.error(err);
  }
}

export async function getConversationsFrom (ids: String[]): Promise<any> {
  try {
    return mongo.Conversation.find({'_id': {$in: ids} });
  } catch (err) {
    console.error(err);
  }
}