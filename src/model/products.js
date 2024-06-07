const db = require("../database/db.js");

const select_products = db.prepare(/*sql*/ `
  SELECT 
  id, 
  name, 
  quantity_per_unit, 
  FORMAT('£%.2f', unit_price) AS unit_price, 
  units_in_stock, 
  FORMAT('£%.2f', unit_price * units_in_stock) AS stock_value, units_on_order
  FROM products
`);

function listProducts() {
  return select_products.all();
}

const search_products = db.prepare(/*sql*/ `
SELECT id, name FROM products WHERE name LIKE ?;
`);

function searchProducts(string) {
  //% % used to match any sequence of characters
  return search_products.all("%" + string + "%");
}

// What is the  difference between INNER JOIN and JOIN?
//Why don't we put category.id in the SELECT?
const get_product = db.prepare(/*sql*/ `
SELECT 
products.id, 
products.name,  
categories.name AS category_name, 
categories.description AS category_description 
FROM products 
JOIN categories ON 
products.category_id = categories.id 
WHERE products.id = ?
`);

function getProduct(id) {
  return get_product.get(id);
}

module.exports = { listProducts, searchProducts, getProduct };
