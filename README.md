# lab11-busmall
Continued from Lab11


Initial Instructions:

As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

Create a constructor function that creates an object associated with each product, and has the following properties:
Name of the product
File path of image
Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

Attach an event listener to the section of the HTML page where the images are going to be displayed.

Once the users ‘clicks’ a product, generate three new products for the user to pick from.
As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.
In the constructor function define a property to hold the number of times a product has been clicked.

After every selection by the viewer, update the newly added property to reflect if it was clicked.

As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.
By default, the user should be presented with 25 rounds of voting before ending the session.
Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.
As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.
Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered.

After voting rounds have been completed, remove the event listeners on the product.

Display the list of all the products followed by the votes received and number of times seen for each.

// Then Add the Chart

// Then Add the Local Storage

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Every iteration, 3 out of 20 some images are displayed. So, at any given time, 3 images can be viewed.
As per instruction, the number of clicks is limited to 25. Images are the products that customers might be interested purchasing which I have put in an array.
EventListener and EventHandler are also used.
A function is use to randomly generate the product. Also, the same product won't be displayed again the very next iteration.
A function is called to display the number of products clicked. Then, I chart to display the result. and also at the end, the data is stored in local storage so when you run the program, you can see the results adding up.
You can also reset or clear the local storage to see the new calculation.

