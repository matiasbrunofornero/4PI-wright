import Ajv from "ajv";

export class Assertions {

    async ifResponseBodyMatchesWith(expectedSchema: object, jsonResponse: object) {
        const ajv = new Ajv();
        const validate = ajv.compile(expectedSchema);
        const valid = validate(jsonResponse);

        return valid ? true : false
    }

    ifResponseBodyContainsExpectedKeyValue(jsonResponse: object, expectedKey: string, expectedValue: string) {
        if (!jsonResponse.hasOwnProperty(expectedKey)) {
            throw new Error(`Received JSON does not include '${expectedKey}' key`);
        }

        return jsonResponse[expectedKey] == expectedValue;
    }

    ifResponseStatusCodeIsEqualsTo(statusCode: number, responseStatus: number) {
        return responseStatus == statusCode;
    }

    ifUserWasCorrectlyDeleted(jsonResponse: any) {
        return jsonResponse.pagination.total;
    }
}