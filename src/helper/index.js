import getTitleAtUrl from 'get-title-at-url';

function promisify(url) {
  return new Promise(resolve => {
    getTitleAtUrl(url, response => resolve(response));
  });
}

export const getPageTitle = (url) => {
  return promisify(url)
}