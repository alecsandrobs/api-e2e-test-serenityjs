import { setDefaultTimeout } from '@cucumber/cucumber';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ArtifactArchiver, configure } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { Actors } from '../../spec/screenplay';


configure({
    actors: new Actors(),
    crew: [
        ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
        new SerenityBDDReporter(),
        ConsoleReporter.forDarkTerminals(),
    ],
});

setDefaultTimeout(10000000);