import { Ensure, equals } from '@serenity-js/assertions';
import { actorInTheSpotlight, Note, TakeNote } from '@serenity-js/core';
import { LastResponse } from '@serenity-js/rest';
import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { TheResponseBody, TheResponseField } from '../../../spec/helpers/TheResponseField';
import { hasCreatedStatus, hasNoContentStatus, hasSuccessfullStatus } from '../../../spec/matchers/httpStatusMatchers';
import { possuiMesmoEsquema } from '../../../spec/matchers/schemaMatchers';
import { DeletePeople } from '../../../spec/screenplay/tasks/dados/DeletePeople';
import { SendPeopleDelete } from '../../../spec/screenplay/tasks/pessoas/SendPeopleDelete';
import { SendPeopleGet } from '../../../spec/screenplay/tasks/pessoas/SendPeopleGet';
import { SendPeoplePost } from '../../../spec/screenplay/tasks/pessoas/SendPeoplePost';
import { SendPeoplePut } from '../../../spec/screenplay/tasks/pessoas/SendPeoplePut';
import { pessoaResponseSchema, pessoasResponseSchema } from '../../schema/pessoa';

Given(/^that s?he is aware that exists people$/, (table: DataTable) =>
  actorInTheSpotlight().attemptsTo(
    SendPeopleGet.all(),
    DeletePeople.all(),
    SendPeoplePost.withPeople(table.hashes())
  )
)

When(/^(?:that |)s?he sends a POST request to people endpoint with data$/, (table: DataTable) =>
  actorInTheSpotlight().attemptsTo(
    SendPeoplePost.withData(table.rowsHash()),
    TakeNote.of(table.rowsHash() as any).as('pessoa')
  )
)

When(/^s?he sends a PUT request do people endpoint with data and its id$/, (table: DataTable) =>
  actorInTheSpotlight().answer(LastResponse.body()).then((pessoa: any) =>
    actorInTheSpotlight().attemptsTo(
      SendPeoplePut.withData(table.rowsHash()).withId(pessoa._id),
      TakeNote.of(table.rowsHash() as any).as('pessoa')
    )
  )
)

When(/^s?he sends a DELETE request to people endpoint with its id$/, () =>
  actorInTheSpotlight().answer(LastResponse.body()).then((pessoa: any) =>
    actorInTheSpotlight().attemptsTo(
      SendPeopleDelete.withId(pessoa._id)
    )
  )
)

When(/^s?he sends a GET request to people endpoint$/, () =>
  actorInTheSpotlight().attemptsTo(
    SendPeopleGet.all()
  )
)

When(/^s?he sends a GET request to people endpoint filtering by name "([^"]*)"$/, (nome: string) =>
  actorInTheSpotlight().attemptsTo(
    SendPeopleGet.withName(nome)
  )
)

When(/^s?he sends a GET request to people endpoint by its id$/, () =>
  actorInTheSpotlight().answer(LastResponse.body()).then((pessoa: any) =>
    actorInTheSpotlight().attemptsTo(
      TakeNote.of(pessoa).as('pessoa'),
      SendPeopleGet.withId(pessoa._id)
    )
  )
)

Then(/^s?he should see that the person data was successfully created$/, () =>
  actorInTheSpotlight().answer(Note.of('pessoa')).then((pessoa: any) =>
    actorInTheSpotlight().attemptsTo(
      Ensure.that(LastResponse.status(), hasCreatedStatus),
      Ensure.that(LastResponse.body(), possuiMesmoEsquema(pessoaResponseSchema)),
      Ensure.that(TheResponseField.fromPath('nome'), equals(pessoa.nome)),
      Ensure.that(TheResponseField.fromPath('telefone'), equals(pessoa.telefone)),
      Ensure.that(TheResponseField.fromPath('email'), equals(pessoa.email))
    )
  )
)

Then(/^s?he should see that the person data was successfully (?:located|updated)$/, () =>
  actorInTheSpotlight().answer(Note.of('pessoa')).then((pessoa: any) =>
    actorInTheSpotlight().attemptsTo(
      Ensure.that(LastResponse.status(), hasSuccessfullStatus),
      Ensure.that(LastResponse.body(), possuiMesmoEsquema(pessoaResponseSchema)),
      Ensure.that(TheResponseField.fromPath('nome'), equals(pessoa.nome)),
      Ensure.that(TheResponseField.fromPath('telefone'), equals(pessoa.telefone)),
      Ensure.that(TheResponseField.fromPath('email'), equals(pessoa.email))
    )
  )
)

Then(/^s?he should see that the person data was successfully removed$/, () =>
  actorInTheSpotlight().attemptsTo(
    Ensure.that(LastResponse.status(), hasNoContentStatus),
    Ensure.that(LastResponse.body(), equals('' as any)),
  )
)

Then(/^s?he should see that the people list have (\d+) records$/, (quantidade: number) =>
  actorInTheSpotlight().attemptsTo(
    Ensure.that(LastResponse.status(), hasSuccessfullStatus),
    Ensure.that(TheResponseBody.size(), equals(quantidade)),
    Ensure.that(LastResponse.body(), possuiMesmoEsquema(pessoasResponseSchema))
  )
)