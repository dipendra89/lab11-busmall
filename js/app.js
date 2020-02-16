'use strict';

var displayedProducts = [];

// products
var leftProduct;
var centerProduct;
var rightProduct;

// Tracking number of clicks
var numClick = 0;
var maxClick = 25;

var productImageParent = document.getElementById('productImage');
var productListParent = document.getElementById('productList');
var promptsParent = document.getElementById('prompts');

// Constructor
function Product(displayName, path) {
  this.displayName = displayName;
  this.path = path;
  this.description = this.path.slice(0, this.path.length - 4);
  this.displayed = 0;
  this.clicked = 0;
}

Product.prototype.render = render;
Product.prototype.pushToArray = function (){
  products.push(this);
};
Product.prototype.countDisplayed = function (){
  this.displayed ++;
};
Product.prototype.countClicked = function (){
  this.clicked ++;
};

// Using arrays
var products = [
  new Product('Travel Bag with eyes', 'bag.jpg'),
  new Product('Yellow Banana Slicer', 'banana.jpg'),
  new Product('Cutting edge bathroom toilet paper stand', 'bathroom.jpg'),
  new Product('Open toe Wet Boots', 'boots.jpg'),
  new Product('Francy Breakfast Maker with Built-in Coffee Maker', 'breakfast.jpg'),
  new Product('Meatball Bubblegum', 'bubblegum.jpg'),
  new Product('Not So Sexy Chair', 'chair.jpg'),
  new Product('Scary Cthulhu with thung on', 'cthulhu.jpg'),
  new Product('Cute Dog with Duck Mouth', 'dog-duck.jpg'),
  new Product('Canned Dragon Meat Not so Healthy, just saying', 'dragon.jpg'),
  new Product('Multitasking Pen with fork, spoon and everything', 'pen.jpg'),
  new Product('Pet Sweep System', 'pet-sweep.jpg'),
  new Product('Crazy Looking Pizza Scissors', 'scissors.jpg'),
  new Product('Lazy Shark', 'shark.jpg'),
  new Product('Hard working ', 'sweep.png'),
  new Product('Cute Little TaunTaun', 'tauntaun.jpg'),
  new Product('Radiant Farms Canned Unicorn Meat', 'unicorn.jpg'),
  new Product('Funny Dinosaur USB Tail', 'usb.gif'),
  new Product('Two in One Cup/Watering Can', 'water-can.jpg' ),
  new Product('Wine Glass with Hole in it', 'wine-glass.jpg')
];

// resets the images
removeChildren(productListParent);

// Direction on the top to click the item
renderPrompts('Please, click on an item you would most likely to purchase.', 'directions');

getProductState();

setup();
eventListener();

// Page setup
function setup() {

  leftProduct = generateProduct();
  centerProduct = generateProduct();
  rightProduct = generateProduct();

  render(leftProduct);
  render(centerProduct);
  render(rightProduct);
}

// EventListener
function eventListener(){
  productImageParent.addEventListener('click', eventHandler, true);
}

// eventHandler
function eventHandler(event) {
  numClick ++;

  var answer = event.target.getAttribute('id');
  var index = getClickedObjectIndex(answer, displayedProducts);
  displayedProducts[index].countClicked();
  createOrUpdateProductState();

  // resetting
  removeChildren(productImageParent);


  setup();

  // We will need to stop at 25
  if(maxClick <= numClick){
    productImageParent.removeEventListener('click', eventHandler, true);
    // removing images
    removeChildren(productImageParent);
    // removing list
    removeChildren(productListParent);
    // resetting prompt
    removeChildren(promptsParent);
    // changing prompt
    renderPrompts('Votes Received Per Product', 'votes');
    // displaying list
    displayVoteList();
    // displaying chart
    chart();
    // breaking out of event listener
    return;
  }
}

// Rendering image object
function render(productObj) {
  var image = document.createElement('img');
  image.setAttribute('src', 'images/' + productObj.path);
  image.setAttribute('id', productObj.description);
  image.setAttribute('class', 'productImage');
  image.setAttribute('width', '300px');
  image.setAttribute('height', '300px');

  productImageParent.appendChild(image);
}

// Rendering directions
function renderPrompts(textContent, identify){
  var prompt = document.createElement('p');
  prompt.setAttribute('id', identify);
  prompt.setAttribute('class', 'center');
  prompt.textContent = textContent;

  promptsParent.appendChild(prompt);
}

// Generateing random product from the products array
function generateProduct(){
  // Preventing consecutive products on display
  do{
    var index = Math.floor(Math.random() * products.length);
    var object = products[index];
  } while (displayedProducts.includes(object));

  displayedProducts.push(object);

  // Removing products displayed two sets prior
  if(displayedProducts.length === 6){
    displayedProducts.shift();
    displayedProducts.shift();
    displayedProducts.shift();
  }
  object.countDisplayed();
  return object;
}


// Allowing regeneration of products to display
function resetArrays(){
  displayedProducts = [];
}

// Removing children and set up render of new images
function removeChildren(parentNode){
  while (parentNode.hasChildNodes()){
    parentNode.removeChild(parentNode.firstChild);
  }
}

// Comparing array of clicked products
function getClickedObjectIndex(answer, displayedProducts){
  var index;
  displayedProducts.forEach(function(product){
    if (product.description === answer){
      index = displayedProducts.indexOf(product);
    }
  });
  return index;
}

// Displaying list of products clicked
function displayVoteList(){
  resetArrays();
  var ul = document.createElement('ul');
  productListParent.appendChild(ul);
  for(var i = 0; i < products.length; i++){
    var li = document.createElement('li');
    li.textContent = products[i].clicked + ' votes for the ' + products[i].displayName;
    ul.appendChild(li);
  }
}



// Here is CHART now
// Next Class
// Adding chart of data via chartJS
function chart() {
  var description = [];
  var clicked = [];

  var canvas = document.getElementById('chart');
  var ctx = canvas.getContext('2d');

  // Updating products
  for(var i = 0; i < products.length; i++){
    description.push(products[i].description);
    clicked.push(products[i].clicked);
  }

  // More chart thing here
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: description,
      datasets: [{
        label: 'Times Image Clicked',
        backgroundColor: 'rgb(66, 244, 188)',
        borderColor: 'rgb(66,244,188)',
        //Testing here
        data: clicked,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// We will be doing "STORAGE" in the later

// Retrieving from localStorage
function getProductState () {
  var storageProductState = localStorage.getItem('productState');
  if(storageProductState){
    var parsedProductState = JSON.parse(storageProductState);
    products.forEach(function(product){
      product.clicked = parsedProductState[product.description];
    });
  }
}

// Creating and  or updating in local storage
function createOrUpdateProductState(){
  // productState
  var productState = {};
  // Details on clicked
  products.forEach(function(product){
    productState[product.description] = product.clicked;
  });
  var stringifiedProductState = JSON.stringify(productState);
  localStorage.setItem('productState', stringifiedProductState);
  console.log(localStorage);
}
