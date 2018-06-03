'use strict'

const fastify = require('fastify')()
const fsequelize = require('fastify-sequelize') 



const sequelizeConfig = {
    instance : 'sequelize',
    autoCorrect : true,
    dialect : 'postgres',
    host:'localhost',
    username:'postgres',
    'database':'fastifydb',
    operatorsAliases: false,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}
fastify
    .register(fsequelize, sequelizeConfig)

fastify.register(require('./plugins/users'))
fastify.register(require('./plugins/roles'))

fastify.listen(3000, function(err){
    if(err){
        fastify.log.error(err)
    }
})
