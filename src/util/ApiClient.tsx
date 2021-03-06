import entityNames from '~/enums/entityNames';
import FetchStatusCode from '~/enums/fetchStatusCode';
import ApiClientHelper from './apiClientHelper';

enum RequestMethod {
    POST= 'POST',
    PUT= 'PUT',
    DELETE= 'DELETE',
}

export class IRequestError {
    errorCode: FetchStatusCode;
    message: string;
}

const API_URL = process.env.API_URL || 'http://localhost:3040';

export default class ApiClient {
    public async updateObject(entityName: entityNames, object: any) {
        return await this.sendRequest(RequestMethod.POST, entityName, object);
    }

    public async addObject(entityName: entityNames, object: any) {
        return await this.sendRequest(RequestMethod.PUT, entityName, object);
    }

    public async deleteObject(entityName: entityNames, object: any) {
        return await this.sendRequest(RequestMethod.DELETE, entityName, object);
    }

    private async sendRequest(method: RequestMethod, entityName: entityNames, object: any) {
        const formattedObject = ApiClientHelper.format(object);
        let error : (IRequestError | null) = null;

        try {
            const response = await fetch(this.getUrl(entityName), {
                method,
                body: JSON.stringify(formattedObject),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.status >= 200 && response.status < 300) {
                return;
            }
            error = {
                errorCode: response.status,
                message: response.statusText,
            };
        } catch (err) {
            error = {
                errorCode: FetchStatusCode.CONNECTION_ERROR,
                message: 'Yhteysongelma',
            };
        }

        if (error) {
            throw error;
        }
    }

    private getUrl(entityName: entityNames) {
        return `${API_URL}/${entityName}`;
    }
}
