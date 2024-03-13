// utils/retryRequest.ts
async function delayedRequest(func: () => Promise<any>, retries: number = 5, delay: number = 1000): Promise<any> {
    try {
        return await func();
    } catch (error: any) {
        if (retries === 0 || !error.response || error.response.data.reason !== 'Too Many Requests. Try again later.') {
            throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        return delayedRequest(func, retries - 1, delay * 2);
    }
}

export { delayedRequest }
