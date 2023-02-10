//const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'
const baseURL = 'https://wdd330-backend.onrender.com/'


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
    const response = await fetch(baseURL + `products/search/${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
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
