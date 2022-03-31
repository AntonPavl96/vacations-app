create database vacations_db;

use vacations_db;

create table users (
	userID int auto_increment,
    firstName varchar(255),
	lastName varchar(255),
	username varchar(255),
    password varchar(255),
	role varchar(255) default "user",
    primary key(userID)
);

create table vacations (
	vacationID int auto_increment,
    description text,
    destination varchar(255),
    imageUrl text,
    fromDate datetime,
    toDate datetime,
    price int,
    primary key(vacationID)
);

create table likes (
	likeID int auto_increment,
	userID int,
    vacationID int,
    primary key(likeID),
    foreign key(userID) references users(userID),
    foreign key(vacationID) references vacations(vacationID)
);

insert into users (firstName, lastName, username, password, role )
values("Anton", "Pavliukevich", "admin", "123", "admin");

insert into users (firstName, lastName, username, password)
values
("Don", "Keigh", "user1","123"),
("Ben", "Dover", "user2","123"),
("Mike", "Rotch", "user3","123"),
("Hugh", "Jass", "user4","123"),
("Anita", "Bath", "user5","123");

insert into vacations (description, destination, imageUrl, fromDate, toDate, price) values
("Beautiful beaches and art deco delights are just some of Miami’s many charms – there's also the blazing nightlife, tropical gardens, lively arts scene and sizzling cuisine.", "Miami", "https://www.airtransat.com/getmedia/7ab25607-2bc6-442d-b84e-1bf9a514f2ba/usa-etats-unis-florida-floride-south-beach-miami-1000x600.aspx?width=1000&height=600&ext=.jpg", "2021-12-23", "2021-12-27", 900),
("Berlin's combo of glamour and grit is bound to mesmerise all those keen to explore its vibrant culture, cutting-edge architecture, fabulous food, intense parties and tangible history.", "Berlin", "https://www.visitberlin.de/system/files/styles/visitberlin_teaser_single_visitberlin_mobile_1x/private/image/iStock_000074120341_Double_DL_PPT_0.jpg?h=a66ba266&itok=34GoL64x", "2021-12-25", "2021-12-29", 500),
("Paris' monument-lined boulevards, museums, classical bistros and boutiques are enhanced by a new wave of multimedia galleries, creative wine bars, design shops and tech start-ups.", "Paris", "https://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_233/vue-sur-les-toits-de-la-tour-saint-jacques-%7C-740x380-%7C-%C2%A9-elodie-gutbrod-cr%C3%A9atividie/21581411-1-fre-FR/Vue-sur-les-toits-de-la-tour-Saint-Jacques-%7C-740x380-%7C-%C2%A9-Elodie-Gutbrod-Cr%C3%A9atividie.jpg", "2021-12-24", "2021-12-26", 500),
("During any season, at any hour of the day, Moscow thrills visitors with its artistry, history and majesty.", "Moscow", "https://ychef.files.bbci.co.uk/976x549/p014pj4v.jpg", "2021-12-29", "2022-01-07", 600),
("One of the world's most visited cities, London has something for everyone: from history and culture to fine food and good times.", "London", "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/tower-bridge/thames_copyright_visitlondon_antoinebuchet640x360.jpg?mw=640&hash=27AEBE2D1B7279A196CC1B4548638A9679BE107A", "2022-03-03", "2022-03-09", 650),
("Epicenter of the arts. Architectural darling. Dining and shopping capital. Trendsetter. New York City wears many crowns, and spreads an irresistible feast for all.", "New York", "https://static.politico.com/dims4/default/af81090/2147483647/resize/1160x%3E/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2F36%2F98%2F5ceb5cf3473c91620bb5bea1254d%2Flede1-200331-blesener-politico-009.jpg", "2021-12-19", "2021-12-24", 800),
("Imagine the audacity of building a city of marble palaces on a lagoon – and that was only the start.", "Venice", "https://ychef.files.bbci.co.uk/976x549/p08rhwsy.jpg", "2021-11-24", "2021-11-30", 450),
("A heady mix of haunting ruins, awe-inspiring art and vibrant street life, Italy’s hot-blooded capital is one of the world’s most romantic and charismatic cities.", "Rome", "https://www.thediaryofanomad.com/wp-content/w3-webp/uploads/2020/11/rome-for-3-days-in-rome-itinerary-vatican-dome-view.jpgw3.webp", "2021-11-27", "2021-12-01", 400),
("Hong Kong welcomes with an iconic skyline, a legendary kitchen, and lush, protected nature where rare birds and colorful traditions thrive.", "Hong Kong", "https://www.business.hsbc.com/-/media/cmb/international-business-guide/hk/images/doing-business-hongkong.jpg?h=961&w=1440&la=en-GB&hash=58C2D49B6CB7D83991A7B683E4D802CC", "2021-12-15", "2021-12-26", 1100),
("Ruggedly good looking, deeply creative, with a sunny disposition to boot…if LA were on Tinder, the app would crash.", "Los Angeles", "https://www.oxy.edu/sites/default/files/styles/banner_image/public/page/banner-images/los-angeles_main_1440x800.jpg?itok=e8p15lFb", "2022-01-19", "2022-01-23", 1050),
("Golden beaches and lush mountains, samba-fueled nightlife and spectacular football matches: welcome to the Cidade Maravilhosa (Marvelous City).", "Rio de Janeiro", "https://images.ctfassets.net/bth3mlrehms2/1RA6MIQkZhShF2sUf9KjpZ/299a594fb7c96b36b2079eabb1ccce54/Brasilien_Rio_de_Janeiro_Christo_Redentor_Statue.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg", "2022-02-04", "2022-02-11", 1000),
("Madrid is a beguiling place with an energy that carries one simple message: this city really knows how to live.", "Madrid", "https://img.static-af.com/images/meta/IDname/CITY-MAD-1?aspect_ratio=2:1&max_width=1920", "2022-02-05", "2022-02-12", 600),
("Prague is the equal of Paris in terms of beauty. Its history goes back a millennium. And the beer? The best in Europe.", "Prague", "https://cdn.britannica.com/21/177921-050-4529CD59/Charles-Bridge-Vltava-River-Prague.jpg", "2022-05-03", "2022-05-08", 650),
("Beautiful beaches and art deco delights are just some of Miami’s many charms – there's also the blazing nightlife, tropical gardens, lively arts scene and sizzling cuisine.", "Miami", "https://www.airtransat.com/getmedia/7ab25607-2bc6-442d-b84e-1bf9a514f2ba/usa-etats-unis-florida-floride-south-beach-miami-1000x600.aspx?width=1000&height=600&ext=.jpg", "2021-12-28", "2022-01-05", 1200),
("One of the world's most visited cities, London has something for everyone: from history and culture to fine food and good times.", "London", "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/tower-bridge/thames_copyright_visitlondon_antoinebuchet640x360.jpg?mw=640&hash=27AEBE2D1B7279A196CC1B4548638A9679BE107A", "2022-02-01", "2022-02-08", 750),
("Ruggedly good looking, deeply creative, with a sunny disposition to boot…if LA were on Tinder, the app would crash.", "Los Angeles", "https://www.oxy.edu/sites/default/files/styles/banner_image/public/page/banner-images/los-angeles_main_1440x800.jpg?itok=e8p15lFb", "2022-01-24", "2022-01-30", 1150);

insert into likes (userID, vacationID)
values
(2,1),
(2,2),
(2,3),
(2,5),
(2,6),
(2,8),
(2,9),
(3,1),
(3,2),
(3,4),
(3,7),
(3,8),
(4,1),
(4,2),
(4,5),
(4,6),
(4,9),
(4,10),
(5,1),
(5,3),
(5,4),
(6,1),
(6,5);
