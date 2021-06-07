import { AnswersQuestions, PerformsActivities, Question, Task } from '@serenity-js/core';
import { DeleteRequest, Send } from '@serenity-js/rest';

export class SendPeopleDelete implements Task {

  constructor(private id: string) { }

  static withId(id: string) {
    return new SendPeopleDelete(id)
  }

  static withPersonData(people: Question<any>) {
    return new SendPeopleDeleteWithData(people)
  }

  performAs(actor: PerformsActivities): PromiseLike<void> {
    return actor.attemptsTo(
      Send.a(DeleteRequest.to(`/pessoas/${this.id}`))
    )
  }

  toString = () => `#actor attempts to send to people endpoint a DELETE request with ID ${this.id}`
}

class SendPeopleDeleteWithData implements Task {

  constructor(private people: Question<any>) { }

  performAs(actor: AnswersQuestions & PerformsActivities): PromiseLike<void> {
    return actor.answer(this.people).then((person: any) =>
      actor.attemptsTo(new SendPeopleDelete(person._id))
    )
  }

}