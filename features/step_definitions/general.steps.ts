import { actorCalled } from '@serenity-js/core'
import { Given } from '@cucumber/cucumber'

Given(/^that ([^"]*) is a system user$/, (name: string) =>
  actorCalled(name)
)
