import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    console.log(`A new user was inserted: ${event.entity.username}`);
    // const user = event.entity;
    // user.username =
    //   user.username.charAt(0).toUpperCase() + user.username.slice(1);
  }
}
