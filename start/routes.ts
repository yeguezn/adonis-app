/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.resource("products", "ProductsController").apiOnly()
Route.resource("categories", "CategoriesController").apiOnly()
Route.resource("meassures", "MeassuresController").only(["index", "show"])
Route.resource("people", "PeopleController").apiOnly()
Route.resource("banks", "BanksController").apiOnly()
Route.resource("currencies", "CurrenciesController").apiOnly()


Route.post("/sales/:id", "SalesController.finishSale")
Route.get("/productsByCategory/:id", "ProductsController.filterProductsByCategory")