export interface Config {
    resourceBaseUri: string;
}

const getConfig =  (): Config => {
    return {
        resourceBaseUri: 'http://localhost:8000'
    }
};

export const config = getConfig();
