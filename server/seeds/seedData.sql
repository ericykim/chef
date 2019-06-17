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
