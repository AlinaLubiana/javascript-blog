'use strict';

function titleClickHandler(event){
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links 
  видалити клас «активний» з усіх посилань на статті */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /*[IN PROGRESS] add class 'active' to the clicked link
  додайте клас «активний» до натиснутого посилання */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  
  /*[DONE] remove class 'active' from all articles
  видалити клас «активний» з усіх статей */

  const activeArticles = document.querySelectorAll('article.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link
  отримати атрибут 'href' за натиснутим посиланням */

  /* find the correct article using the selector (value of 'href' attribute)
  знайти правильну статтю за допомогою селектора (значення атрибута 'href') */

  /* add class 'active' to the correct article
  додати клас "активний" до правильної статті */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}



