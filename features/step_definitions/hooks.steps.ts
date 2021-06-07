import { SendPeopleGet } from '../../spec/screenplay/tasks/pessoas/SendPeopleGet';
import { DeletePeople } from '../../spec/screenplay/tasks/dados/DeletePeople';
import { actorCalled } from '@serenity-js/core';
import { After, AfterAll, Before, BeforeAll } from '@cucumber/cucumber';


BeforeAll(() =>
    actorCalled('Cleaner').attemptsTo(
        SendPeopleGet.all(),
        DeletePeople.all()
    )
)

Before({ tags: '@people' }, () => { })

After({ tags: '@people' }, () => { })

AfterAll(() => { })