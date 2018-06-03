const sequelize = require('sequelize') 

async function routes(fastify, options) {
    fastify.get('/users', async (request, reply) => {
        fastify.sequelize.query("select * from users", { type: sequelize.QueryTypes.SELECT})
        .then(users => {
            console.log(users)
        })
        return {hello: 'users'}
    })
    
    fastify.get('/users/:id', async (request,reply) => {
        var id = request.params.id
        var userDetails
        var strUserDetails = "SELECT u.id, u.first_name, u.last_name, a.address1, a.address2 from users u " +
                              "LEFT JOIN user_attributes ua ON u.id= ua.user_id " +
                              "LEFT JOIN roles r ON r.id = ua.role_id LEFT JOIN address a ON a.id = ua.address_id " +
                              "LEFT JOIN states s ON s.id = a.state_id LEFT JOIN Countries c ON c.id = a.country_id " + 
                              "where u.id = " + id
        console.log(strUserDetails)
        fastify.sequelize.query(strUserDetails, { type: sequelize.QueryTypes.SELECT})
        .then(details => {
           userDetails = details
           reply.send({details: userDetails}) 
        })
         
    })

}
module.exports = routes