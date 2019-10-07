export const ACTION_LOADING_SHOW = 'G_LOADING_SHOW';
export const ACTION_LOADING_HIDE = 'G_LOADING_HIDE';

export const actions = {
    showLoading: (text?: string) => ({
        type: ACTION_LOADING_SHOW,
        payload: {
            loadingText: text || 'Loading...',
        },
    }),
    hideLoading: () => ({
        type: ACTION_LOADING_HIDE,
    })
};

export const reducer = (state = { loading: false }, action: any) => {
    switch (action.type) {
        case ACTION_LOADING_SHOW: {
            const { loadingText } = action.payload;
            return { ...state, loading: true, loadingText };
        }
        case ACTION_LOADING_HIDE: {
            return { ...state, loading: false };
        }
        default:
            return state;
    }
};
