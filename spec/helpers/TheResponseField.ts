import { AnswersQuestions, Question, UsesAbilities } from "@serenity-js/core";
import { LastResponse } from "@serenity-js/rest";
import { Flatten } from './FlattenObject';

export class TheResponseField extends Question<any> {

    private field: string

    constructor(field: string) {
        super(`the field ${field} from last response body`)
        this.field = field;
    }

    static fromPath(fieldPath: string) {
        return new TheResponseField(fieldPath);
    }

    static fromIndex(index: number) {
        return new TheResponseFieldIndex(index)
    }

    answeredBy(actor: AnswersQuestions & UsesAbilities): any {
        return actor.answer(LastResponse.body()).then((body: any) =>
            actor.answer(Flatten.object(body)).then((obj: any) => obj[this.field])
        )
    }
}

class TheResponseFieldIndex extends Question<any> {

    private field: any = null

    constructor(private index: number) {
        super(`the response body index ${index}`)
    }

    andPath(fieldPath: string) {
        this.field = fieldPath
        return this
    }

    answeredBy(actor: AnswersQuestions & UsesAbilities): any {
        return actor.answer(LastResponse.body()).then((body: any) =>
            actor.answer(Flatten.object(body[this.index])).then((obj: any) => obj[this.field])
        )
    }
}

export class TheResponseBody {

    static size(): TheResponseBodySize {
        return new TheResponseBodySize()
    }

    static fromIndex(index: number): TheResponseBodyFromIndex {
        return new TheResponseBodyFromIndex(index)
    }

    static amountOfLines() {
        return new TheResponseBodyAmountOfLines()
    }

}

class TheResponseBodySize extends Question<any> {

    constructor() {
        super('the response body size');
    }

    answeredBy(actor: AnswersQuestions & UsesAbilities) {
        return actor.answer(LastResponse.body()).then((body: any) => body.length)
    }

}

class TheResponseBodyFromIndex extends Question<any> {

    constructor(private index: number) {
        super(`the response body from index ${index}`)
    }

    answeredBy(actor: AnswersQuestions & UsesAbilities): any {
        return actor.answer(LastResponse.body()).then((response: any) => response[this.index])
    }
}

class TheResponseBodyAmountOfLines extends Question<any> {

    constructor() {
        super(`the amount of lines from response body`)
    }

    answeredBy(actor: AnswersQuestions & UsesAbilities) {
        let lines: any = null
        return actor.answer(LastResponse.body()).then(response => {
            lines = response.toString()
            return lines.split(/\r\n|\r|\n/).length - 1
        })
    }
}