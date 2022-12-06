'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
  authorsCloudLink: Handlebars.compile(document.querySelector('#template-authorCloud-link').innerHTML)
};

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.list.authors',
};


function titleClickHandler(event){
  event.preventDefault(); /* щоб не змінювалась адреса сайту при натисканні на посиланння */
  const clickedElement = this;
  // console.log('Link was clicked!');
  

  /* [DONE] remove class 'active' from all article links 
  видалити клас «активний» з усіх посилань на статті */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }


  /* [DONE] add class 'active' to the clicked link
  додайте клас «активний» до натиснутого посилання */

  clickedElement.classList.add('active');
  // console.log('clickedElement:', clickedElement);
  

  /* [DONE] remove class 'active' from all articles
  видалити клас «активний» з усіх статей */

  const activeArticles = document.querySelectorAll('article.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }


  /* [DONE] get 'href' attribute from the clicked link
  отримати атрибут 'href' за натиснутим посиланням */
  const articleSelector = clickedElement.getAttribute('href');
  // console.log ('my articleSelectors', clickedElement.getAttribute('href'));


  /* [DONE] find the correct article using the selector (value of 'href' attribute)
  знайти правильну статтю за допомогою селектора (значення атрибута 'href') */

  const targetArticle = document.querySelector(articleSelector);
  // console.log ('my targetArticle', targetArticle);
 
 
  /* [DONE]  add class 'active' to the correct article
  додати клас "активний" до правильної статті */

  targetArticle.classList.add('active');

}


//const   optArticleSelector = '.post',
  // optTitleSelector = '.post-title',
  // optTitleListSelector = '.titles',
  // optArticleTagsSelector = '.post-tags .list',
  // optArticleAuthorSelector = '.post-author',
  // optTagsListSelector = '.tags.list',
  // optCloudClassCount = 5,
  // optCloudClassPrefix = 'tag-size-',
  // optAuthorsListSelector = '.list.authors';
  

  

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList
  видалити вміст titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';
  
  /* for each article
  для кожної статті */
  const allArticles = document.querySelectorAll(opts.articleSelector + customSelector);
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
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    // console.log (articleTitle);
    /* create HTML of the link
    створити HTML посилання */
    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

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
 /* DONE [NEW] create a new variable allTags with an empty object
  створити нову змінну allTags з порожнім об'єктом */
  let allTags = {};

  /* find all articles 
  знайти всі статті*/
  const allArticles = document.querySelectorAll(opts.articleSelector);
 
    /* START LOOP: for every article: 
    ПОЧАТОК ЦИКЛУ: для кожної статті:*/
    for(let article of allArticles){
    // html = html + linkHTML;  
      /* find tags wrapper
      обгортка пошуку тегів*/
      const tagList = article.querySelector(opts.articleTagsSelector);
      // console.log (tagList);
      /* make html variable with empty string
      створити змінну html із порожнім рядком */
      let html = '';
      /* get tags from data-tags attribute
      отримати tags з атрибута data-tags*/
      const articleTags = article.getAttribute('data-tags');
      // console.log ('my articleTags', articleTags);
      /* split tags into array 
      розділити теги на масив*/
      const articleTagsArray = articleTags.split(' ');
      // console.log ('articleTagsArray', articleTagsArray);
      
      /* START LOOP: for each tag
      START LOOP: для кожного тегу */
      for(let tag of articleTagsArray) {
        
        /* generate HTML of the link 
        створити HTML посилання*/
        const tagHTMLData = {tag: tag};
        const tagHTML = templates.tagLink(tagHTMLData);
        // const tagHTML = '<li><a href="#tag-'+ tag + '">' + tag + ' </a></li> ';
        
        // console.log ('что тут видно? ', tagHTML);
        /* add generated code to html variable
        додати згенерований код до змінної html */
        html = html + tagHTML;

        /* DONE [NEW] check if this link is NOT already in allTags 
        Перевіряємо, чи це посилання вже є в таблиці allTags*/
        if (!allTags.hasOwnProperty(tag)) {
          /* DONE [NEW] add tag to allTags object 
          додати теги до allTags об'єкту*/
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        } 
    /* END LOOP: for each tag 
      ЗАКІНЧИТИ ЦИКЛ: для кожного тегу*/ 
      }
    // console.log ('my tagHtml', html)
    /* insert HTML of all the links into the tags wrapper
    вставте HTML усіх посилань у оболонку тегів */
    tagList.innerHTML = html;
  /* END LOOP: for every article: 
    ЗАКІНЧИТИ ЦИКЛ:  для кожної статті:*/
    }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  // console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  // console.log('AllTags', allTags);
  // console.log('tagsParams:', tagsParams)
  
  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};
  // let allTagsHTML = '';


  /* [NEW] START LOOP: for eash tag in allTadsHTML */
  for(let tag in allTags){
    /*[NEW] generate code of a link and add it to allTagsHTML */
    // console.log('LOG calc', tag, calculateTagClass(allTags[tag], tagsParams));
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    // allTagsHTML += '<li><a class="'+ opts.cloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-'+ tag + '">' + tag + ' (' + allTags[tag] + ') ' +' </a></li> ';
  // console.log(allTagsHTML);
  /* [NEW] END LOOP: for eash tag in allTags: */
  }
  // console.log('allTagsData', allTagsData);
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  // tagList.innerHTML = allTagsHTML;
}

