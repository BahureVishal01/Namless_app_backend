import { AppDB } from "../db";
import { CallToAction } from "../entity/callToAction";

export class ActionService {

  private actionRepository = AppDB.getRepository(CallToAction);

  async uploadResume(data: Partial<CallToAction>): Promise<CallToAction> {
   
    const resume = this.actionRepository.create(data);
    return await this.actionRepository.save(resume);
  }

}
