/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const { Pool } = require('pg')
const dbConfig = require('../../cypress/fixtures/dbConfig.json');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    noParam,
    getDBDataAsync: getDBDataAsync,
    dbQuery: dbQuery
  });
  return config;
};

//task event with no parameter
function noParam(){
  console.log('NO param task');
  return null;
}

//sends query directly from this function.
function getDBDataAsync() {
  const pool = new Pool(dbConfig.db)
  const query = "select * from users";
  return new Promise((resolve, reject) => {
  pool.query(query, (err, res) => {
    console.log("connected to db")
    pool.end() 
    if(err){
      reject(err)
    }
    else{
      resolve(res)
    }
  })
})
}

//sends query to database, the query comes from testfile.
function dbQuery(query) {
  const pool = new Pool(dbConfig.db)
  return new Promise((resolve, reject) => {
  pool.query(query, (err, res) => {
    pool.end() 
    if(err){
      reject(err)
    }
    else{
      resolve(res)
    }
  })
})
}