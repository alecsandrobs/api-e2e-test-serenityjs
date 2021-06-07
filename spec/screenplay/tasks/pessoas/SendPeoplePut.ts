import { PerformsActivities, Task } from '@serenity-js/core';
import { PutRequest, Send } from '@serenity-js/rest';

export class SendPeoplePut implements Task {

  constructor(private requestBody: any, private id: string) { }

  static withData(data: any) {
    return new EnviaPutPessoaBuilder(data)
  }

  performAs(actor: PerformsActivities): PromiseLike<void> {
    return actor.attemptsTo(
      Send.a(PutRequest.to(`/pessoas/${this.id}`).with(this.requestBody))
    )
  }

  toString = () => `#actor attempts to send to people endpoint a PUT request with ID ${this.id}`
}


class EnviaPutPessoaBuilder {

  constructor(private requestBody: any) { }

  withId(id: string) {
    return new SendPeoplePut(this.requestBody, id)
  }
}