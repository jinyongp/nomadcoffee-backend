# Instaclone Challenge

## 진도표

### **1 주차**

#### **월, 화 | Assignment #01** (\#3.0 ~ #3.12)

##### #3.0 Setup

프로젝트 폴더를 생성하고 초기화한다.

```sh
mkdir instaclone && cd instaclone
yarn init -y
```

VSCode의 gitignore extension으로 `.gitignore` 파일을 생성한다. (node)

`README.md` 파일을 생성한다.

##### #3.1 Apollo Server

[Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)로 GraphQL Server를 구현한다.

```sh
yarn add apollo-server graphql
```

`src/server.js` 파일을 생성하고 아래 코드를 작성한다.

```js
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
```

`url`은 `http://localhost:4000`이고, 해당 주소로 이동하면 Apollo Sandbox로 redirect한다.

``` js
query {
  hello
}
```

위의 query를 요청하면 `world`가 응답한다.

코드에 변경사항이 생길 때 자동으로 서버를 재시작하도록 하기 위해 `nodemon`을 설치한다.

```sh
yarn add -D nodemon
```

`nodemon.json` 파일을 추가하고 다음 내용을 작성한다.

```json
{
  "watch": ["src/**/*"],
	"exec": "node src/server",
  "ext": "js,ts"
}
```

`package.json` 파일에서 `scripts`에 `"dev": "nodemon"`을 추가하고 `yarn dev` 명령어를 통해 서버를 실행한다.

##### #3.2 Babel

