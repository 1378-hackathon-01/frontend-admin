import procceedError from './procceed-error';

const timer = (ms: number): Promise<null> => new Promise((res) => setTimeout(res, ms));

async function handleAuthError<T>(operation: () => Promise<T>): Promise<T> {
  try {
    const result = await operation();
    return result;
  } catch (e) {
    procceedError(e as Error, true);
    await timer(10000);
    throw e;
  }
}

export default handleAuthError;
