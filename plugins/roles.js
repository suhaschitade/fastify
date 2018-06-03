const sequelize = require('sequelize')

async function routes(fastify, options) {
    fastify.get('/roles', async (request, reply) => {
        fastify.sequelize.query("select * from roles", { type: sequelize.QueryTypes.SELECT})
        .then(roles => {
            console.log(roles)
        })
        return {hello: 'roles'}
    })
    
}
module.exports = routes