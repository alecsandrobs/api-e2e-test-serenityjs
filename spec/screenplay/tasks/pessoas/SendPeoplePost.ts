import { Loop, PerformsActivities, Task } from '@serenity-js/core';
import { PostRequest, Send } from '@serenity-js/rest';

export class SendPeoplePost implements Task {
  constructor(private requestBody: any) { }

  static withData(people: any) {
    return new SendPeoplePost(people)
  }

  static withPeople(people: any) {
    return new SendPeoplePostMany(people)
  }

  performAs(actor: PerformsActivities): PromiseLike<void> {
    return actor.attemptsTo(
      Send.a(PostRequest.to('/pessoas').with(this.requestBody))
      // Submit.a(PostRequest.to('/pessoas').with(this.requestBody)).toBaseUrl()
    )
  }

  toString = () => '#actor attempts to send to people endpoint a POST request'
}


class SendPeoplePostMany implements Task {

  constructor(private people: any) { }

  performAs(actor: PerformsActivities): PromiseLike<void> {
    return actor.attemptsTo(
      Loop.over(this.people).to(
        new SendPeoplePost(Loop.item<any>())
      )
    )
  }

}