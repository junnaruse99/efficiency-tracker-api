1) Initialize npm
    `
    npm init
    `

2) Install nodemon for refreshing when making changes as devDependency
    `
    npm install -D nodemon
    `

3) Install stack (doenv: creating env variables, express for server and mongoose for db querys)
    `
    npm i express mongoose dotenv
    `
4) Add to scripts in package.json ('.' for search index.js)
    `
    "start": "node .",
    "dev": "nodemon ."
    `
5) From server, run
    `
    npm run dev
    `

6) <a href='https://documenter.getpostman.com/view/14011002/UVXdMdVo'>Documentation</a>




