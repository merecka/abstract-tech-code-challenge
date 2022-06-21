/*
 * simulates an async data fetch. Data are stored locally, so this
 * just clumsily pretends they're not.
 */


export async function fetchData(type) {
  try {
    let data = await import(`../../data/${type}`);
    if (_.has(data, [type])) data = data[type];
    return new Promise((res) => {
      setTimeout(() => res(data), _.random(150, 1200));
    });
  } catch(e) {
    console.error(e);
    return Promise.reject(e);
  }
}
