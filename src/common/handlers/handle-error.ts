import procceedError from './procceed-error';

const timer = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function handleError<T>(operation: () => T): T {
  try {
    const result = operation();
    return result;
  } catch (e) {
    procceedError(e as Error, false);
    timer(10000);
    throw e;
  }
}

export default handleError;