Node.JS 버전과 무관하게 최신 JS 문법으로 작성하기 위해 [Babel](https://babeljs.io/docs/en/usage)을 이용한다.

```sh
yarn add -D @babel/core @babel/preset-env @babel/node
```

`babel.config.json` 파일을 생성하고 아래 내용을 작성한다.

```json
{
  "presets": ["@babel/preset-env"]
}

```

`nodemon.json`에서 `"exec": "node src/server"`의 `node`를 `babel-node`로 변경한다. 서버를 새로 시작하여 최신 문법(`import`)이 제대로 동작하는지 확인한다.

##### #3.3 POC(Proof of Concept) API

- `typeDefs`:  `gql` 함수의 반환값을 가진다. `gql`함수는 [ `Tagged Template Literal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)로 GraphQL Schema를 작성하여 넘겨준다.
  - Schema는 Object types와 Fields를 가진다. 대부분 일반 객체를 작성하지만, `Query`나 `Mutation`은 특별한 역할을 수행한다.
  - `Query`는 서버에서 데이트를 불러오기 위한 단순 요청을 수행한다. 데이터베이스에 어떠한 변경을 가하지 않아야 한다.
  - `Mutation`은 서버에 데이터를 추가하거나 변경하기 위한 요청을 수행한다. 성공적으로 수행하거나 혹은 실패한 결과에 대해 반환할 수 있다.
- `resolvers`: `typeDefs`에서 정의한 `Query`와 `Mutation`에 대해 동작을 정의한다. 정의하지 않은 query는 null을 반환한다.

```js
let id = 1;
const movies = [
  {
    id: id++,
    title: 'Star Wars',
    year: 2020,
  },
  {
    id: id++,
    title: 'Avengers',
    year: 2016,
  },
  {
    id: id++,
    title: 'Spider Man',
    year: 2021,
  },
];

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int
  }

  type Query {
    getMovie(id: Int!): Movie
    getMovies: [Movie]
  }

  type Mutation {
    createMovie(title: String!, year: Int!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    getMovie(_, { id }) {
      return movies.find((movie) => movie.id === id);
    },
    getMovies() {
      return movies;
    },
  },
  Mutation: {
    createMovie(_, { title, year }) {
      movies.push({ id: id++, title, year });
      return true;
    },
    deleteMovie(_, { title }) {
      const index = movies.findIndex((movie) => movie.title === title);
      if (index < 0) return false;

      movies.splice(index, index + 1);
      return true;
    },
  },
};

```

`typeDefs`에 `Movie`라는 Object type을 정의했고, 이를 열람, 생성, 삭제하는 `Query`와 `Mutation`을 정의했다. `Query`와 `Mutation`은 함수 형태이므로 인자가 필요하다면 `getMovie(id: Int!): Movie` 형태로 작성할 수 있다. 인자로 `id`를 받고, `Movie`를 반환한다. 존재하지 않는 `id`가 넘어가면 `null`을 반환한다.

`resolvers`에는 `typeDefs`에서 정의한 `Query`와 `Mutation`이 어떤 동작을 수행할 지에 대해 정의했다. 가짜 DB인 `movies`에서 데이터를 읽거나 수정하여 그 결과를 반환한다. 실제 DB를 사용한다면, 해당 DB를 접근하는 코드를 작성하고 그 결과를 반환해야 한다.

##### #3.4 Prisma Setup

SQL 코드 없이 JS 코드만으로 DB와 소통하기 위한 ORM으로 [Prisma](https://www.prisma.io/docs/getting-started/quickstart)를 이용한다.

```sh
yarn add -D prisma
npx prisma init
```

`.env` 와 `prisma/schema.prisma` 파일이 생성된다.

PostgreSQL을 DB로 사용하기 위해 `instaclone`이라는 이름의 데이터베이스를 생성한다.

```sql
CREATE DATABASE instaclone;
```

`.env` 에서 `DATABASE_URL` 값을 `"postgresql://jinyongp:randompassword@localhost:5432/instaclone?schema=public"` 로 변경한다.

##### #3.5 Prisma Migrate

Migrate를 하면 `schema.prisma`에 작성한 Data Model이 데이터베이스에 적용된다.

```graphql
type Movie {
	id: Int
	title: String
	year: Int
}
```

GraphQL에서 `Movie` Model이 위와 같다면 Prisma에서의 Data Model은 아래와 같다.

```prisma
model Movie {
	id		Int			@id	@default(autoincrement())
	title	String
	year	Int
}
```

`schema.prisma`에 작성한 코드를 토대로 SQL을 생성하여 DB에 적용하는 `prisma migrate`를 실행한다.

```sh
npx prisma migrate dev
```

SQL을 생성하여 DB에 적용할 뿐만 아니라 `prisma client`를 설치한다. Client를 통해 JS와 DB 사이에서 통신할 수 있다.

> `"migrate": "npx prisma migrate dev"`를 `package.json`의 `scripts`에 추가한다.

##### #3.6 Prisma Client part One

[Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)를 불러온다. `resolvers`에서 호출하여 DB와 통신한다.

```js
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const resolvers = {
  Query: {
    getMovies() {
      return client.movie.findMany();
    }
  },
  ...
}
```

`client`를 통해 DB로부터 영화 목록을 불러와 반환한다.

##### #3.7 Prisma Client part Two

`id`로 영화를 찾기 위해선 `where` 조건을 이용한다.

```js
const resolvers = {
  Query: {
    getMovie(_, { id }) {
      return client.movie.findUnique({ where: { id } });
    }
  },
  ...
}
```

##### #3.8 Prisma Studio

[Prisma Studio](https://www.prisma.io/studio)를 이용하면 데이터베이스의 상태를 시각적으로 확인할 수 있다.

```sh
npx prisma studio
```

> `"migrate": "npx prisma studio"`를 `package.json`의 `scripts`에 추가한다.

##### #3.9 Architecture part One

하나의 파일은 하나의 기능만 수행하도록 구성한다. 이를 분류 별로 묶어 하나의 폴더에 넣는다. `movies` 폴더가 있다면 아래의 파일을 가진다.

- `movies.typedefs.js`

  ```js
  import { gql } from 'apollo-server';
  
  export default gql`
    type Movie {
      id: Int!
      title: String!
      year: Int
    }
  
    type Query {
      getMovie(id: Int!): Movie
      getMovies: [Movie]
    }
  
    type Mutation {
      createMovie(title: String!, year: Int!): Boolean
      deleteMovie(title: String!): Boolean
    }
  `;
  
  ```

- `movies.queries.js`

  ```js
  import { movies } from '../db';
  
  export default {
    Query: {
      getMovie(_, { id }) {
        return movies.find((movie) => movie.id === id);
      },
      getMovies() {
        return movies;
      },
    },
  };
  
  ```

- `movies.mutations.js`

  ```js
  import { movies } from '../db';
  
  export default {
    Mutation: {
      createMovie(_, { title, year }) {
        movies.push({ id: id++, title, year });
        return true;
      },
      deleteMovie(_, { title }) {
        const index = movies.findIndex((movie) => movie.title === title);
        if (index < 0) return false;
  
        movies.splice(index, index + 1);
        return true;
      },
    },
  };
  
  ```

`PrismaClient` 또한 `client.js` 파일로 분리한다.

 ```js
 import { PrismaClient } from '@prisma/client';
 
 const client = new PrismaClient();
 
 export default client;
 ```

##### #3.10 Architecture part Two

Data Model의 수는 점점 많아질 것이고, 모든 `typeDefs`와 `resolvers`를 한데 묶은 `schema`로 만들어야 한다. 이를 위해 [`graphql-tools`](https://www.graphql-tools.com/docs/introduction)를 설치한다.

```sh
 yarn add @graphql-tools/schema @graphql-tools/load-files @graphql-tools/merge  
```

`schema.js` 파일을 생성해 아래 코드를 작성한다.

```js
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.(js|ts)`);
const typeDefs = mergeTypeDefs(loadedTypeDefs);

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.(queries|mutations).(js|ts)`);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
```

`server.js`에서 `schema`를 불러온다.

```js
import schema from './schema';

const server = new ApolloServer({ schema });
```

`src` 폴더 내 모든 `typeDefs`와 `resolvers`를 불러온다.

##### #3.11 Dotenv

`.env` 파일에 작성한 환경변수를 사용하기 위해 [`dotenv`](https://github.com/motdotla/dotenv)를 이용한다.

```sh
yarn add dotenv
```

```env
PORT=4000
```

`.env`에서 작성한 환경변수를 불러오기 위해 아래 코드를 작성한다.

```js
import 'dotenv/config';

