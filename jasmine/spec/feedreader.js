/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

  //---------------------------------------------------------------------------
  // The start of the test suite "RSS Feeds"
  //---------------------------------------------------------------------------
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('all has URL', function() {
      //Set expectation initially to true
      var hasURL = true;

      //Loop through all feeds and check for any unexpected output and if true set our expectation to false
      for (var i = 0; i < allFeeds.length; i++) {
        if (typeof allFeeds[i].url === "undefined") { //If the URL isn't defined
          hasURL = false;
          break;
        } else if (allFeeds[i].url.length === 0) { //Or if the URL is empty
          hasURL = false;
          break;
        }
      }

      //Test out expectation
      expect(hasURL).toBe(true);
    });


    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('all has names', function() {
      //Set expectation initially to true
      var hasName = true;

      //Loop through all feeds and check for any unexpected output and if true set our expectation to false
      for (var i = 0; i < allFeeds.length; i++) {
        if (typeof allFeeds[i].name === "undefined") { //If the name isn't defined
          hasName = false;
          break;
        } else if (allFeeds[i].name.length === 0) { //Or if the name is empty
          hasName = false;
          break;
        }
      }

      //Test out expectation
      expect(hasName).toBe(true);
    });
  });
  //---------------------------------------------------------------------------
  // The end of the test suite "RSS Feeds"
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  // The start of the test suite "The menu"
  //---------------------------------------------------------------------------
  /* A new test suite named "The menu" */
  describe('The menu', function() {
    /* A test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden by default', function() {
      //Check that the class "menu-hidden" is part of the body class be default
      var bodyClass = $('body').attr("class");
      var isHidden = bodyClass.indexOf("menu-hidden");
      expect(isHidden).not.toBeLessThan(0); //This means that "menu-hidden" is one of the classes in the body
    });

    /* A test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility on click', function() {
      var spyEvent = spyOnEvent(".menu-icon-link", "click"); //Listen to the menu icon
      $('.menu-icon-link').click(); //Click the menu icon
      expect('click').toHaveBeenTriggeredOn('.menu-icon-link'); //Check that is has been clicked the menu icon
      var bodyClass = $('body').attr("class");
      var isHidden = bodyClass.indexOf("menu-hidden"); //Check for the menu-hidden class
      expect(isHidden).toBeLessThan(0); //Less than 0 means "menu-hidden" doesn't appear in the class

      //Repeat the above and check that the "menu-hidden" class is returned to the body
      $('.menu-icon-link').click(); //Click the menu icon again
      bodyClass = $('body').attr("class"); //Get the new body tag after the second click
      isHidden = bodyClass.indexOf("menu-hidden"); //Check for the menu-hidden class
      expect(isHidden).not.toBeLessThan(0); //Less than 0 means "menu-hidden" doesn't appear in the class
    });
  });
  //---------------------------------------------------------------------------
  // The end of the test suite "The menu"
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  // The start of the test suite "Initial Entries"
  //---------------------------------------------------------------------------
  /* A new test suite named "Initial Entries" */
  describe('Initial Entries', function() {

    //This will load the feeds before performing any test
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    it('are loaded successfully', function(done) {
      var container = $('.feed'); //Get the feed container
      var childrenCount = container.children().length; //Get how many children are there in the container
      expect(childrenCount).not.toBeLessThan(1); //The number of children shouldn't be less than 1 (at least 1)
      done();
    });
  });
  //---------------------------------------------------------------------------
  // The end of the test suite "The menu"
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  // The start of the test suite "New Feed Selection"
  //---------------------------------------------------------------------------
  /* A new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {

    //Needed variables for comparing to
    var firstFeedContent;
    var secondFeedContent;

    //This will load the first feeds before performing any test and store its results
    beforeEach(function(done) {
      loadFeed(0, function() {
        // Get the numbre of children for the first feed and its content
        var firstFeedContainer = $('.feed'); //Get the feed container
        firstFeedContent = firstFeedContainer.children().text(); //Get all children elements
        done();
      });
    });

    //This will load the second feeds before performing any test and store its results
    beforeEach(function(done) {
      loadFeed(1, function() {
        var secondFeedContainer = $('.feed'); //Get the feed container
        secondFeedContent = secondFeedContainer.children().text(); //Get all children elements
        done();
      });
    });

    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('makes content change', function(done) {
      //Get the number of children in the menu list and its details
      var listContainer = $('.feed-list'); //Get the list
      var listCount = listContainer.children().length; //Get how many children are there in the menu list (how many sources)

      if (listCount <= 1) expect(false).toBe(true); //If only one feed we have, this spec will fail because it can't be tested
      else expect(firstFeedContent).not.toBe(secondFeedContent);

      done();
    });
  });
  //---------------------------------------------------------------------------
  // The end of the test suite "New Feed Selection"
  //---------------------------------------------------------------------------

}());