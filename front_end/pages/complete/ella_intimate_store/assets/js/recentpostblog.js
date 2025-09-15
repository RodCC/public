// Encontrar os 02 posts mais recentes
var posts = document.getElementsByClassName("blog_item");
var recentPosts = Array.from(posts)
  .sort(function (a, b) {
    var dateA = new Date(a.getElementsByClassName("cat-date")[0].innerText);
    var dateB = new Date(b.getElementsByClassName("cat-date")[0].innerText);
    return dateB - dateA;
  })
  .slice(0, 2);

// Copiar a fonte "src" da imagem do primeiro e segundo posts
var imgSrcFirstPost = recentPosts[0].getElementsByTagName("img")[0].src;
var imgSrcSecondPost = recentPosts[1].getElementsByTagName("img")[0].src;

// Copiar a referência "href" do link do primeiro e segundo posts
var linkFirstPost = recentPosts[0].getElementsByTagName("a")[0].href;
var linkSecondPost = recentPosts[1].getElementsByTagName("a")[0].href;

// Copiar o valor contido na classe "blog-head" do primeiro e segundo posts
var titleFirstPost =
  recentPosts[0].getElementsByClassName("blog-head")[0].innerText;
var titleSecondPost =
  recentPosts[1].getElementsByClassName("blog-head")[0].innerText;

// Copiar o valor contido na classe "cat-date" do primeiro e segundo posts
var dateFirstPost =
  recentPosts[0].getElementsByClassName("cat-date")[0].innerText;
var dateSecondPost =
  recentPosts[1].getElementsByClassName("cat-date")[0].innerText;

// Preencher os elementos do post_item
document.getElementById("post_item1_img").src = imgSrcFirstPost;
document.getElementById("post_item2_img").src = imgSrcSecondPost;

document.getElementById("post_item1_link").href = linkFirstPost;
document.getElementById("post_item2_link").href = linkSecondPost;

document.getElementById("post_item1_title").innerText = titleFirstPost;
document.getElementById("post_item2_title").innerText = titleSecondPost;

document.getElementById("post_item1_date").innerText = dateFirstPost;
document.getElementById("post_item2_date").innerText = dateSecondPost;
