import { AppDB } from "../db";
import { SubscribedUser } from "../entity/subscribedUser";

export class SubscribedUserService {
    private subscribedUserRepository = AppDB.getRepository(SubscribedUser);

  async createSubscription(data: Partial<SubscribedUser>): Promise<SubscribedUser> {
    if (!data.email) {
      throw new Error('Email is required to subscribe.');
    }

    // Check if user with the given email already exists
    const emailExist = await this.subscribedUserRepository.findOne({
      where: { email: data.email as string },
    });

    if (emailExist) {
      throw new Error('Email is already subscribed.');
    }

    // Create and save the new user
    const subscribedUser = this.subscribedUserRepository.create(data);
    return await this.subscribedUserRepository.save(subscribedUser);
  }

}
