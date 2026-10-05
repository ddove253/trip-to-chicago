/* =====================================================================
   TRIP TO CHICAGO — CONTENT FILE
   ---------------------------------------------------------------------
   Almost every word students read lives in this file.
   You can edit text here without touching app.js.

   HOW IMAGES WORK
   Every visual has two parts:
     art: "skyline"   -> a built-in illustration (always works, no internet needed)
     img: ""          -> OPTIONAL photo URL. Leave blank to use the illustration.
   If you paste a photo URL and it fails to load, the illustration appears
   automatically, so students are never stuck.
   Use public-domain or Creative Commons photos (Wikimedia Commons, Library
   of Congress, Chicago Park District press images, etc.) and add the credit
   in "credit".

   RULES FOR EDITING
   - Keep the commas and quote marks exactly as they are.
   - Use “curly quotes” or ’ inside text instead of straight " marks.
   - Do NOT mention the anchor novel anywhere except TRIP.finale.
   ===================================================================== */

/* ---------------------------------------------------------------------
   PHOTOS
   PHOTO("local-name.jpg", "Wikimedia_Commons_File_Name.jpg")
   - By default, photos load straight from Wikimedia Commons.
   - TEACHER EDIT: to host photos yourself, download each original from its
     Commons page (Sources panel or photo-check.html lists them), save it in
     assets/images/ with the local name, then set USE_LOCAL_PHOTOS = true.
   - Use img: "" to show the built-in illustration instead.
   --------------------------------------------------------------------- */
var USE_LOCAL_PHOTOS = false;
window.PHOTO_FILES = [];
function PHOTO(local, file) {
  window.PHOTO_FILES.push({ local: local, file: file });
  if (USE_LOCAL_PHOTOS) return "assets/images/" + local;
  return "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file.replace(/ /g, "_")) + "?width=1200";
}
/* Attribution shown in the Sources panel. Keyed by Commons file name.
   TEACHER EDIT: add photographer names for files marked "see file page". */
/* Credits for photos stored in assets/images (not loaded from Wikimedia).
   TEACHER EDIT: update a credit if you learn more about a photo's source. */
window.LOCAL_CREDITS = {
  "assets/images/holc-chicago-1940.jpg": { title: "HOLC Residential Security Map of Chicago, 1940", credit: "U.S. National Archives, via Mapping Inequality. Public domain." },
  "assets/images/bronzeville-regal-theater.jpg": { title: "The Regal Theater, Bronzeville, 1941", credit: "Russell Lee, Farm Security Administration. Library of Congress. Public domain." },
  "assets/images/englewood-urban-farm.jpg": { title: "Englewood urban farm", credit: "Source and permission to be confirmed by teacher" },
  "assets/images/pilsen-bakery.jpg": { title: "Kristoffer’s Café & Bakery, Pilsen", credit: "Source and permission to be confirmed by teacher" }
};
window.PHOTO_CREDITS = {
  "Billiken2008Strutters.jpg": { title: "Bud Billiken Parade, 2008", credit: "Wikimedia Commons (via Flickr), CC BY 2.0" },
  "Kids_and_Coach_at_Play_-_Wicker_Park_Neighborhood_-_Chicago_-_Illinois_-_USA.jpg": { title: "Kids and coach at play, Wicker Park", credit: "Wikimedia Commons; see file page for photographer and license" },
  "New_crops-Chicago_urban_farm.jpg": { title: "New crops at a Chicago urban farm", credit: "Linda N. (Linda from Chicago), CC BY 2.0" },
  "Mr._Beef_Chicago_Illinois.jpg": { title: "Mr. Beef, Chicago", credit: "Wikimedia Commons; see file page for photographer and license" },
  "Kmart_-_Wicker_Park,_Chicago_-CLOSED-_(47140429022).jpg": { title: "A closed store, Wicker Park", credit: "Wikimedia Commons (via Flickr); see file page for photographer and license" },
  "Art_Institute_of_Chicago_Lion_(II)_(7182539539).jpg": { title: "Art Institute of Chicago lion", credit: "Wikimedia Commons (via Flickr), CC BY-SA 2.0" },
  "Martin_Roche-John_Tait_House_Chicago_IL.jpg": { title: "Martin Roche–John Tait House, Bronzeville", credit: "Wikimedia Commons; see file page for photographer and license" },
  "Museum_of_Science_and_Industry_(Chicago).jpg": { title: "Museum of Science and Industry", credit: "Wikimedia Commons (via Flickr), CC BY 2.0" },
  "St._Basil_Visitation_Church.jpg": { title: "St. Basil–Visitation Church", credit: "Wikimedia Commons; see file page for photographer and license" },
  "Englewood_Chicago_1.JPG": { title: "Englewood street view", credit: "Wikimedia Commons contributor, CC BY-SA 4.0" },
  "Street_Scene_-_Pilsen_Neighborhood_-_Chicago_-_Illinois_-_USA_-_01.jpg": { title: "Pilsen street scene", credit: "Wikimedia Commons; see file page for photographer and license" },
  "Mexican_Art_Museum.JPG": { title: "National Museum of Mexican Art, 2007", credit: "Wikimedia Commons contributor, public domain" },
  "Lincoln_Avenue_Rowhouse_District_3.JPG": { title: "Lincoln Avenue row houses (built 1875)", credit: "Wikimedia Commons; see file page for photographer and license" },
  "Columbus_Park_Chicago_boathouse_1.JPG": { title: "Columbus Park boathouse", credit: "Wikimedia Commons contributor, CC BY-SA 3.0" },
  "Midway_park,_chicago.jpg": { title: "Midway Park homes, Austin", credit: "Wikimedia Commons; see file page for photographer and license" },
  "Austin_Town_Hall.jpg": { title: "Austin Town Hall", credit: "Wikimedia Commons (via Flickr), CC BY-SA 2.0" },
  "Big_Jack_Johnson_-_Chicago_Blues_Festival_2009.jpg": { title: "Big Jack Johnson, Chicago Blues Festival, 2009", credit: "Wikimedia Commons; see file page for photographer and license" },
  "BLACK MEMBERS OF THE CHICAGO CITY COUNCIL DURING A BUDGET HEARING IN THE FALL OF 1973 - NARA - 556270.jpg": { title: "Black City Council members at a budget hearing, fall 1973", credit: "John H. White, EPA DOCUMERICA, U.S. National Archives (public domain)" },
  "Chicago_Skyline_at_Sunset.png": { title: "Chicago skyline at sunset", credit: "AllyUnion, CC BY-SA 2.0" },
  "2005-10-13_2880x1920_chicago_above_millennium_park.jpg": { title: "Millennium Park from above", credit: "Wikimedia Commons; see file page for photographer and license" },
  "Chicago_Riverwalk_at_Sheraton_Grand_Chicago_IMG_5510.jpg": { title: "Chicago Riverwalk", credit: "Wikimedia Commons contributor, CC BY-SA 4.0" },
  "Chicago_NorthAvenueBeach_2005_07_06_JKassel_IMG_6653.jpg": { title: "North Avenue Beach", credit: "J. Kassel; see file page for license" },
  "Centennial_Ferris_Wheel_at_Navy_Pier_(also_Municipal_Pier),_National_Register_of_Historic_Places,_Chicago,_IL.jpg": { title: "Centennial Wheel, Navy Pier", credit: "Vividmirage, CC BY-SA 4.0" },
  "Pizzeria_Uno_Chicago-style_deep-dish_pizza.jpg": { title: "Deep-dish pizza, Pizzeria Uno", credit: "Bobak, CC BY 3.0" },
  "Chicago_abandoned_apartments.jpg": { title: "Vacant apartment building", credit: "Wikimedia Commons; see file page for photographer and license" },
  "Chicago_Police_Chevy_Tahoe.jpg": { title: "Chicago Police vehicle", credit: "Wikimedia Commons (via Flickr), CC BY 2.0" },
  "ROBERT TAYLOR HOMES, A LOW INCOME HIGHRISE APARTMENT COMPLEX INHABITED BY BLACKS ON CHICAGO'S SOUTH SIDE. THERE ARE... - NARA - 556179.jpg": { title: "Robert Taylor Homes, 1973", credit: "John H. White, EPA DOCUMERICA, U.S. National Archives (public domain)" },
  "ROBERT R. TAYLOR HOMES, ONE IN THE COMPLEX OF 28 LOW INCOME HIGHRISE APARTMENT BUILDINGS INHABITED BY THE BLACK... - NARA - 556174.jpg": { title: "Robert Taylor Homes, 1973", credit: "John H. White, EPA DOCUMERICA, U.S. National Archives (public domain)" },
  "BLACK RESIDENTS ON ONE OF THE BALCONIES OF THE ROBERT TAYLOR HOMES, A LOW INCOME HIGHRISE APARTMENT BUILDING IN... - NARA - 556175.jpg": { title: "Residents on a balcony, Robert Taylor Homes, June 1973", credit: "John H. White, EPA DOCUMERICA, U.S. National Archives (public domain)" },
  "Robertaylorhome.jpg": { title: "Robert Taylor Homes before demolition, 2000s", credit: "Wikimedia Commons contributor, CC BY-SA 2.5" },
  "BUD BILLIKEN DAY PARADE AS IT TRAVELS CHICAGO'S SOUTH SIDE ON DR. MARTIN L. KING JR. DRIVE. ONE OF THE LARGEST EVENTS... - NARA - 556274.jpg": { title: "Bud Billiken Parade, 1973", credit: "John H. White, EPA DOCUMERICA, U.S. National Archives (public domain)" },
  "We-Are-A-Nation-Of-Immigrants-Mural-Pilsen-Chicago-September-2014.jpg": { title: "Declaration of Immigration mural (Yollocalli Arts Reach), Pilsen, 2014", credit: "Acediscovery, CC BY 4.0" },
  "Victory_Monument_Chicago.jpg": { title: "Victory Monument, Bronzeville", credit: "Joe Ravi, CC BY-SA 3.0" },
  "UChicago_gate.jpg": { title: "University of Chicago gate", credit: "Wikimedia Commons contributor, CC BY-SA 2.5" },
  "People_at_the_Point_(6851524112).jpg": { title: "People at Promontory Point", credit: "Wikimedia Commons (via Flickr); see file page for photographer and license" },
  "View_at_Lincoln_Park_Zoo_Nature_Boardwalk_(15384872352).jpg": { title: "Lincoln Park Zoo Nature Boardwalk", credit: "Wikimedia Commons (via Flickr), CC BY 2.0" },
  "Lincoln_Park_South_Pond.JPG": { title: "Lincoln Park South Pond", credit: "Wikimedia Commons contributor, CC BY-SA 3.0" },
  "2010-02-19_16500x2000_chicago_skyline_panorama.jpg": { title: "Chicago skyline panorama", credit: "Wikimedia Commons; attribution-only license, see file page" },
  "Willis_Tower_and_Chicago_skyscrapers_from_the_Adler_Planetarium_Skyline_Walk_(52033270570).jpg": { title: "Willis Tower from the Adler Planetarium", credit: "Wikimedia Commons (via Flickr); see file page for photographer and license" },
  "Wrigley_Field_Ivy_(2935611800).jpg": { title: "Wrigley Field ivy", credit: "Wikimedia Commons (via Flickr), CC BY 2.0" },
  "Chicago’s_iconic_“L”_train_(32872192867).jpg": { title: "The L train", credit: "Wikimedia Commons (via Flickr); see file page for photographer and license" },
  "Architecture_River_Cruise_(35510738382).jpg": { title: "Architecture river cruise", credit: "Wikimedia Commons (via Flickr); see file page for photographer and license" }
};

