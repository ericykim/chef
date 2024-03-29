# **Chef**

*Chef* is an all-in-one platform where aspiring and veteran chefs alike can iterate on their recipes, collaborate with fellow cooks across the platform, explore other forms of cuisine, have a guided cooking experience, and better plan their meals.  

## **Roadmap**

**Phase 1**
The platform will be a simple recipe Version Control System (VCS), supporting features such as exploring popular recipes made by other chefs, creating a recipe from scratch, backtracking recipes' history of changes, and "forking" or collaborating others' recipes. *Chef* is in many ways the Github for recipes.

**Phase 2**
With an established VCS, the next direction is to provide an elegant guided cooking experience. There are a lot of shortcomings with how plain text recipes currently work, and plenty of room for a more augmented experience. Dynamic and hassle-free, this interactive feature is walks you through the recipe, outlining and providing context to every step along the way.

Something as simple as a sidebar view of the ingredients, or highlighting the current step can go a long way for the cooking experience.

**Phase 3**
When *Chef* gets to a point where it's a trusted source of recipes, the platform will empower its users to utilize its features for better meal planning. Users can access the wealth of recipes on the platform to find a suitable dietary plan, resourefully manage a meal with given limited ingredients, or receive in-app directions or suggestions when innovating a recipe.

Phase 3 will consider machine learning to better assist users. 

**Phase n**
I dunno. Cool yet reasonably ethical stuff with people's data...

**Phase n + 1**
People will be angry regardless. Probably deal with the backlash of Phase n.

## **Technology Stack**
**Server**
The server is built with PostgreSQL and Typescript [NestJS](https://nestjs.com/) exposing RESTful APIs. GraphQL is considered but REST was preferred for jumpstarting the project faster. 

**Client**
Built with vanilla React.js, using the [Ant Design](https://ant.design/) system.



## **Getting Started**
1. Clone the repository

```sh
$ git clone git@github.com:gvjacob/chef.git
```

2. Install and start Docker (refer to [Docker for Mac](#Docker-for-Mac))
3. Run `docker-compose up -d` on project root directory
4. Go to `localhost:8080` to view Chef.

### **Docker for Mac**

Chef local development runs on Docker. Download, install, and run [Docker for Mac](https://www.docker.com/docker-mac). If you have brew for mac, you can run `brew cask install docker` and then launch docker from spotlight.

### **Accessing the Database**
The postgres database should be live at `localhost:5432`. Log into the `chef` database as `postgres` with `postgres` as its password. 

> Note: run `./postgres/seed.sh` to seed local database with mock data everytime you rebuild docker.
