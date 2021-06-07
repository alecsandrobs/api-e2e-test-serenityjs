import { Interaction, UsesAbilities, AnswersQuestions, Duration } from "@serenity-js/core";

export class Wait implements Interaction {
    performAs(actor: UsesAbilities & AnswersQuestions): PromiseLike<void> {
      return new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, this.timeout.inMilliseconds())
      );
    }
  
    static for(duration: Duration) {
      return new Wait(duration);
    }
  
    constructor(private timeout: Duration) {}
  
    toString = () => `#actor waits for duration of ${this.timeout}`;
  }
  