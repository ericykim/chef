-- Chefs
INSERT INTO "public"."chefs"("id","firstName","lastName","email","updatedOn","createdOn")
VALUES
(E'51dbed09-6498-4c72-bcfb-4a07e2fdbaf9',E'Gino',E'Jacob',E'gvjacob@outlook.com',E'2019-06-16 15:50:34.131375',E'2019-06-16 15:50:34.131375'),
(E'24b15ce5-2580-4930-a8c5-5e76b6dd88c2',E'Gordon',E'Ramsey',E'gramsey@gmail.com',E'2019-06-17 15:29:05.023489',E'2019-06-17 15:29:05.023489');

-- Labels
INSERT INTO "public"."labels"("id","name","type","updatedOn","createdOn")
VALUES
(E'd2d7d779-a9e7-421d-adae-17e02cfc11b7',E'gluten-free',E'{restriction}',E'2019-06-16 16:55:19.392693',E'2019-06-16 16:55:19.392693'),
(E'19a364e4-af9c-4878-b47a-ee28ee7e3775',E'vegetarian',E'{diet}',E'2019-06-17 15:29:50.841275',E'2019-06-17 15:29:50.841275'),
(E'3fed481b-cb63-46f5-958d-fe2c26818da2',E'spicy',E'{flavor}',E'2019-06-17 15:30:01.528714',E'2019-06-17 15:30:01.528714'),
(E'db2c0d69-8853-446f-8385-f6bce08000df',E'summer',E'{popularity}',E'2019-06-17 15:30:38.618857',E'2019-06-17 15:30:38.618857'),
(E'ed758866-e3ff-478b-af25-ee063bfa7f90',E'asian',E'{cuisine}',E'2019-06-17 15:31:18.347301',E'2019-06-17 15:31:18.347301'),
(E'd1f2e32a-df4f-414e-baa3-6ac547aeeb31',E'dinner',E'{meal}',E'2019-06-17 15:31:34.659681',E'2019-06-17 15:31:34.659681'),
(E'a7e3d304-3b5c-467d-94ce-547f6953b047',E'appetizer',E'{course}',E'2019-06-17 15:32:53.351425',E'2019-06-17 15:32:53.351425'),
(E'c6bc2ac5-5962-48f7-aafb-14df4a19eba5',E'recommended',E'{other}',E'2019-06-17 15:32:53.351425',E'2019-06-17 15:32:53.351425'),
(E'c8d30b56-e0ce-468a-933f-fbfef72cc688',E'salad',E'{dishType}',E'2019-06-17 15:32:53.351425',E'2019-06-17 15:32:53.351425');

-- Recipes
INSERT INTO "public"."recipes"("id","title","subtitle","description","labels","ingredients","directions","preparationTime","cookTime","readyTime","updatedOn","createdOn","published","author")
VALUES
(E'f5b25ae8-4ec8-4656-ba03-3a92024bd278',E'Tonkotsu Ramen',NULL,E'This broth is milky white and unctuous, thanks to pork marrow bones and fat cooked for hours. Make your own Tonkotsu Ramen at home.',E'{}',E'{"2 pig trotters","1.5 pounds of pork leg bone"}',E'{}',NULL,NULL,NULL,E'2019-06-17 15:35:45.404308',E'2019-06-17 15:35:45.404308',FALSE,E'51dbed09-6498-4c72-bcfb-4a07e2fdbaf9');


-- INSERT INTO "public"."recipes"("id","title","subtitle","description","ingredients","directions","preparationTime","cookTime","chefId","views","pictures","published","updatedOn","createdOn")
-- VALUES
-- (E'5f015a1a-0746-4cad-8930-3f054151d6d1',E'Tonkotsu Ramen',E'Traditional Japanese noodle soup',E'Tonkotsu ramen is a ramen dish that originated in Fukuoka, Fukuoka Prefecture on the Kyushu island of Japan, and it is a specialty dish in both Fukuoka and Kyushu',E'{"1 egg","1/2 lbs of pork belly","a unit of ramen noodles"}',E'{"Wash all produce","Cook pork belly"}',3,15,E'2d4399d9-427f-4146-a767-ad693ef11e89',123,E'{https://www.seriouseats.com/recipes/images/2012/02/20120227-tonkotsu-ramen-broth-pork-fat-26.jpg,https://i2.wp.com/onehungryblogger.com/wp-content/uploads/2019/04/IMG_5622.jpg?fit=750%2C500,https://www.justonecookbook.com/wp-content/uploads/2019/05/Chashu-II.jpg}',TRUE,E'2019-06-28 05:31:33.813972',E'2019-06-28 05:31:33.813972'),
-- (E'6d235a1a-0746-4cad-8930-3f054151d6d1',E'Chicken Soup',E'for the soul',E'dis chick is gud',E'{"make stock","drink stock"}',E'{"once done","soothe soul"}',2,10,E'2d4399d9-427f-4146-a767-ad693ef11e89',0,E'{}',FALSE,E'2019-06-28 05:31:33.813972',E'2019-06-28 05:31:33.813972');

-- INSERT INTO "public"."chefs"("id","bio","updatedOn","createdOn","username","firstName","lastName","email","password","profilePicture")
-- VALUES
-- (E'0543e7ef-1498-4231-8a1b-0f986c0c5aec',NULL,E'2019-07-03 08:08:29.040325',E'2019-07-03 08:08:29.040325',E'gramsey',E'Gordon',E'Ramsey',E'gramsey@gmail.com',E'7be502240f90f6f7db74de865a00a5771f0a51b749287ba54b1a3b0aa857d815',NULL),
-- (E'2d4399d9-427f-4146-a767-ad693ef11e89',NULL,E'2019-06-28 05:11:18.057332',E'2019-06-28 05:11:18.057332',E'gvjacob',E'Gino',E'Jacob',E'gvjacob@outlook.com',E'a89b1ab0bece8cbb397de39033f40b2d34571296caffe8fc311cbca4949d90be',E'https://media.licdn.com/dms/image/C5103AQEyvOIY3nkTsA/profile-displayphoto-shrink_200_200/0?e=1564617600&v=beta&t=6rK46E3nJhTU7-0zluWvBXvKTWluj1QKTeyuJjDND78'),
-- (E'71f9ad4f-c0a1-46c6-b594-4360c7827e58',NULL,E'2019-06-30 05:23:50.742941',E'2019-06-30 05:23:50.742941',E'vroy',E'Victor',E'Roy',E'vroy@gmail.com',E'db5df2e25be27e226e23d34223a103b4585a49088a0c567e7a718fc90d844c16',NULL),
-- (E'cc97bfea-afe2-4f2b-9d2b-8c9a38273e89',NULL,E'2019-06-28 14:42:30.560533',E'2019-06-28 14:42:30.560533',E'hai',E'Brandon',E'Zhang',E'hello@gmail.com',E'246effd3bf2553a0fcf6b77829fa2d75d56da886b8e7f5fc9b047dcf1ab18b67',NULL),
-- (E'fe6da794-5deb-4246-8a85-f80082a6dd91',NULL,E'2019-07-03 10:28:25.380257',E'2019-07-03 10:28:25.380257',E'bstinson',E'Barney',E'Stinson',E'bstinson@gmail.com',E'91e98b19b56012e5df95eabfec2d0bb7bb3b220b56dd7a468a811ca427560685',NULL);
