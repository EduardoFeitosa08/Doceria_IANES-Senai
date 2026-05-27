const usuario_model = require('../model/usuario.js')

const { response } = require('express')

const MESSAGE_DEFAULT = require('./messages.js')

const listarUsuarios = async () => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        let result = await usuario_model.getSelectAllUsers()

        if (result) {
            if (result.length > 0) {
                MESSAGE.REQUEST_SUCESS.result = result
                return MESSAGE.REQUEST_SUCESS
            }
        }
    } catch (error) {
        return false
    }
}

const atualizarUsuario = async (usuario, id, contentType) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            usuario.id = id
            const validarDados = validarDados(usuario)

            if (validarDados) {
                let result = await usuario_model.setUpdateUser(usuario)

                if (result) {
                    MESSAGE.SUCESS_UPDATE_ITEM.result = result
                    return MESSAGE.SUCESS_UPDATE_ITEM
                }
            }
        }
    } catch (error) {
        return false
    }
}


const inserirUsuario = async (usuario, contentType) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            const validarDados = validarDados(usuario)

            if (validarDados) {
                let result = await usuario_model.setInsertUser(usuario)

                if (result) {
                    MESSAGE.SUCESS_CREATED_ITEM.result = result
                    return MESSAGE.SUCESS_CREATED_ITEM
                }
            }
        }
    } catch (error) {
        return false
    }
}

const loginUsuario = async (dadosLogin) => {
    try {
        const usuario = await usuario_model.setValidacionLogin(dadosLogin.email)
        
        if(usuario.senha = dadosLogin.senha){
            MESSAGE.REQUEST_SUCESS.result = result
            return MESSAGE.REQUEST_SUCESS
        }else{
            console.log("Login Falhou")
            return false
        }
    }catch(error){
        return false
    }
}

const deletarUsuario = async (id) => {
    if (typeof produto.id !== "number" || produto.id <= 0) {
        let result = await usuario_model.setDeleteUser(id)

        if (result) {
            return MESSAGE.SUCESS_DELETE_ITEM
        }
    }
}

function validarDados(usuario) {
    if (
        typeof usuario.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email) ||
        typeof usuario.senha !== "string" || usuario.senha.length < 6
    ) {
       return false
    }else{
        return true
    }


}


module.exports = {
    listarUsuarios,
    inserirUsuario,
    atualizarUsuario,
    deletarUsuario,
    loginUsuario
}