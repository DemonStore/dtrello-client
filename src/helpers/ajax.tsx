import axios, {
    AxiosPromise,
} from 'axios';

import { config } from '../config';

export interface AjaxOptions {
    baseURL?: string;
    token?: string | null;
}

export class Ajax {
    public static setGlobalOptions(options: AjaxOptions) {

        if (options.baseURL) {
            axios.defaults.baseURL = options.baseURL;
        }

        if (options.token || options.token === null) {
            axios.defaults.headers['Authorization'] = (!!options.token)
                ? `Bearer ${options.token}`
                : null;
        }
    }

    public static get(url: string): AxiosPromise {
        return axios.get(url) as AxiosPromise;
    }

    public static post(url: string, data: any): AxiosPromise {
        return axios.post(url, data);
    }

    public static remove(url: string): AxiosPromise {
        return axios.delete(url);
    }

    public static put(url: string, data: any): AxiosPromise {
        return axios.put(url, data);
    }

    public static patch(url: string, data: any): AxiosPromise {
        return axios.patch(url, data);
    }
}

Ajax.setGlobalOptions({
    baseURL: config.resourceBaseUri
});

export default Ajax;
