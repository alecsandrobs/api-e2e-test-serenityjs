import { Actor, Cast, TakeNotes } from '@serenity-js/core';
import { CallAnApi } from '@serenity-js/rest';
import axios from "axios";
import { Properties } from '../../features/support/environment';

export class Actors implements Cast {

    prepare(actor: Actor): Actor {
        return actor.whoCan(
            CallAnApi.using(axios.create({
                timeout: Properties.timeout * 1000,
                baseURL: Properties.appHost
            }) as any),
            TakeNotes.usingAnEmptyNotepad()
        )
    }
}