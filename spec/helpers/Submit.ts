import { Send } from '@serenity-js/rest';
import { EnvironmentParametersHelper } from './EnvironmentParametersHelper';

export class Submit {

    static a(request: any) {
        return new SubmitRequest(request)
    }
}

class SubmitRequest {

    constructor(private request: any) { }

    toBaseUrl() {
        this.request.resourceUri = `${EnvironmentParametersHelper.baseUrl()}${this.request.resourceUri}`
        return Send.a(this.request)
    }
}