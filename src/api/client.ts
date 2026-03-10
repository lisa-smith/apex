const DELAY = 800;
const FAILURE_RATE = 0.1;

export const mockFetch = async <T>(data: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error("Network Error: Failed to connect to Apex Server"));
      }
      resolve(data);
    }, DELAY);
  });
};
