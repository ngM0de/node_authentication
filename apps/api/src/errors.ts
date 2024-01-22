const getMessage = (message) => ({ message });
export const errors = {
  '500': getMessage('Unknown error'),
  '401': getMessage('Unathorized')
};


