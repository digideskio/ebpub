# Experience Bureau Public Site

This site was built using Yeoman, Grunt, Backbone, Jade and Compass.

## Why all the tech for such a simple site.

Mostly for fun to be fair. But there was some reasoning...

### Why Yeoman?

Because it seems like a really good idea with a lot of really nifty kit to use as a starting point for a new site.

### Why Grunt and Compass?

Why on earth not? They make life easier.

### Why Jade?

Using Jade with Yeoman basically gives me a static site generator with templates and includes. This made it a lot easier set up real pages for each 
section of the site even though the content is loaded using AJAX. 

So if someone comes to a page other than the home page, everything will still work. Also, robots and crawlers without JS will still get the correct 
page content. For example, the contact page exists as a real page with only the contact info on that page. If a robot hits the contact page, that is
what they'll see. If a real user hits the contact page, the additional content will load via AJAX so that they're essentially seeing a single page app
and then the Backbone router and views will manage their experience.

### Why Backbone?

Backbone changed everything for me. Before Backbone I just did everything in the DOM using JQuery. Backbone helps me to think about my JS a bit smarter
and a bit more Object Oriented like. Also, the built in Router with Push State support comes in pretty handy for simple things like this. As do the Views
of course.

I ended up using the one view for all of the pages which is a bit lazy but for such a small site it seemed like a good thing to do at the time.

## Additional notes

The Groundskeeper Grunt plugin was a bit of a find. Makes it very easy to strip out all console statements before publishing.

This is my first time experimenting with SVG for the graphics. I must say it was almost disappointingly non-eventful. Don't know why I haven't been using
SVG before now.