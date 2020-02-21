# lab11-busmall
Busmall Lab


User Story:

As a marketeer, I want to prevent users from seeing the same image in two subsequent iterations, so that they are not biased.
Update your algorithm to randomly generate three unique product images from the images directory.
Update your algorithm so that new products are generated, confirm that these products are not duplicates from the immediate previous set.

As a user, I would like to track how many times a product has appeared in a voting session, so that I can track analytics on each piece of data.
Add an additional property to your constructor function that tracks the number of times the product has been shown.
Update this new property every time the product is shown as one of the three options on the screen for the viewer to choose.
As a marketing manager, I would like a visual representation of how many times a product was clicked so that I can visually analyze the results.

Using ChartJS (imported from CDN), display the vote totals and the number of times a product was viewed in a bar chart format. (hint: don’t forget about the <canvas> tags)
Place the bar chart in the section located beneath your three product images
The bar charts should only appear after all voting data has been collected.
