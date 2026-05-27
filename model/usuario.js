const knex = require('knex')
const database = require("../database.js")

const getSelectAllUsers = async function() {
    try {
        const result = await database('tbl_usuario').orderBy('id')
        if(result.length > 0)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const setInsertUser = async function(usuario) {
    try {
        const result = await database('tbl_usuario').insert({
            email: usuario.email,
            senha: usuario.senha
        })

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const setValidacionLogin = async function (email, senha) {
 
   try {
        let result = await database('tbl_usuario')
            .where('email', email)
            .first();

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false;
    }
}

const setUpdateUser = async function(usuario) {
    try {
        const result = await database('tbl_usuario').where('id', usuario.id).update({
            email: usuario.email,
            senha: usuario.senha
        })
        if(result > 0)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteUser = async function(id) {
    try {
        const result = await database('tbl_usuario').where('id', id).del()
        if(result > 0)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllUsers,
    setInsertUser,
    setUpdateUser,
    setDeleteUser,
    setValidacionLogin
}