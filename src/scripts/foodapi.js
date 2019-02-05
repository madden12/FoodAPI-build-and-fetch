// fetch("http://localhost:8088/food")
// .then(foods => foods.json())
// .then(parsedFoods => {

//     console.table(parsedFoods)

// })
// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
       
//         parsedFoods.forEach(food => {
//            //Print foods to DOM
//            document.querySelector(".foodList").innerHTML += `<div><h1>${food.name}</h1><p>${food.category}</p><p>${food.ethnicity}</p></div>`
//         })
//     })

    fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            // console.log(food.barcode) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients_text;
                    // console.log(food.ingredients);
                    food.country = productInfo.product.countries_hierarchy;
                    // console.log(food.country);
                    food.fat = productInfo.product.nutriments.fat_serving;
                    // console.log(food.fat);
                    food.sugar = productInfo.product.nutriments.sugars;
                    console.log(food.sugar);
                    food.carbs = productInfo.product.nutriments.carbohydrates;
                    console.log(food.carbs)
                    // Produce HTML representation
                    document.querySelector(".foodList").innerHTML += `<div><h1>${food.name}</h1><p>${food.category}</p><p>${food.ethnicity}</p>${food.ingredients}</p><p>Made ${food.country}</p><p>Fat grams per serving: ${food.fat}</p><p>Sugars: ${food.sugar}</p><p>Carbohydrates: ${food.carbs}</p></div>`
                    
                })
        })
    })