function calculateTagsParams(tags){
  var params = { min: 99999, max: 0};
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    // console.log('max', params.max);    
    // console.log('min', params.min);

  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );
  return classNumber
}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event
  запобігти дії за замовчуванням для цієї події */
  event.preventDefault(); 

   /* make new constant named "clickedElement" and give it the value of "this"
   створити нову константу під назвою "clickedElement" і надати їй значення "this" */

  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element
  створіть нову константу "href" і прочитайте атрибут "href" клацнутого елемента */
  const href = clickedElement.getAttribute('href');
  // console.log ('aaaaa', href);

  /* make a new constant "tag" and extract tag from the "href" constant
  створіть нову константу "tag" і витягніть тег із константи "href". */
  const tag = href.replace('#tag-', '');
  // console.log ('bbbbbb', tag);

  /* find all tag links with class active
  знайти всі посилання на теги з активним класом */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  // console.log ('activeTags', activeTags);
  /* START LOOP: for each active tag link
  START LOOP: для кожного активного посилання тегу */
  for(let aTag of activeTags){
    // console.log ('activeTags11', aTag);
    /* remove class active
    видалити активний клас */
    aTag.classList.remove('active');
  /* END LOOP: for each active tag link
  END LOOP: для кожного активного посилання тегу */
  }

  /* find all tag links with "href" attribute equal to the "href" constant
  знайти всі посилання тегів з атрибутом "href", що дорівнює константі "href". */
  const allHrefLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log ('allHrefLinks', allHrefLinks);
  /* START LOOP: for each found tag link
  START LOOP: для кожного знайденого посилання тегу */
  for(let hrefLink of allHrefLinks){
    /* add class active
    додати клас active*/
    hrefLink.classList.add('active');
  /* END LOOP: for each found tag link
  END LOOP: для кожного знайденого посилання тегу */
  }
  /* execute function "generateTitleLinks" with article selector as argument
  виконати функцію "generateTitleLinks" із селектором статей як аргументом */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* find all links to tags
  знайти всі посилання на теги */
  const tagLinks = document.querySelectorAll('.list a');
  // const tagLinks = document.querySelectorAll(optArticleTagsSelector);
  // console.log(tagLinks);
  /* START LOOP: for each link
  START LOOP: для кожного посилання */
  for(let tLink of tagLinks){
    /* add tagClickHandler as event listener for that link 
    додати tagClickHandler як слухач подій для цього посилання*/
    tLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link
    END LOOP: для кожної ланки */
  }
}

addClickListenersToTags();


function generateAuthors(){
  let allAuthots = {}; 
  let articleAuthorsArray = [];
  const allArticles = document.querySelectorAll(opts.articleSelector);
    for(let article of allArticles){
      const authorList = article.querySelector(opts.articleAuthorSelector);
      let html = '';
      const authorTags = article.getAttribute('data-author'); 
      articleAuthorsArray.push(authorTags)
      // console.log('authorTags', authorTags);
      const authorHTMLData = {authorTags: authorTags};
      const authorHTML = templates.authorLink(authorHTMLData);
      // const authorHTML = 'By ' + '<a href="'+ authorTags + '">' + authorTags + '</a>';
      // console.log('authorHTML', authorHTML);
      html = html + authorHTML;
      authorList.innerHTML = html;
    }

    for(let author of articleAuthorsArray){
      // console.log('author', author);
      if (!allAuthots.hasOwnProperty(author)) {
        allAuthots[author] = 1;
      } else {
        allAuthots[author]++;
      }
    }
    // console.log('author++++', allAuthots);
    const authorList = document.querySelector(opts.authorsListSelector);
    // let allAuthorHTML = '';
    const allAuthorsData = {authors: []};
    for(let author in allAuthots){
      allAuthorsData.authors.push({
        author: author,
        count: allAuthots[author]
      });
      // allAuthorHTML += '<li><a href="'+ author + '">' + author + ' (' + allAuthots[author] + ') ' +'</a></li>';
      // console.log('allAuthorHTML', allAuthorHTML);
    }

    // authorList.innerHTML = allAuthorHTML;
    console.log('allAuthorsData', allAuthorsData);
    authorList.innerHTML = templates.authorsCloudLink(allAuthorsData);
}
generateAuthors();


function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  // console.log ('author href', href);
  generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthors(){
  // на основі addClickListenersToTags
  const tagLinks = document.querySelectorAll('.post-author a');
  for(let tLink of tagLinks){
    tLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();


