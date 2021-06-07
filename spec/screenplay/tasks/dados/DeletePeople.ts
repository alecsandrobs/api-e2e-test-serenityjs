import { AnswersQuestions, Loop, PerformsActivities, Task } from "@serenity-js/core";
import { LastResponse } from "@serenity-js/rest";
import { SendPeopleDelete } from '../pessoas/SendPeopleDelete';

export class DeletePeople implements Task {

    static all() {
        return new DeletePeople()
    }

    performAs(actor: AnswersQuestions & PerformsActivities): PromiseLike<void> {
        return actor.answer(LastResponse.body()).then((people: any) =>
            actor.attemptsTo(
                Loop.over(people).to(
                    SendPeopleDelete.withPersonData(Loop.item<any>())
                )
            )
        )
    }

}