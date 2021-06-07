'use strict';

module.exports = {
  default: `
  --require-module ts-node/register
  --require ./features/step_definitions/**/**/**/**/*.steps.ts
  --require ./features/support/setup.ts
  --format @serenity-js/cucumber
        `,
};