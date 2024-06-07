const db = require("../database/db.js");

const select_products = db.prepare(/*sql*/ `
  SELECT name, quantity_per_unit, unit_price, units_in_stock, units_on_order FROM products
`);

function listProducts() {
  return select_products.all();
}

// Write and export a new function named searchProducts in model/products. This function should take a search string, then return any products in the products table whose name contains that string. Each product should include the id and name columns. For example searchProducts("iscu") should return [{ id: 19, name: "Teatime Chocolate Biscuits" }].

// This function is used in routes/search.js. Once you've finished it you should be able to visit /search in your browser and use the search form to browse the products.

module.exports = { listProducts };
