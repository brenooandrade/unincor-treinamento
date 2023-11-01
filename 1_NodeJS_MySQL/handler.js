'use strict';

const mysql = require('serverless-mysql');
const sqlstring = require('sqlstring');

global.mySQLhost = process.env.MYSQL_HOST;
global.mySQLuser = process.env.MYSQL_USER;
global.mySQLpassword = process.env.MYSQL_PASSWORD;
global.mySQLdatabase = process.env.MYSQL_DATABASE;
global.mySQLport = process.env.MYSQL_PORT;

const conexao = require('serverless-mysql')({
  config: {
    host     : global.mySQLhost,
    database : global.mySQLdatabase,
    user     : global.mySQLuser,
    password : global.mySQLpassword,
    queryFormat : function (query, values) {
      if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {
          if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
          }
          return txt;
        }.bind(this));
    }
  }
});

//Abre SQL
async function abreSQL(strQuery) {
  return new Promise(async (resolve, reject) => {
    try {
      await conexao.query({ 
        sql: strQuery,
        values: [],
        timeout: 900000
      }, async (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
      // await conexao.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports.abresql = async (event) => {
  var dadosSQL    = JSON.parse(event.body);
  if ((dadosSQL == null) || (!(dadosSQL.hasOwnProperty("sql"))) || (typeof dadosSQL.sql === "undefined")) {
    console.log(
      {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },  
        body: JSON.stringify(
          {
            code: "BadRequest",
            sucesso: false,
            req: event.body,
            message: `Erro ao executar query: JSON inválido`
          })
      }
    );  
    return {
            statusCode: 400,
            headers: {
              "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
            },  
            body: JSON.stringify(
              {
                code: "BadRequest",
                sucesso: false,
                req: event.body,
                message: `Erro ao executar query: JSON inválido`
              })
          }
  } 
  var sqlQry         = dadosSQL.sql; ;
  var vDadosRetorno  = [];
  const promessa = new Promise(async(resolve) => {
    try {
      //Executar SQL
      vDadosRetorno = await abreSQL(sqlQry);
      //5 - Resposta
      resolve(
        {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
          },
          body: JSON.stringify(
            {
              sucesso: true,
              message: 'Sucesso ao executar query!',
              dados: vDadosRetorno,
            })
        }
      );
    } catch (error) { 
      resolve(
        {
          statusCode: 500,
          headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
          },  
          body: JSON.stringify(
            {
              code: "BadRequest",
              sucesso: false,
              req: event.body,
              message: `Erro ao executar query: ${error}`
            })
        }
      );
    }
  });

  return promessa;

};
