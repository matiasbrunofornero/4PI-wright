import { APIRequestContext } from '@playwright/test';
import { EndpointsUrl } from '../../utils/resources';

export class APIActions {

    async createUserWith(request: APIRequestContext, email?: string, role?: string, name?: string) {
        return await request.post(EndpointsUrl.CREATE_USER, {
            data: {
                "email": email,
                "role": role,
                "name": name
            }
        })
    }

    async deleteUserBy(request: APIRequestContext, uuid: string) {
        return await request.delete(EndpointsUrl.USERS + uuid);
    }

    async searchUserBy(request: APIRequestContext, email?: string, role?: string, name?: string) {
        return ((!email && !role && !name) ? await request.post(EndpointsUrl.SEARCH_USER)
            : await request.post(EndpointsUrl.SEARCH_USER, {
                data: {
                    "filters": {
                        "email": email,
                        "role": [role],
                        "name": name
                    },
                }
            })
        )
    }

    async updateUserNameWith(request: APIRequestContext, uuid: string, name: string) {
        return await request.patch(EndpointsUrl.USERS + uuid, {
            data: {
                name: name
            }
        });
    }
}
