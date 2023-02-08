const baseURL = 'https://server-nodejs.cit.byui.edu:3000/'


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  //new getData from API
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }


  /* old get data (local JSON file)
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  */

  // async findProductById(id) {
  //   const products = await this.getData();
  //   return products.find((item) => item.Id === id);
  // }

  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result
  }
}
