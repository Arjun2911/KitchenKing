const searchBtn =document.getElementById('searchIconI');
const mealItems =document.getElementById('mealItemI');
const mealDetails =document.querySelector('.mealDetails');
const closeBtn =document.getElementById('xBtnI');

//event listeners
searchBtn.addEventListener('click',getMealItems);
mealItems.addEventListener('click',getMealRecipe);
closeBtn.addEventListener('click',()=>{
    mealDetails.parentElement.classList.remove('showRecipe');
})


function getMealItems(){
    let inputText = document.getElementById('searchContentI').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`)
    .then(response => response.json())
    .then(data=>{
        let html="";
        if(data.meals){
            data.meals.forEach(meal => {
                html+=`
                <div class="mealItem" data-id="${meal.idMeal}">
                    <div class="mealImg">
                        <img src="${meal.strMealThumb}" alt="" class="mealImage">
                    </div>
                    <div class="mealName">
                        <h3>${meal.strMeal}</h3>
                    </div>
                    <div class="recipeBtn">Get Recipe</div>
                </div> 
                `;
                
            });
            mealItems.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealItems.classList.add('notFound');
        }
        mealItems.innerHTML=html;
    });
}
function getMealRecipe(e){
    e.preventDefault();
    //  console.log(e.target);
    if(e.target.classList.contains('recipeBtn')){
        let foodItem = e.target.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)
        .then(response=> response.json())
        .then(data=> mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal){
    console.log(meal);
    meal=meal[0];
    let html=`
                <h1 class="mealName2">${meal.strMeal}</h1>
                <p>${meal.strCategory}</p>
                <p>${meal.strInstructions}
                </p>
                <div class="img1">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="vLink">
                    <a href="${meal.strYoutube}">Watch video</a>
                </div>
    `
    mealDetails.innerHTML=html;
    mealDetails.parentElement.classList.add('showRecipe');
}