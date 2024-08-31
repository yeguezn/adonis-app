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


Route.group(()=>{
    Route.get("/products", "ProductsController.index")
    Route.get("/products/:id", "ProductsController.show")
    Route.post("/products", "ProductsController.store").middleware("auth")
    Route.put("/products/:id", "ProductsController.update").middleware("auth")
    Route.delete("/products/:id", "ProductsController.delete").middleware("auth")
}).middleware("DetectUserLocale")

Route.group(()=>{
    Route.get("/meassures", "MeassuresController.index").middleware("auth")
    Route.get("/meassures/:id", "MeassuresController.show").middleware("auth")
})

Route.group(()=>{
    Route.get("/people", "PeopleController.index").middleware("auth")
    Route.get("/people/:id", "PeopleController.show").middleware("auth")
    Route.post("/people", "PeopleController.store")
    Route.put("/people/:id", "PeopleController.update").middleware("auth")
    Route.delete("/people/:id", "PeopleController.delete").middleware("auth")
})

Route.group(()=>{
    Route.get("/banks", "BanksController.index").middleware("auth")
    Route.get("/banks/:id", "BanksController.show").middleware("auth")
    Route.post("/banks", "BanksController.store").middleware("auth")
    Route.put("/banks/:id", "BanksController.update").middleware("auth")
    Route.delete("/banks/:id", "BanksController.delete").middleware("auth")
})

Route.group(()=>{
    Route.get("/currencies", "CurrenciesController.index")
    Route.get("/currencies/:id", "CurrenciesController.show")
    Route.post("/currencies", "CurrenciesController.store")
    Route.put("/currencies/:id", "CurrenciesController.update")
    Route.delete("/currencies/:id", "CurrenciesController.delete")
}).middleware("auth")

Route.group(()=>{
    Route.get("/categories", "CategoriesController.index")
    Route.get("/categories/:id", "CategoriesController.show")
    Route.post("/categories", "CategoriesController.store").middleware("auth")
    Route.put("/categories/:id", "CategoriesController.update").middleware("auth")
    Route.delete("/categories/:id", "CategoriesController.delete").middleware("auth")
}).middleware("DetectUserLocale")

Route.post("/sales/:id", "SalesController.finishSale").middleware("auth")
Route.get("/productsByCategory/:id", "ProductsController.filterProductsByCategory")
Route.post("/login", "AuthController.login")
Route.post("/logout", "AuthController.logout")