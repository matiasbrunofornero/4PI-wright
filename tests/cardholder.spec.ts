import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter/dist/playwright';

import { Roles } from '../src/utils/roles';
import { EndpointsName } from '../src/utils/endpoints';
import { HttpStatus } from '../src/utils/statusCode';
import { APIActions } from '../src/helpers/actions/api';
import { Assertions } from '../src/helpers/asserts/assertions';
import { ErrorMessages } from '../src/helpers/asserts/messages';

import getUser_schema from '../src/models/schemas/getUser.json';
import createdUser_schema from '../src/models/schemas/createdUser.json';

const apiActions = new APIActions();
const assertions = new Assertions();
const errorMsgs = new ErrorMessages();

test(qase(1, 'CRUD operations for a cardholder'), async ({ request }) => {

    const rndInt = Math.floor(Math.random() * 10000) + 100;
    const automatedUserEmail = "automated_user_" + rndInt + "@test.app";
    const automatedUserName = "Automated User " + rndInt;

    let response = await apiActions.createUserWith(request, automatedUserEmail, Roles.ADMIN, automatedUserName);
    let responseBody = await response.json();

    expect(assertions.ifResponseStatusCodeIsEqualsTo(HttpStatus.CREATED, response.status()),
        errorMsgs.statusCodeAssertionMessage(EndpointsName.CREATE_USER, HttpStatus.CREATED, response.status())).toBe(true);

    expect(await assertions.ifResponseBodyMatchesWith(createdUser_schema, responseBody),
        errorMsgs.bodyMatchesAssertionMessage(EndpointsName.CREATE_USER)).toBe(true);

    expect(assertions.ifResponseBodyContainsExpectedKeyValue(responseBody, 'name', automatedUserName),
        errorMsgs.expectedKeyValueAssertionMessage(EndpointsName.CREATE_USER, 'name', automatedUserName, responseBody.name)).toBe(true);

    expect(assertions.ifResponseBodyContainsExpectedKeyValue(responseBody, 'email', automatedUserEmail),
        errorMsgs.expectedKeyValueAssertionMessage(EndpointsName.CREATE_USER, 'email', automatedUserEmail, responseBody.email)).toBe(true);

    expect(assertions.ifResponseBodyContainsExpectedKeyValue(responseBody, 'role', Roles.ADMIN),
        errorMsgs.expectedKeyValueAssertionMessage(EndpointsName.CREATE_USER, 'role', Roles.ADMIN, responseBody.role)).toBe(true);

    response = await apiActions.searchUserBy(request, automatedUserEmail, Roles.ADMIN);
    responseBody = await response.json();

    expect(assertions.ifResponseStatusCodeIsEqualsTo(HttpStatus.CREATED, response.status()),
        errorMsgs.statusCodeAssertionMessage(EndpointsName.SEARCH_USER, HttpStatus.CREATED, response.status())).toBe(true);

    expect(await assertions.ifResponseBodyMatchesWith(getUser_schema, responseBody),
        errorMsgs.bodyMatchesAssertionMessage(EndpointsName.SEARCH_USER)).toBe(true);

    expect(assertions.ifResponseBodyContainsExpectedKeyValue(responseBody.data[0], 'name', automatedUserName),
        errorMsgs.expectedKeyValueAssertionMessage(EndpointsName.SEARCH_USER, 'name', automatedUserName, responseBody.data[0].name)).toBe(true);

    const UUID = responseBody.data[0].uuid;
    const updatedUserName = "Updated User " + rndInt;

    response = await apiActions.updateUserNameWith(request, UUID, updatedUserName);

    expect(assertions.ifResponseStatusCodeIsEqualsTo(HttpStatus.OK, response.status()),
        errorMsgs.statusCodeAssertionMessage(EndpointsName.UPDATE_USER, HttpStatus.OK, response.status())).toBe(true);

    response = await apiActions.searchUserBy(request, automatedUserEmail, Roles.ADMIN);
    responseBody = await response.json();

    expect(assertions.ifResponseStatusCodeIsEqualsTo(HttpStatus.CREATED, response.status()),
        errorMsgs.statusCodeAssertionMessage(EndpointsName.SEARCH_USER, HttpStatus.CREATED, response.status())).toBe(true);

    expect(await assertions.ifResponseBodyMatchesWith(getUser_schema, responseBody),
        errorMsgs.bodyMatchesAssertionMessage(EndpointsName.SEARCH_USER)).toBe(true);

    expect(assertions.ifResponseBodyContainsExpectedKeyValue(responseBody.data[0], 'name', updatedUserName),
        errorMsgs.expectedKeyValueAssertionMessage(EndpointsName.SEARCH_USER, 'name', updatedUserName, responseBody.data[0].name)).toBe(true);

    response = await apiActions.deleteUserBy(request, UUID);

    expect(assertions.ifResponseStatusCodeIsEqualsTo(HttpStatus.OK, response.status()),
        errorMsgs.statusCodeAssertionMessage(EndpointsName.DELETE_USER, HttpStatus.OK, response.status())).toBe(true);

    response = await apiActions.searchUserBy(request, automatedUserEmail, Roles.ADMIN);
    responseBody = await response.json();

    expect(assertions.ifResponseStatusCodeIsEqualsTo(HttpStatus.CREATED, response.status()),
        errorMsgs.statusCodeAssertionMessage(EndpointsName.SEARCH_USER, HttpStatus.CREATED, response.status())).toBe(true);

    expect(assertions.ifUserWasCorrectlyDeleted(responseBody), errorMsgs.userDeletedAssertionMessage()).toEqual(0);
});