window.TRIP = {

  meta: {
    title: "Trip to Chicago",
    subtitle: "One city. Many stories.",
    flight: "312",
    duration: "About 55 minutes",
    essentialQuestion: "Who gets to tell the story, and what changes when someone else tells it?"
  },

  /* TEACHER EDIT: Vocabulary. Terms unlock as students reach them. */
  vocab: {
    setting:        { term: "Setting",        def: "The time and place where a story happens. A setting can shape what characters can do." },
    perspective:    { term: "Perspective",    def: "The point of view someone sees from, shaped by who they are, where they stand, and what they’ve experienced." },
    representation: { term: "Representation", def: "A version of something that stands in for the real thing, like a photo, an ad, a map, or a news story." },
    source:         { term: "Source",         def: "Where information comes from: a person, an organization, a document, a website." },
    media:          { term: "Media",          def: "Ways messages reach large audiences: news, ads, websites, social media, film, music." },
    audience:       { term: "Audience",       def: "The people a message is made for." },
    purpose:        { term: "Purpose",        def: "What the creator of a message wants it to do: inform, persuade, sell, entertain." },
    neighborhood:   { term: "Neighborhood",   def: "A smaller community inside a city, with its own history, people, and identity." },
    redlining:      { term: "Redlining",      def: "Rating neighborhoods as “risky” for loans, often based on race, which made it harder for families there to buy or fix up homes." },
    segregation:    { term: "Segregation",    def: "Separating people by race or another group identity, by law, by policy, or by everyday practice." },
    publicHousing:  { term: "Public housing", def: "Homes owned or funded by the government and rented at lower cost to families with lower incomes." },
    stereotype:     { term: "Stereotype",     def: "An oversimplified idea about a whole group of people or places, applied to everyone in it." },
    selection:      { term: "Selection",      def: "The choices a creator makes about what to include, and what to leave out." }
  },

  /* TEACHER EDIT: Story Check questions (shown at a few points in the trip). */
  storyChecks: [
    "Who created this?",
    "Who is the audience?",
    "What is the purpose?",
    "What gets emphasized?",
    "What’s missing?",
    "Whose voice do we hear?",
    "Whose voice don’t we hear?",
    "What might change if someone else told this story?"
  ],

  /* TEACHER EDIT: Impression words for the Passport (“Your impression of Chicago”). */
  meterWords: ["exciting","beautiful","diverse","creative","historic","unequal","segregated","wealthy","struggling","dangerous","welcoming","complicated","community-centered","changing","surprising"],

  preflightSources: ["Movies/TV","Music","News","Sports","Social media","Family/friends","School","Video games","I’ve barely heard anything about Chicago","Other"],

  /* =====================================================================
     RANDOMIZED ARRIVAL — each browser is assigned A, B, or C.
     Students are NOT told there are versions until the reveal.
     TEACHER EDIT: replace art with img URLs if you have licensed photos.
     ===================================================================== */
  /* TEACHER EDIT: keep false until ALL three arrival galleries have real photos.
     If one gallery has photos and another has illustrations, the photos
     themselves could sway students, which would spoil the experiment. */
  arrivalUsePhotos: true,

  arrival: {
    A: { label: "Tourist Chicago", short: "the skyline, the lake, and the attractions", items: [
      { art: "skyline", img: PHOTO("arrival-skyline.png", "Chicago_Skyline_at_Sunset.png"), alt: "Chicago’s skyline at sunset across the water", caption: "The skyline at sunset" },
      { art: "bean",    img: PHOTO("arrival-millennium-park.jpg", "2005-10-13_2880x1920_chicago_above_millennium_park.jpg"), alt: "Millennium Park seen from above, surrounded by downtown towers", caption: "Millennium Park" },
      { art: "river",   img: PHOTO("arrival-riverwalk.jpg", "Chicago_Riverwalk_at_Sheraton_Grand_Chicago_IMG_5510.jpg"), alt: "A walkway along a river lined with tall buildings", caption: "The Riverwalk" },
      { art: "lake",    img: PHOTO("arrival-lake.jpg", "Chicago_NorthAvenueBeach_2005_07_06_JKassel_IMG_6653.jpg"), alt: "A sandy beach on Lake Michigan with the city behind it", caption: "Lake Michigan" },
      { art: "pier",    img: PHOTO("arrival-navy-pier.jpg", "Centennial_Ferris_Wheel_at_Navy_Pier_(also_Municipal_Pier),_National_Register_of_Historic_Places,_Chicago,_IL.jpg"), alt: "A Ferris wheel on a pier stretching into the lake", caption: "Navy Pier" },
      { art: "food",    img: PHOTO("arrival-food.jpg", "Pizzeria_Uno_Chicago-style_deep-dish_pizza.jpg"), alt: "A Chicago deep-dish pizza", caption: "Deep dish and game day" }
    ]},
    B: { label: "Chicago through problems and crisis", short: "headlines, vacant buildings, police, and a redlining map", items: [
      { art: "headline", text: "Police investigate weekend shootings", img: "", alt: "A news headline about weekend shootings", caption: "A news headline" },
      { art: "vacant",   img: PHOTO("arrival-vacant.jpg", "Chicago_abandoned_apartments.jpg"), alt: "A vacant apartment building with empty windows", caption: "A vacant building" },
      { art: "police",   img: PHOTO("arrival-police.jpg", "Chicago_Police_Chevy_Tahoe.jpg"), alt: "A parked Chicago Police vehicle on a city street", caption: "Police on patrol" },
      { art: "highrise", img: PHOTO("arrival-public-housing.jpg", "ROBERT TAYLOR HOMES, A LOW INCOME HIGHRISE APARTMENT COMPLEX INHABITED BY BLACKS ON CHICAGO'S SOUTH SIDE. THERE ARE... - NARA - 556179.jpg"), alt: "High-rise buildings of the Robert Taylor Homes public housing development in 1973", caption: "Public housing, 1973" },
      { art: "redmap",   img: "", alt: "An old map with neighborhoods shaded red, yellow, blue, and green", caption: "A 1930s lending map" },
      { art: "storefront", img: PHOTO("arrival-storefronts.jpg", "Kmart_-_Wicker_Park,_Chicago_-CLOSED-_(47140429022).jpg"), alt: "A large closed store with a CLOSED sign on its front", caption: "A closed store" }
    ]},
    C: { label: "Chicago through community life", short: "murals, block parties, youth sports, and gardens", items: [
      { art: "mural",      img: PHOTO("arrival-mural.jpg", "We-Are-A-Nation-Of-Immigrants-Mural-Pilsen-Chicago-September-2014.jpg"), alt: "A large mural in Pilsen with butterflies and flags under the words We are a nation of immigrants", caption: "A neighborhood mural" },
      { art: "festival",   img: PHOTO("arrival-block-party.jpg", "Billiken2008Strutters.jpg"), alt: "Marchers in a summer parade on a South Side boulevard", caption: "A summer parade" },
      { art: "hoops",      img: PHOTO("arrival-youth-sports.jpg", "Kids_and_Coach_at_Play_-_Wicker_Park_Neighborhood_-_Chicago_-_Illinois_-_USA.jpg"), alt: "Kids playing sports with their coach in a city park", caption: "Kids and coach at play" },
      { art: "garden",     img: PHOTO("arrival-garden.jpg", "New_crops-Chicago_urban_farm.jpg"), alt: "Rows of green crops on a city farm with skyscrapers in the distance", caption: "An urban farm" },
      { art: "restaurant", img: PHOTO("arrival-restaurant.jpg", "Mr._Beef_Chicago_Illinois.jpg"), alt: "The storefront of a small Italian beef sandwich shop", caption: "The corner sandwich shop" },
      { art: "gathering",  img: PHOTO("arrival-gathering.jpg", "People_at_the_Point_(6851524112).jpg"), alt: "Neighbors relaxing together on the stone lakefront", caption: "A summer day together" }
    ]}
  },

  /* =====================================================================
     THE SIX REQUIRED DESTINATIONS (hub order)
     ===================================================================== */
  stops: [
    { id: "downtown",      route: "Downtown",      title: "Downtown",      tagline: "The Chicago sold to visitors" },
    { id: "neighborhoods", route: "Neighborhoods", title: "Neighborhoods", tagline: "One city, many communities" },
    { id: "map",           route: "History",       title: "The Map",       tagline: "Who got to live where?" },
    { id: "housing",       route: "Housing",       title: "Housing",       tagline: "“The projects”: whose story?" },
    { id: "headlines",     route: "Headlines",     title: "Headlines",     tagline: "The Chicago you hear about" },
    { id: "chicagoans",    route: "Voices",        title: "Chicagoans",    tagline: "The city tells its own stories" }
  ],

  /* ---------------------------------------------------------------------
     DOWNTOWN  (TEACHER EDIT: attraction cards)
     --------------------------------------------------------------------- */
  downtown: {
    required: 4,
    heroImg: PHOTO("downtown-banner.jpg", "2010-02-19_16500x2000_chicago_skyline_panorama.jpg"),
    cards: [
      { id: "dt-park", art: "bean", img: PHOTO("downtown-millennium-park.jpg", "2005-10-13_2880x1920_chicago_above_millennium_park.jpg"), alt: "Millennium Park from above, with downtown towers around it",
        name: "Millennium Park & Cloud Gate", location: "The Loop, downtown",
        text: "Millennium Park opened in 2004 on land that was once rail yards and parking. Its most famous resident is Cloud Gate, a 110-ton stainless steel sculpture by artist Anish Kapoor that everyone calls “The Bean.”",
        why: "Free entry, a giant mirror for selfies, summer concerts, and winter ice skating.",
        url: "https://www.choosechicago.com/" },
      { id: "dt-river", art: "river", img: PHOTO("downtown-riverwalk.jpg", "Chicago_Riverwalk_at_Sheraton_Grand_Chicago_IMG_5510.jpg"), alt: "The Chicago Riverwalk lined with cafes and skyscrapers",
        name: "The Chicago Riverwalk", location: "Main branch of the Chicago River, downtown",
        text: "A path runs along the river through the center of downtown, with cafes, kayak rentals, and boat tours. Fun fact: in 1900, engineers reversed the river’s flow so the city’s waste would stop draining into Lake Michigan.",
        why: "Architecture boat tours, food by the water, and the river dyed green every St. Patrick’s Day.",
        url: "https://www.chicago.gov/" },
      { id: "dt-lake", art: "lake", img: PHOTO("downtown-lakefront.jpg", "Chicago_NorthAvenueBeach_2005_07_06_JKassel_IMG_6653.jpg"), alt: "A Chicago beach on Lake Michigan with skyscrapers behind it",
        name: "The Lakefront", location: "East edge of the city, north to south",
        text: "Most of Chicago’s lakefront is public parkland, not private property, an idea city planners protected for more than a century. The Lakefront Trail runs about 18 miles for biking, running, and skating.",
        why: "Beaches inside a big city, skyline views, and summer festivals by the water.",
        url: "https://www.chicagoparkdistrict.com/" },
      { id: "dt-pier", art: "pier", img: PHOTO("downtown-navy-pier.jpg", "Centennial_Ferris_Wheel_at_Navy_Pier_(also_Municipal_Pier),_National_Register_of_Historic_Places,_Chicago,_IL.jpg"), alt: "Navy Pier with its Ferris wheel extending into Lake Michigan",
        name: "Navy Pier", location: "Streeterville, on Lake Michigan",
        text: "Opened in 1916, the pier stretches more than half a mile into Lake Michigan. It has served as a shipping dock, a Navy training center, and a college campus. Today it holds rides, restaurants, and a giant Ferris wheel.",
        why: "Rides, fireworks, boat cruises, and family attractions all in one place.",
        url: "https://navypier.org/" },
      { id: "dt-tower", art: "tower", img: PHOTO("downtown-willis-tower.jpg", "Willis_Tower_and_Chicago_skyscrapers_from_the_Adler_Planetarium_Skyline_Walk_(52033270570).jpg"), alt: "Willis Tower rising above the downtown skyline, seen from the lakefront",
        name: "Willis Tower Skydeck", location: "The Loop, downtown",
        text: "Finished in 1973 as the Sears Tower, it was the tallest building in the world for about 25 years. On the 103rd floor, glass boxes called The Ledge let visitors stand over a drop of more than 1,000 feet.",
        why: "Views of four states on a clear day, and a very brave photo.",
        url: "https://theskydeck.com/" },
      { id: "dt-museums", art: "museum", img: PHOTO("downtown-museums.jpg", "Art_Institute_of_Chicago_Lion_(II)_(7182539539).jpg"), alt: "One of the bronze lions outside the Art Institute of Chicago",
        name: "Museums", location: "Grant Park and the Museum Campus",
        text: "The Art Institute of Chicago holds one of the world’s major art collections. Nearby, the Field Museum is home to SUE, one of the most complete T. rex skeletons ever found, next to the Shedd Aquarium and Adler Planetarium.",
        why: "World-famous art, dinosaurs, sharks, and stars within walking distance.",
        url: "https://www.fieldmuseum.org/" },
      { id: "dt-sports", art: "stadium", img: PHOTO("downtown-wrigley.jpg", "Wrigley_Field_Ivy_(2935611800).jpg"), alt: "A historic baseball stadium with ivy on the outfield walls",
        name: "Game Day", location: "Wrigley Field (North Side) and stadiums across the city",
        text: "Chicago has teams in every major league: the Cubs and White Sox, Bulls, Bears, Blackhawks, Sky, and Fire. Wrigley Field opened in 1914 and still has ivy growing on its outfield walls.",
        why: "Historic ballparks, championship history, and fans who take it personally.",
        url: "https://www.choosechicago.com/" },
      { id: "dt-food", art: "food", img: PHOTO("downtown-food.jpg", "Pizzeria_Uno_Chicago-style_deep-dish_pizza.jpg"), alt: "A Chicago deep-dish pizza",
        name: "Deep Dish & the Chicago Dog", location: "Restaurants all over the city",
        text: "Deep-dish pizza became famous in Chicago in the 1940s. The Chicago-style hot dog comes on a poppy-seed bun with mustard, onion, relish, tomato, a pickle spear, peppers, and celery salt. Locals will tell you: no ketchup.",
        why: "Food you can’t get quite the same anywhere else.",
        url: "https://www.choosechicago.com/" }
    ],
    q1: { prompt: "Who is the likely audience for tourism advertising?",
          options: ["People deciding whether to visit","Chicago historians","Only Chicago residents","Scientists"],
          best: 0,
          feedback: "Tourism ads are built for people who are deciding where to go, and what to spend their time and money on.",
          retry: "Look again. Who would be scrolling a site like this, and why?" },
    q2: { prompt: "What does a tourism organization want its audience to do? Choose all that fit.",
          options: ["Visit Chicago","Spend money at attractions, hotels, and restaurants","Feel excited about Chicago","Stay longer","Study the city’s problems","Move away from Chicago"],
          fit: [0,1,2,3],
          feedback: "A tourism site’s purpose is to attract visitors. Every photo and sentence is chosen with that purpose in mind." },
    q3: "Does a tourism website have to lie in order to give you an incomplete picture of Chicago? Explain."
  },

  /* ---------------------------------------------------------------------
     NEIGHBORHOODS  (TEACHER EDIT: change neighborhood options here)
     x/y = position on the simplified map (0–100). Not to scale.
     --------------------------------------------------------------------- */
  neighborhoods: {
    required: 3,
    intro: "Chicago has 77 official community areas, and people use hundreds of neighborhood names inside them. About 2.7 million people live in the city (2020 Census), with roughly equal shares of white, Black, and Latino residents and a growing Asian American community. Downtown is a few square miles. The rest is where most Chicagoans live.",
    list: [
      { id: "bronzeville", name: "Bronzeville", side: "South Side", x: 63, y: 58,
        find: "South Side, about 3 miles south of downtown, near the lake.",
        see: [ { art: "greystone", alt: "A large historic stone house in Bronzeville", caption: "A historic Bronzeville home", img: PHOTO("bronzeville-greystones.jpg", "Martin_Roche-John_Tait_House_Chicago_IL.jpg") },
               { art: "monument",  alt: "The Victory Monument, a granite column topped by a bronze soldier", caption: "Victory Monument", img: PHOTO("bronzeville-victory-monument.jpg", "Victory_Monument_Chicago.jpg") },
               { art: "music",     alt: "The Regal Theater’s lit-up marquee at night, with people on the sidewalk", caption: "The Regal Theater, 1941", img: "assets/images/bronzeville-regal-theater.jpg" } ],
        notice: "Bronzeville isn’t one official community area. The name covers parts of the Douglas and Grand Boulevard areas. Today you’ll find historic homes and churches, new restaurants, and the Bronzeville Walk of Fame along King Drive, with longtime families living alongside newcomers.",
        story: "During the Great Migration (about 1916–1970), hundreds of thousands of Black Southerners moved to Chicago. Housing discrimination squeezed many of them into a narrow strip of the South Side. Residents built what writers called a “Black Metropolis” here: the Chicago Defender newspaper, churches, banks, jazz and blues clubs, and businesses of every kind.",
        reduce: "Bronzeville’s story isn’t only what segregation did to people. It’s also what people built anyway." },
      { id: "hydepark", name: "Hyde Park", side: "South Side", x: 75, y: 68,
        find: "South Side, on the lake, about 7 miles south of downtown.",
        see: [ { art: "university", alt: "An iron gate at the University of Chicago campus", caption: "University of Chicago", img: PHOTO("hyde-park-university.jpg", "UChicago_gate.jpg") },
               { art: "museum",     alt: "The Museum of Science and Industry, a grand columned building beside a lagoon", caption: "Museum of Science and Industry", img: PHOTO("hyde-park-museum.jpg", "Museum_of_Science_and_Industry_(Chicago).jpg") },
               { art: "lake",       alt: "People relaxing on the stone edge of Promontory Point by the lake", caption: "Promontory Point", img: PHOTO("hyde-park-promontory.jpg", "People_at_the_Point_(6851524112).jpg") } ],
        notice: "Hyde Park is home to the University of Chicago and the Museum of Science and Industry. Students and professors live next to families who have been there for generations. It’s often described as one of Chicago’s more racially mixed neighborhoods. Barack Obama lived in the Hyde Park–Kenwood area before becoming president.",
        story: "The science museum sits in a building left from the 1893 World’s Fair. In the 1950s and ’60s, the university and city carried out “urban renewal,” tearing down many older buildings to reshape the area. Supporters called it improvement. Thousands of lower-income residents, many of them Black, had to move.",
        reduce: "A famous university doesn’t tell you everything about the people who live around it." },
      { id: "englewood", name: "Englewood", side: "South Side", x: 46, y: 80,
        find: "South Side, about 7 miles south of downtown, west of Hyde Park.",
        see: [ { art: "church",  alt: "St. Basil–Visitation Church, a large church in Englewood", caption: "A neighborhood church", img: PHOTO("englewood-church.jpg", "St._Basil_Visitation_Church.jpg") },
               { art: "garden",  alt: "Farmers tending rows of greens beside a hoop house on a neighborhood farm", caption: "An Englewood urban farm", img: "assets/images/englewood-urban-farm.jpg" },
               { art: "greystone", alt: "A residential street in Englewood", caption: "An Englewood street", img: PHOTO("englewood-residential.jpg", "Englewood_Chicago_1.JPG") } ],
        notice: "Englewood is a mostly Black community with tree-lined blocks, churches, schools, and parks. It also has many vacant lots, left by decades of population loss and disinvestment. Residents and local groups have turned some of that land into urban farms and gardens that grow and sell fresh food.",
        story: "In the mid-1900s, the area around 63rd and Halsted was one of the busiest shopping districts in Chicago outside downtown. After World War II, banks, businesses, and many families left, shaped by redlining, “white flight,” and the loss of factory jobs. Stores closed and the population fell sharply. Many of those decisions were made far outside the neighborhood.",
        reduce: "Like every neighborhood, Englewood cannot be understood from crime statistics alone." },
      { id: "pilsen", name: "Pilsen", side: "Lower West Side", x: 52, y: 47,
        find: "Lower West Side, about 3 miles southwest of downtown.",
        see: [ { art: "mural",      alt: "A large mural in Pilsen about immigration", caption: "Pilsen murals", img: PHOTO("pilsen-mural.jpg", "We-Are-A-Nation-Of-Immigrants-Mural-Pilsen-Chicago-September-2014.jpg") },
               { art: "restaurant", alt: "The storefront of Kristoffer’s Café and Bakery, with a Pastelería sign", caption: "Kristoffer’s Café & Bakery", img: "assets/images/pilsen-bakery.jpg" },
               { art: "museum",     alt: "The entrance of the National Museum of Mexican Art", caption: "National Museum of Mexican Art (2007)", img: PHOTO("pilsen-mexican-art-museum.jpg", "Mexican_Art_Museum.JPG") } ],
        notice: "Pilsen is known for its murals, Mexican bakeries and restaurants, and the National Museum of Mexican Art, which is free to visit. For decades it has been a center of Mexican American life in Chicago. Today, rising rents have sparked debate about who gets to stay as the neighborhood changes.",
        story: "Pilsen is named after Plzeň, a city in today’s Czech Republic. Czech and other European immigrants who worked in nearby factories and rail yards settled here in the 1800s. Starting in the 1950s and ’60s, Mexican and Mexican American families became the largest community, and artists began covering walls with murals about history, identity, and struggle.",
        reduce: "A neighborhood can be a place visitors photograph and a place people call home. Those two things can pull in different directions." },
      { id: "lincolnpark", name: "Lincoln Park", side: "North Side", x: 60, y: 22,
        find: "North Side, about 3 miles north of downtown, along the lake.",
        see: [ { art: "zoo",       alt: "A boardwalk through marsh plants at Lincoln Park Zoo with skyscrapers behind", caption: "Lincoln Park Zoo", img: PHOTO("lincoln-park-zoo.jpg", "View_at_Lincoln_Park_Zoo_Nature_Boardwalk_(15384872352).jpg") },
               { art: "greystone", alt: "A row of historic brick row houses on Lincoln Avenue", caption: "Row houses built in 1875", img: PHOTO("lincoln-park-homes.jpg", "Lincoln_Avenue_Rowhouse_District_3.JPG") },
               { art: "park",      alt: "A pond in Lincoln Park with the skyline behind it", caption: "The park itself", img: PHOTO("lincoln-park-park.jpg", "Lincoln_Park_South_Pond.JPG") } ],
        notice: "Lincoln Park is named after its huge lakefront park, which holds the free Lincoln Park Zoo, open since 1868. Today it’s one of the wealthiest areas of Chicago, with expensive homes, boutiques, and DePaul University.",
        story: "Lincoln Park wasn’t always wealthy. In the mid-1900s, many working-class families lived here, including a large Puerto Rican community. Urban renewal and rising prices in the 1960s pushed many of those families out. A group called the Young Lords organized residents to protest being forced from their homes.",
        reduce: "Wealthy neighborhoods have complicated histories too." },
      { id: "austin", name: "Austin", side: "West Side", x: 18, y: 36,
        find: "West Side, at the city’s western edge, about 8 miles from downtown.",
        see: [ { art: "park",      alt: "The historic boathouse in Columbus Park", caption: "Columbus Park", img: PHOTO("austin-columbus-park.jpg", "Columbus_Park_Chicago_boathouse_1.JPG") },
               { art: "greystone", alt: "Large historic homes in Austin’s Midway Park district", caption: "Historic homes", img: PHOTO("austin-homes.jpg", "Midway_park,_chicago.jpg") },
               { art: "gathering", alt: "Austin Town Hall, a brick community field house in a park", caption: "Austin Town Hall Park", img: PHOTO("austin-community.jpg", "Austin_Town_Hall.jpg") } ],
        notice: "Austin is one of Chicago’s most populated community areas. It has blocks of historic homes, large churches, and Columbus Park, designed by landscape architect Jens Jensen. Many residents belong to active block clubs that organize clean-ups, block parties, and youth events.",
        story: "Austin was once a separate town and joined Chicago in 1899. In the 1960s and ’70s, as Black families moved in, some real estate agents used scare tactics called “blockbusting” to push white owners to sell fast and cheap. Many white families left, and later many businesses and much investment left too.",
        reduce: "Headlines about the West Side rarely show the block club meeting on a Saturday morning." }
    ],
    questions: [
      "What changed as you moved through Chicago?",
      "What would someone misunderstand if they only visited downtown?",
      "Can two people live in the same city but experience very different versions of it? Explain."
    ]
  },

  /* ---------------------------------------------------------------------
     THE MAP (redlining)
     TEACHER EDIT: To show the authentic 1940 HOLC map of Chicago, paste a
     public-domain image URL into realMapImg (National Archives / Mapping
     Inequality). Leave blank to use the built-in illustration.
     --------------------------------------------------------------------- */
  map: {
    realMapImg: "assets/images/holc-chicago-1940.jpg",
    realMapCredit: "Home Owners’ Loan Corporation, Residential Security Map of Chicago, 1940 (map section 1). U.S. National Archives, via Mapping Inequality (University of Richmond). Public domain.",
    prompts: [
      "What colors do you notice?",
      "What patterns do you notice? Where are the colors? What are they near?",
      "Why do you think someone created this map?"
    ],
    prediction: "Make a prediction: what do you think this map was used for?",
    reveal: [
      "In the 1930s, a federal agency called the Home Owners’ Loan Corporation (HOLC) made maps of more than 200 American cities, including Chicago. Each neighborhood got a grade for how “risky” it was to lend money there.",
      "Green meant “best.” Blue meant “still desirable.” Yellow meant “declining.” Red meant “hazardous.” Race and ethnicity were part of the ratings. Neighborhoods where Black families lived were almost always graded red.",
      "Banks and government lending programs often avoided red areas. That made it harder for families there to get home loans, buy homes, or fix them up. This practice is now called redlining. It helped lock segregation in place."
    ],
    caution: "One map didn’t cause every problem by itself. Redlining worked alongside other practices, like restrictive covenants that banned Black families from buying in some areas, and unfair “contract” home sales. The Fair Housing Act of 1968 made housing discrimination illegal, but its effects didn’t disappear overnight.",
    chain: [
      { label: "Policy & lending decisions", text: "Maps and lending rules labeled some neighborhoods “hazardous,” often because of who lived there." },
      { label: "Access to home loans",       text: "Families in red areas had a much harder time getting fair mortgages, or any loan at all." },
      { label: "Homeownership",              text: "Without loans, fewer families could buy homes. Some were pushed into unfair deals that let sellers take the house back after one missed payment." },
      { label: "Family wealth",              text: "For many American families, a home is their biggest source of wealth. It can be borrowed against or passed down. Being shut out meant less wealth to pass on." },
      { label: "Neighborhood investment",    text: "When banks and businesses avoid an area, buildings age without repairs and new stores and jobs go elsewhere." },
      { label: "Effects across generations", text: "Researchers have found that many neighborhoods graded red in the 1930s still have lower home values and less investment today." }
    ],
    question: "How could decisions made decades ago continue to influence a neighborhood today?"
  },

  /* ---------------------------------------------------------------------
     HOUSING
     --------------------------------------------------------------------- */
  housing: {
    privatePrompt: "When you hear the phrase “the projects,” what comes to mind?",
    lenses: [
      { id: "why", tab: "Why it was built", art: "highrise", img: PHOTO("housing-new.jpg", "ROBERT R. TAYLOR HOMES, ONE IN THE COMPLEX OF 28 LOW INCOME HIGHRISE APARTMENT BUILDINGS INHABITED BY THE BLACK... - NARA - 556174.jpg"), alt: "A high-rise building of the Robert Taylor Homes in 1973", caption: "Robert Taylor Homes, 1973 · John H. White / National Archives", chunks: [
        "In the 1930s, many poor Chicago families lived in crowded, unsafe buildings. The federal government began paying for public housing: apartments owned by the government and rented at lower prices. The Chicago Housing Authority (CHA) was created in 1937 to build and run them.",
        "After World War II, Chicago had a serious housing shortage. Black families arriving during the Great Migration were hit hardest, because segregation blocked them from most neighborhoods. For many families, a new apartment with heat, hot water, and indoor plumbing was a real step up."
      ]},
      { id: "wrong", tab: "What went wrong", art: "vacant", img: PHOTO("housing-decline.jpg", "Robertaylorhome.jpg"), alt: "An aging Robert Taylor Homes high-rise in its final years", caption: "Robert Taylor Homes before demolition, 2000s", chunks: [
        "Where it was built. The City Council had a say in where public housing went, and most new developments were placed in already-segregated Black neighborhoods. In 1969, a federal court ruled in the Gautreaux case that CHA had discriminated in where it built housing and how it assigned residents.",
        "How it was built and maintained. In the 1950s and ’60s, CHA built huge high-rises. The Robert Taylor Homes, finished in 1962, had 28 sixteen-story buildings, the largest public housing development in the country at the time. Repair money didn’t keep up. Elevators broke, lights went out, buildings decayed.",
        "Concentrated poverty. Income rules forced families who earned more to move out, which concentrated the poorest families together, often far from jobs. Gangs and violence became serious problems in some developments. Those problems grew from these conditions, not from who the residents were.",
        "Demolition. Starting in the 1990s, and especially after CHA’s “Plan for Transformation” in 2000, most high-rises were torn down. Cabrini-Green’s last tower came down in 2011. Residents were promised new mixed-income homes; far fewer returned than had lived there."
      ]},
      { id: "home", tab: "What “home” looked like", art: "gathering", img: PHOTO("housing-community-life.jpg", "BLACK RESIDENTS ON ONE OF THE BALCONIES OF THE ROBERT TAYLOR HOMES, A LOW INCOME HIGHRISE APARTMENT BUILDING IN... - NARA - 556175.jpg"), alt: "Residents gathered on a balcony of the Robert Taylor Homes", caption: "Residents on a balcony, June 1973 · John H. White / National Archives", chunks: [
        "Inside the headlines were people. In oral histories and documentaries, former residents of places like Cabrini-Green and the Robert Taylor Homes have described neighbors who watched each other’s kids, playgrounds full of children, cookouts, church, and friendships that lasted a lifetime.",
        "Residents organized, too. Tenants formed councils to demand repairs, safety, and a voice in decisions about their own homes, including going to court when the redevelopment plans didn’t include them.",
        "When the towers came down, some former residents felt relief. Others felt they had lost a community. Both reactions can be true at the same time."
      ]}
    ],
    note: "Cabrini-Green and the Robert Taylor Homes became famous, but they don’t represent all Chicago public housing, or all low-income communities. CHA also ran low-rise rowhouses, senior buildings, and developments most people never heard about.",
    circles: ["Government & policy", "News & historical reporting", "Residents"],
    q1: "All three can contain true information. Why don’t they tell exactly the same story?",
    q2: "Which perspective would you need to understand this place completely? Choose all you’d need, then explain."
  },

  /* ---------------------------------------------------------------------
     HEADLINES — simulated feed.
     These are NOT real articles. They are written to represent common
     TYPES of Chicago coverage. Keep that label visible.
     --------------------------------------------------------------------- */
  headlines: {
    banner: "These are not real articles. Each one represents a common kind of story.",
    round1: [
      { id: "h1", tag: "Crime",   time: "6:12 AM", text: "Weekend shootings across the city leave several people wounded", art: "headline-dark" },
      { id: "h2", tag: "Policing", time: "8:40 AM", text: "Police department adds patrols after rise in neighborhood violence", art: "police" },
      { id: "h3", tag: "Crime",   time: "10:05 AM", text: "Residents call for action after string of carjackings", art: "headline-dark" },
      { id: "h4", tag: "Safety",  time: "12:30 PM", text: "Community meeting focuses on gang conflict and youth safety", art: "headline-dark" },
      { id: "h5", tag: "City Hall", time: "2:15 PM", text: "Leaders debate next steps as city releases latest crime numbers", art: "headline-dark" },
      { id: "h6", tag: "Neighborhoods", time: "5:50 PM", text: "Vacant buildings draw complaints about neighborhood safety", art: "vacant" }
    ],
    round2: [
      { id: "g1", tag: "Schools",   text: "High school robotics team heads to national competition", art: "university" },
      { id: "g2", tag: "Culture",   text: "Neighborhood festival draws thousands for music, food, and dance", art: "festival" },
      { id: "g3", tag: "Business",  text: "Family-owned bakery celebrates 50 years on the same corner", art: "restaurant" },
      { id: "g4", tag: "Arts",      text: "Teens paint a new mural on a viaduct with local artists", art: "mural" },
      { id: "g5", tag: "Community", text: "Block club turns an empty lot into a community garden", art: "garden" },
      { id: "g6", tag: "Sports",    text: "City basketball championship packs the gym", art: "hoops" },
      { id: "g7", tag: "Libraries", text: "Library branch launches free summer coding camp", art: "books" },
      { id: "g8", tag: "Activism",  text: "Residents organize a peace walk and cookout", art: "gathering" },
      { id: "g9", tag: "Neighborhoods", text: "New grocery store opens in a neighborhood that went years without one", art: "storefront-open" },
      { id: "g10", tag: "Everyday", text: "Lakefront fills up on the first warm Saturday of spring", art: "lake" }
    ],
    q1: "Did the first group of stories have to be false for your impression to become incomplete?",
    selection: ["what becomes a story", "what becomes a headline", "which photograph appears", "whom to interview", "where to place the story", "what receives little or no attention"],
    q2: "How can a collection of individually true stories still create a misleading impression?"
  },

  /* ---------------------------------------------------------------------
     CHICAGOANS  (TEACHER EDIT: categories)
     --------------------------------------------------------------------- */
  chicagoans: {
    required: 3,
    categories: [
      { id: "art", name: "Art", art: "mural", img: PHOTO("chicagoans-art.jpg", "We-Are-A-Nation-Of-Immigrants-Mural-Pilsen-Chicago-September-2014.jpg"), caption: "Declaration of Immigration mural, Pilsen (photo 2014)", line: "Murals and public art",
        chunks: [
          "In 1967, Black artists from a group called OBAC painted the Wall of Respect on a building at 43rd and Langley in Bronzeville. It honored Black heroes in music, sports, literature, and politics, chosen by artists from the community itself.",
          "The wall was lost after a fire in 1971, but it helped spark a community mural movement across the country. Today, murals in Pilsen, Bronzeville, Humboldt Park, and beyond tell neighborhood histories in residents’ own images."
        ], source: { title: "Chicago Public Art Group", url: "https://www.cpag.net/" } },
      { id: "music", name: "Music", art: "music", img: PHOTO("chicagoans-music.jpg", "Big_Jack_Johnson_-_Chicago_Blues_Festival_2009.jpg"), caption: "Big Jack Johnson at the Chicago Blues Festival, 2009", line: "Chicago’s sound",
        chunks: [
          "Thomas A. Dorsey, often called the father of gospel music, built the sound in Chicago churches in the 1930s, and Mahalia Jackson carried it around the world.",
          "Migrants from the South brought Delta blues north and plugged it in, creating electric Chicago blues. In the early 1980s, DJs at clubs like the Warehouse created house music, and it spread worldwide. Many Chicago musicians got their start in church choirs, school bands, and park programs."
        ], source: { title: "Encyclopedia of Chicago", url: "http://www.encyclopedia.chicagohistory.org/" } },
      { id: "food", name: "Food", art: "restaurant", img: PHOTO("chicagoans-food.jpg", "Mr._Beef_Chicago_Illinois.jpg"), caption: "Mr. Beef, an Italian beef stand", line: "Neighborhood tables",
        chunks: [
          "Chicago food is neighborhood food: Harold’s Chicken Shack, started on the South Side in 1950; Italian beef sandwiches; tamales sold from coolers; Mexican panaderías in Pilsen and Little Village; Polish delis; Korean barbecue; Puerto Rican jibaritos invented in Chicago.",
          "Ask ten Chicagoans for the best spot and you’ll get ten answers, usually a place close to home."
        ], source: { title: "Chicago Public Library", url: "https://www.chipublib.org/" } },
      { id: "community", name: "Community", art: "garden", img: PHOTO("chicagoans-community.jpg", "New_crops-Chicago_urban_farm.jpg"), caption: "An urban farm with the skyline behind it", line: "Block clubs and gardens",
        chunks: [
          "Many Chicago blocks have a block club: neighbors who meet, plan clean-ups, host block parties, put up signs, and look out for each other’s kids. Some have existed for decades.",
          "Across the city, residents have turned vacant lots into gardens and farms. A land trust called NeighborSpace protects many of these gardens so neighbors can keep growing in them."
        ], source: { title: "NeighborSpace", url: "https://neighbor-space.org/" } },
      { id: "youth", name: "Youth", art: "hoops", img: PHOTO("chicagoans-youth.jpg", "Kids_and_Coach_at_Play_-_Wicker_Park_Neighborhood_-_Chicago_-_Illinois_-_USA.jpg"), caption: "Kids and coach at play, Wicker Park", line: "Young people’s Chicago",
        chunks: [
          "Since 2001, the youth poetry festival Louder Than A Bomb, founded by Young Chicago Authors, has brought teens from all over the city to perform their own writing about their lives and neighborhoods.",
          "Derrick Rose grew up in Englewood, starred at Simeon Career Academy, and in 2011 became the youngest MVP in NBA history while playing for his hometown Bulls."
        ], source: { title: "Young Chicago Authors", url: "https://youngchicagoauthors.org/" } },
      { id: "celebration", name: "Celebration", art: "festival", img: PHOTO("chicagoans-celebration.jpg", "BUD BILLIKEN DAY PARADE AS IT TRAVELS CHICAGO'S SOUTH SIDE ON DR. MARTIN L. KING JR. DRIVE. ONE OF THE LARGEST EVENTS... - NARA - 556274.jpg"), caption: "Bud Billiken Parade, 1973 · John H. White / National Archives", line: "Festivals and traditions",
        chunks: [
          "The Bud Billiken Parade began in 1929 and is often called the largest African American parade in the country. Every August it celebrates kids going back to school along King Drive.",
          "Two giant steel Puerto Rican flags arch over Division Street in Humboldt Park, home of an annual Puerto Rican festival. Mexican Independence Day brings parades and celebrations to 26th Street in Little Village."
        ], source: { title: "Encyclopedia of Chicago", url: "http://www.encyclopedia.chicagohistory.org/" } },
      { id: "activism", name: "Activism", art: "flags", img: PHOTO("chicagoans-activism.jpg", "BLACK MEMBERS OF THE CHICAGO CITY COUNCIL DURING A BUDGET HEARING IN THE FALL OF 1973 - NARA - 556270.jpg"), caption: "Black City Council members at a budget hearing, fall 1973 · John H. White / National Archives", line: "Residents changing their city",
        chunks: [
          "Journalist Ida B. Wells lived in Chicago and organized for civil rights and against lynching. In 1966, residents joined Dr. Martin Luther King Jr. in the Chicago Freedom Movement, marching against housing discrimination.",
          "In 1968, Black homeowners in Lawndale formed the Contract Buyers League to fight unfair home sales. Today, residents and young organizers keep pushing on housing, schools, safety, and more."
        ], source: { title: "Chicago History Museum", url: "https://www.chicagohistory.org/" } }
    ],
    q1: "What do people who live in Chicago show us that outsiders might overlook?",
    q2: "Does living in Chicago mean one person can speak for every Chicagoan? Why or why not?"
  },

  /* ---------------------------------------------------------------------
     SIDE QUESTS (optional, never required)
     --------------------------------------------------------------------- */
  sideQuests: [
    { id: "pizza", name: "The Pizza Debate", art: "food", img: PHOTO("sidequest-pizza.jpg", "Pizzeria_Uno_Chicago-style_deep-dish_pizza.jpg"), caption: "Deep dish at Pizzeria Uno", poll: ["Deep dish","Tavern-style","I need to try both"],
      chunks: [
        "Visitors line up for deep dish: a tall crust filled with cheese and topped with sauce.",
        "Many locals say the real Chicago pizza is tavern-style: thin, crispy, and cut into squares instead of slices. It was a classic in neighborhood bars and family restaurants for decades.",
        "Which one is “Chicago pizza” depends on who you ask. Sound familiar?"
      ] },
    { id: "L", name: "Ride the L", art: "train", img: PHOTO("sidequest-l-train.jpg", "Chicago’s_iconic_“L”_train_(32872192867).jpg"), caption: "The L",
      chunks: [
        "The “L” (short for elevated) is Chicago’s train system, run by the Chicago Transit Authority (CTA). Eight lines are named by color: Red, Blue, Brown, Green, Orange, Purple, Pink, and Yellow.",
        "Downtown, several lines run on a rectangle of elevated track, which is why downtown is called “the Loop.”",
        "The Red and Blue lines run 24 hours a day. Where a train line goes, and doesn’t go, shapes who can easily reach jobs, schools, and downtown."
      ], url: "https://www.transitchicago.com/" },
    { id: "sound", name: "Chicago Sound", art: "music", img: PHOTO("sidequest-chicago-sound.jpg", "Big_Jack_Johnson_-_Chicago_Blues_Festival_2009.jpg"), caption: "Chicago Blues Festival, 2009",
      chunks: [
        "Gospel grew up in Chicago churches. Electric blues grew up in South and West Side clubs. House music was born in Chicago clubs in the 1980s.",
        "Chicago also gave the world artists from soul to hip-hop. In the early 2010s, a style called drill came out of Chicago’s South Side. Its lyrics often describe violence, and people strongly debate whether it reflects reality, makes it worse, or both. One more example of a story with many tellers."
      ] },
    { id: "sports", name: "Sports City", art: "stadium", img: PHOTO("sidequest-sports.jpg", "Wrigley_Field_Ivy_(2935611800).jpg"), caption: "Wrigley Field",
      chunks: [
        "The Bulls won six NBA championships in the 1990s. The Cubs won the 2016 World Series, their first in 108 years. The White Sox won in 2005, and the Sky won the WNBA title in 2021.",
        "North Side vs. South Side: Cubs fans and White Sox fans rarely agree on anything."
      ] },
    { id: "arch", name: "Architecture", art: "tower", img: PHOTO("sidequest-architecture.jpg", "Architecture_River_Cruise_(35510738382).jpg"), caption: "An architecture river cruise",
      chunks: [
        "The Great Chicago Fire of 1871 burned about a third of the city. Rebuilding turned Chicago into a laboratory for new buildings.",
        "The Home Insurance Building (1885) is often called the first skyscraper because it used a steel frame. Today the Chicago Architecture Center runs river tours that point out more than a century of designs."
      ], url: "https://www.architecture.org/" },
    { id: "lake", name: "Wait… That’s a Lake?", art: "lake", img: PHOTO("sidequest-lake-michigan.jpg", "Chicago_NorthAvenueBeach_2005_07_06_JKassel_IMG_6653.jpg"), caption: "North Avenue Beach",
      chunks: [
        "Lake Michigan is one of the five Great Lakes and the only one entirely inside the United States. It covers about 22,000 square miles, so big you can’t see across it.",
        "It’s fresh water, not salt water, and it supplies Chicago’s drinking water. It has waves, beaches, lighthouses, and very cold winters."
      ], url: "https://www.glerl.noaa.gov/" }
  ],

  /* ---------------------------------------------------------------------
     FINAL CREATOR — approved tiles (suitcase items are added automatically)
     --------------------------------------------------------------------- */
  creatorBank: [
    { id: "b-skyline", kind: "Image", title: "The skyline", text: "Chicago’s skyline from the lake.", art: "skyline" },
    { id: "b-77",      kind: "Fact",  title: "77 community areas", text: "Chicago has 77 official community areas and hundreds of neighborhoods.", art: "transitmap" },
    { id: "b-migration", kind: "Fact", title: "The Great Migration", text: "Hundreds of thousands of Black Southerners moved to Chicago between about 1916 and 1970.", art: "train" },
    { id: "b-redline", kind: "Map",   title: "The 1930s lending map", text: "Neighborhoods were graded for lending “risk,” and race was part of the grade.", art: "redmap" },
    { id: "b-mural",   kind: "Image", title: "A neighborhood mural", text: "Residents painting their own history on their own walls.", art: "mural" },
    { id: "b-blockparty", kind: "Image", title: "A block party", text: "Neighbors closing the street for music, food, and kids.", art: "festival" },
    { id: "b-truecomplete", kind: "Idea", title: "True ≠ complete", text: "A collection of true stories can still leave things out.", art: "truecomplete" },
    { id: "b-lens", kind: "Idea", title: "Three lenses", text: "Policy, news, and residents can all tell the truth and still tell different stories.", art: "lens" },
    { id: "b-L",       kind: "Image", title: "The L", text: "Trains that connect, and don’t connect, different parts of the city.", art: "train" },
    { id: "b-garden",  kind: "Image", title: "A community garden", text: "A vacant lot turned into a place to grow food.", art: "garden" },
    { id: "b-lake",    kind: "Image", title: "The lakefront", text: "Miles of public beaches and parks.", art: "lake" },
    { id: "b-hoops",   kind: "Image", title: "Park district hoops", text: "Young people on courts across the city.", art: "hoops" }
  ],
  titleExamples: ["Chicago: More Than a Skyline", "Chicago: A City of Contrasts", "Chicago: Many Neighborhoods, Many Stories"],

  /* TEACHER EDIT: Change final reflection prompts here. */
  reflection: {
    leavesOut: "Something important my guide leaves out is…",
    differentGuide: "Someone who might create a very different Chicago guide is… because…",
    wantImpression: "What impression do you WANT your audience to have after viewing your guide?",
    eqStarters: [
      "The person telling a story has power because…",
      "Two people can describe the same place differently because…",
      "A source can be truthful but incomplete when…",
      "Today my thinking changed when…"
    ]
  },

  realChoices: ["Tourist Chicago","Neighborhood Chicago","Segregated Chicago","Struggling Chicago","Community Chicago","Wealthy Chicago","Violent Chicago","Creative Chicago","All of them","Something else"],

  /* =====================================================================
     FINALE — the ONLY place the anchor novel appears.
     TEACHER EDIT: coverImg is optional (use an image you have rights to,
     e.g. the publisher’s press image). Leave blank for a title card.
     ===================================================================== */
  finale: {
    bookTitle: "Ghost Boys",
    author: "Jewell Parker Rhodes",
    coverImg: "",
    lines: [
      "We’re going back to Chicago.",
      "But next time, you won’t be traveling as a tourist.",
      "Someone else will tell you the story."
    ],
    questions: [
      "Whose Chicago are we seeing?",
      "What does the storyteller show us?",
      "What don’t we see?",
      "Who gets to tell the story, and what changes when someone else tells it?"
    ]
  },

  /* =====================================================================
     SOURCES — organized by destination.
     TEACHER EDIT: Add/replace sources here. Check links each year.
     ===================================================================== */
  sources: [
    { group: "Downtown & Tourism", items: [
      { title: "Choose Chicago", org: "Chicago’s official tourism organization", url: "https://www.choosechicago.com/", supports: "The tourism perspective; attractions, food, sports" },
      { title: "City of Chicago", org: "City of Chicago", url: "https://www.chicago.gov/", supports: "Millennium Park, Riverwalk" },
      { title: "Chicago Park District", org: "Chicago Park District", url: "https://www.chicagoparkdistrict.com/", supports: "Lakefront, Lakefront Trail, parks" },
      { title: "Navy Pier", org: "Navy Pier, Inc.", url: "https://navypier.org/", supports: "Navy Pier history" },
      { title: "Skydeck Chicago", org: "Willis Tower", url: "https://theskydeck.com/", supports: "Willis Tower and The Ledge" },
      { title: "The Field Museum", org: "Field Museum", url: "https://www.fieldmuseum.org/", supports: "SUE the T. rex, Museum Campus" },
      { title: "Art Institute of Chicago", org: "Art Institute of Chicago", url: "https://www.artic.edu/", supports: "Museum collections" }
    ]},
    { group: "Neighborhoods", items: [
      { title: "Encyclopedia of Chicago", org: "Newberry Library & Chicago History Museum", url: "http://www.encyclopedia.chicagohistory.org/", supports: "Neighborhood histories: Bronzeville, Hyde Park, Englewood, Pilsen, Lincoln Park, Austin" },
      { title: "QuickFacts: Chicago city, Illinois", org: "U.S. Census Bureau", url: "https://www.census.gov/quickfacts/chicagocityillinois", supports: "Population and demographics (2020 Census)" },
      { title: "Chicago Data Portal", org: "City of Chicago", url: "https://data.cityofchicago.org/", supports: "The 77 community areas" },
      { title: "Chicago Metropolitan Agency for Planning", org: "CMAP", url: "https://cmap.illinois.gov/", supports: "Community data snapshots" },
      { title: "National Museum of Mexican Art", org: "NMMA", url: "https://nationalmuseumofmexicanart.org/", supports: "Pilsen, Mexican art and culture" },
      { title: "Lincoln Park Zoo", org: "Lincoln Park Zoo", url: "https://www.lpzoo.org/", supports: "Zoo history (1868)" },
      { title: "Museum of Science and Industry", org: "MSI", url: "https://www.msichicago.org/", supports: "Hyde Park, 1893 World’s Fair building" },
      { title: "Growing Home", org: "Growing Home, Inc.", url: "https://growinghomeinc.org/", supports: "Urban farming in Englewood" }
    ]},
    { group: "Redlining", items: [
      { title: "Mapping Inequality: Redlining in New Deal America", org: "University of Richmond Digital Scholarship Lab", url: "https://dsl.richmond.edu/panorama/redlining/", supports: "HOLC maps (including Chicago) and grading categories" },
      { title: "Records of the Home Owners’ Loan Corporation", org: "National Archives", url: "https://www.archives.gov/", supports: "Original HOLC maps and records (Record Group 195)" },
      { title: "Fair Housing", org: "U.S. Department of Housing and Urban Development", url: "https://www.hud.gov/", supports: "The Fair Housing Act of 1968" },
      { title: "Encyclopedia of Chicago", org: "Newberry Library & Chicago History Museum", url: "http://www.encyclopedia.chicagohistory.org/", supports: "Housing segregation, restrictive covenants, contract buying" }
    ]},
    { group: "Public Housing", items: [
      { title: "Chicago Housing Authority", org: "CHA", url: "https://www.thecha.org/", supports: "CHA history (1937) and the Plan for Transformation" },
      { title: "National Public Housing Museum", org: "NPHM", url: "https://www.nphm.org/", supports: "Residents’ stories and oral histories" },
      { title: "Gautreaux litigation", org: "BPI Chicago", url: "https://www.bpichicago.org/", supports: "The Gautreaux case (1966 lawsuit, 1969 ruling)" },
      { title: "Chicago History Museum", org: "Chicago History Museum", url: "https://www.chicagohistory.org/", supports: "Robert Taylor Homes, Cabrini-Green history" }
    ]},
    { group: "News & Media", items: [
      { title: "News Literacy Project", org: "News Literacy Project", url: "https://newslit.org/", supports: "How news selection and framing work" },
      { title: "City Bureau", org: "City Bureau (Chicago civic journalism lab)", url: "https://www.citybureau.org/", supports: "Community-centered local journalism" },
      { title: "Block Club Chicago", org: "Block Club Chicago", url: "https://blockclubchicago.org/", supports: "Neighborhood-level news coverage" },
      { title: "WBEZ Chicago", org: "Chicago Public Media", url: "https://www.wbez.org/", supports: "Chicago news coverage" }
    ]},
    { group: "Community Voices", items: [
      { title: "Chicago Public Art Group", org: "CPAG", url: "https://www.cpag.net/", supports: "Community murals" },
      { title: "DuSable Black History Museum", org: "DuSable Museum", url: "https://www.dusablemuseum.org/", supports: "Black Chicago history and culture" },
      { title: "Young Chicago Authors", org: "YCA", url: "https://youngchicagoauthors.org/", supports: "Louder Than A Bomb youth poetry festival" },
      { title: "NeighborSpace", org: "NeighborSpace", url: "https://neighbor-space.org/", supports: "Community garden land trust" },
      { title: "The Great Migration", org: "Smithsonian NMAAHC", url: "https://nmaahc.si.edu/", supports: "Great Migration background" },
      { title: "Chicago Transit Authority", org: "CTA", url: "https://www.transitchicago.com/", supports: "The L (side quest)" },
      { title: "Chicago Architecture Center", org: "CAC", url: "https://www.architecture.org/", supports: "Architecture (side quest)" }
    ]}
  ]
};
