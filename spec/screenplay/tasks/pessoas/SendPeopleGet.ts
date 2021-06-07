import { Check, equals, not } from '@serenity-js/assertions';
import { AnswersQuestions, PerformsActivities, Task } from '@serenity-js/core';
import { GetRequest, Send } from '@serenity-js/rest';

export class SendPeopleGet implements Task {

  private url = '/pessoas'

  constructor(private id: any, private name: any) {
    if (this.id) this.url = `${this.url}/${this.id}`
  }

  static all() {
    return new SendPeopleGet(null, null)
  }

  static withName(name: string) {
    return new SendPeopleGet(null, name)
  }

  static withId(id: string) {
    return new SendPeopleGet(id, null)
  }

  performAs(actor: AnswersQuestions & PerformsActivities): PromiseLike<void> {
    return actor.attemptsTo(Check.whether(this.name, not(equals(null)))
      .andIfSo(
        Send.a(GetRequest.to(this.url).using({
          params: {
            filter: { nome: this.name }
          }
        }))
      ).otherwise(
        Send.a(GetRequest.to(this.url))
      )
    )
  }

  toString = () => `#actor attempts to send to people endpoint a GET request${this.name ? ` filtering by name ${this.name}` : ''}`
}