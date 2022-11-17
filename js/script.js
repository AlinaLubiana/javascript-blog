'use strict';

function titleClickHandler(event){
  event.preventDefault(); /* щоб не змінювалась адреса сайту при натисканні на посиланння */
  const clickedElement = this;
  console.log('Link was clicked!');
  

  /* [DONE] remove class 'active' from all article links 
  видалити клас «активний» з усіх посилань на статті */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }


  /* [DONE] add class 'active' to the clicked link
  додайте клас «активний» до натиснутого посилання */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  

  /* [DONE] remove class 'active' from all articles
  видалити клас «активний» з усіх статей */

  const activeArticles = document.querySelectorAll('article.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }


  /* [DONE] get 'href' attribute from the clicked link
  отримати атрибут 'href' за натиснутим посиланням */
  const articleSelector = clickedElement.getAttribute('href');
  console.log ('my articleSelectors', clickedElement.getAttribute('href'));


  /* [DONE] find the correct article using the selector (value of 'href' attribute)
  знайти правильну статтю за допомогою селектора (значення атрибута 'href') */

  const targetArticle = document.querySelector(articleSelector);
  console.log ('my targetArticle', targetArticle);
 
 
  /* [DONE]  add class 'active' to the correct article
  додати клас "активний" до правильної статті */

  targetArticle.classList.add('active');

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* find all articles 
  знайти всі статті*/

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';


  /* START LOOP: for every article: 
  ПОЧАТОК ЦИКЛУ: для кожної статті:*/
  

    /* find tags wrapper
    обгортка пошуку тегів*/

    /* make html variable with empty string
    створити змінну html із порожнім рядком */

    /* get tags from data-tags attribute
    отримати теги з атрибута data-tags*/

    /* split tags into array 
    розділити теги на масив*/

    /* START LOOP: for each tag
    START LOOP: для кожного тегу */

      /* generate HTML of the link 
      створити HTML посилання*/

      /* add generated code to html variable
      додати згенерований код до змінної html */

    /* END LOOP: for each tag 
    ЗАКІНЧИТИ ЦИКЛ: для кожного тегу*/

    /* insert HTML of all the links into the tags wrapper
    вставте HTML усіх посилань у оболонку тегів */

  /* END LOOP: for every article: 
  ЗАКІНЧИТИ ЦИКЛ:  для кожної статті:*/
}

generateTags();


