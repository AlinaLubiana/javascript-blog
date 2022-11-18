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




const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';


function generateTitleLinks(){

  /* remove contents of titleList
  видалити вміст titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  
  /* for each article
  для кожної статті */
  const allArticles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for(let article of allArticles){
    /* get the article id
    отримати ідентифікатор статті*/
    const articleId = article.getAttribute('id');
    // console.log (articleId);
    /* find the title element
    знайти title*/
    /* get the title from the title element 
    отримати назву з елемента title*/
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log (articleTitle);
    /* create HTML of the link
    створити HTML посилання */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log (linkHTML);
    /* insert link into titleList
    вставити посилання в titleList */
    html = html + linkHTML;  
  }
  // console.log (html);
  titleList.innerHTML = html;

  /*Відновлення функціональності клацання посилань */
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();





function generateTags(){
  /* find all articles 
  знайти всі статті*/
  const allArticles = document.querySelectorAll(optArticleSelector);
 
    /* START LOOP: for every article: 
  ПОЧАТОК ЦИКЛУ: для кожної статті:*/
    for(let article of allArticles){
    // html = html + linkHTML;  
  
  /* find tags wrapper
    обгортка пошуку тегів*/
    const tagList = article.querySelector(optArticleTagsSelector);
    console.log (tagList);
    /* make html variable with empty string
    створити змінну html із порожнім рядком */
    let html = '';
  /* get tags from data-tags attribute
    отримати теги з атрибута data-tags*/
    const articleTags = article.getAttribute('data-tags');
    console.log ('my articleTags', articleTags);
    /* split tags into array 
    розділити теги на масив*/
    const articleTagsArray = articleTags.split(' ');
    console.log ('articleTagsArray', articleTagsArray);
     /* START LOOP: for each tag
    START LOOP: для кожного тегу */
    for(let tag of articleTagsArray) {
      /* generate HTML of the link 
      створити HTML посилання*/
      const tagHTML = '<li><a href="#tag-'+ tag + '">' + tag + ' </a></li> ';
      /* add generated code to html variable
      додати згенерований код до змінної html */
      html = html + tagHTML;
      /* END LOOP: for each tag 
    ЗАКІНЧИТИ ЦИКЛ: для кожного тегу*/ 
    }
    console.log ('my tagHtml', html)
    /* insert HTML of all the links into the tags wrapper
    вставте HTML усіх посилань у оболонку тегів */
    tagList.innerHTML = html;
  /* END LOOP: for every article: 
    ЗАКІНЧИТИ ЦИКЛ:  для кожної статті:*/
  }
}
generateTags();



