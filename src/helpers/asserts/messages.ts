export class ErrorMessages {

    bodyMatchesAssertionMessage(endpoint: string) {
        return `${endpoint} response not matches with the Expected Schema`
    }

    expectedKeyValueAssertionMessage(endpoint: string, expectedKey: string, expectedValue: string, actualValue: string) {
        return `${endpoint} expected ${expectedKey} to be ${expectedValue}, but received ${actualValue}`
    }

    statusCodeAssertionMessage(endpoint: string, statusCode: number, responseStatus: number) {
        return `${endpoint} expected response status to be ${statusCode}, but received ${responseStatus}`
    }

    userDeletedAssertionMessage() {
        return `DELETE_USER is not working as expected because SEARCH_USER is retrieving a number of users greater than zero`
    }
}