console.log(process.env.PORT); // 4000
```

##### #3.12 Recap

#### **수 | Assignment #02** (\#4.0 ~ #4.2)

##### #4.0 Create Account part One

`schema.prisma` 파일에 `User` Model을 정의한다.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String?
  username  String   @unique
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

```

`yarn migrate` 명령어로 DB에 적용한다. 이에 맞게 GraphQL Schema 또한 정의한다.

```graphql
type User {
  id: Int!
  firstName: String!
  lastName: String
  username: String!
  email: String!
  createdAt: String!
  updatedAt: String!
}

type Query {
  getUser(username: String!): User
}
```

서버를 시작하기 위해선 반드시 하나 이상의 Query가 있어야 하므로 `getUser`을 추가했다.

##### #4.1 Create Account part Two

`users/users.typeDefs.js`에 유저를 생성하는 `createUser` mutation을 추가한다.

```graphql
type Mutation {
  createUser(
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String!
  ): User
}
```

`users/users.resolvers.js`에 `createUser`를 정의한다.

```js
import client from '../client';

export default {
  Mutation: {
    async createUser(_, { firstName, lastName, username, email, password }) {
      const existUser = await client.user.findFirst({
        where: { OR: [{ username }, { email }] },
      });
      ...
    },
  },
};
```

`User`를 생성하기 전에 unique field인 `username`과 `email`의 중복 검사를 먼저 해야 한다. `where`절과 `OR`의 조합으로 중복을 찾아내서 이미 존재하는 사용자라면 실패를 반환해야 한다.

##### #4.2 Create Account part Three

DB에 비밀번호를 저장하기 위해선 비밀번호를 암호화하는 hashing 작업이 필요하다. 이를 위해 `bcrypt`를 사용한다.

> [Bcypt Algorithm](https://en.wikipedia.org/wiki/Bcrypt)
>
> ```
> $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
> \__/\/ \____________________/\_____________________________/
> Alg Cost      Salt                        Hash
> ```

```sh
yarn add bcrypt
```

```js
import bcrypt from 'bcrypt';
import client from '../client';

export default {
  Mutation: {
    async createUser(_, { firstName, lastName, username, email, password }) {
      try {
        password = await bcrypt.hash(password, 10);
        const data = { firstName, lastName, username, email, password };
        return await client.user.create({ data });
      } catch ({ code, meta, message }) {
        console.error(message, 'Error Code:', code);
        return null;
      }
    },
  },
};

```

`bcrypt.hash`는 입력한 비밀번호를 hashing하여 난독화된 값을 만든다. 동일한 `password`는 항상 같은 결과를 만들어내어 비밀번호를 비교할 수는 있지만 확인할 수 없도록 만든다.

`client.user.create` 과정에서 unique field인 `username`과 `email`의 중복 검사를 하지 않고 `try catch`로 잡아내어 error code로 구분할 수 있도록 변경했다. `return await`에서 `await`를 빼면 에러를 잡을 수 없으므로 반드시 작성한다.

#### **목, 금 | Assignment # 03** (#4.3 ~ #4.19)

##### #4.3 seeProfile



##### #4.4

##### #4.5

##### #4.6

##### #4.7

##### #4.8

##### #4.9

##### #4.10

##### #4.11

##### #4.12

##### #4.13

##### #4.14

##### #4.15

##### #4.16

##### #4.17

##### #4.18

##### #4.19



### **2 주차**

#### **월 | Assignment # 04** (#4.20 ~ #4.29)



#### **화, 수 | Assignment # 05** (#6.0 ~ #6.10)



#### **목 | Assignment # 06** (#19.0 ~ #19.7)



#### **금 | Assignment # 07**

- ✍️ #8.0 ~ 8.9
- ✔️코드 챌린지 

### 토, 일

🌴 휴일

------

### **3 주차**

#### **월, 화 | Assignment # 08**

- ✍️ #10.0 ~ #10.14
- ✔️ 코드 챌린지 (2일)

#### **수, 목 | Assignment # 09**

- ✍️ 복습
- ✔️ 코드 챌린지 (2일)

#### **금 | Assignment # 10**

- ✍️ #19.5
- ✔️ 코드 챌린지 

### 토, 일

🌴 휴일

------

### **4 주차**

#### **월 | Assignment # 11**

- ✍️ #13.4 ~ #13.7
- ✔️ 코드 챌린지

#### **화 | Assignment # 12**

- ✍️ #13.0 ~ #13.3
- ✔️ 퀴즈

#### **수, 목, 금 | Assignment # 13**

- ✍️ #14.0 ~ #15.4
- ✔️ 코드 챌린지 (3일)

### 토, 일

🌴 휴일

------

### **5 주차**

#### **월, 화, 수 | Assignment # 14**

- ✍️ #15.0 ~ #15.13
- ✔️ 코드 챌린지 (3일)

#### **목, 금 | Assignment # 15**

- ✍️ #16.3 ~ #16.6
- ✔️ 코드 챌린지 (2일)

### 토, 일

🌴 휴일

------

### **6 주차**

#### **월 ~ 금 | Assignment # 16**