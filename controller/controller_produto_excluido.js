const usuario_model = require('../model/usuario.js')
const produto_model = require('../model/produto.js')
const produto_excluido_model = require('../model/produto_excluido.js')

const { response } = require('express')

const MESSAGE_DEFAULT = require('./messages.js')

const listarProdutosExcluidos = async () => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        let result = await produto_excluido_model.getSelectAllProductsExcluidos()

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

const atualizarProdutoExcluido = async (produto_excluido, id, contentType) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            produto_excluido.id = id
            const validarDados = validarDados(produto_excluido)

            if (validarDados) {
                let result = await produto_excluido_model.setUpdateProdutoExcluido(produto_excluido)

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


const inserirProdutoExcluido = async (produto_excluido, contentType) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            produto_excluido.id = 1
            const validarDados = validarDados(produto_excluido)

            if (validarDados) {
                let result = await produto_excluido_model.setInsertProdutoExcluido(produto_excluido)

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

const deletarProdutoExcluido = async (id) => {
    if (typeof produto.id !== "number" || produto.id <= 0) {
        let result = await produto_excluido_model.setDeleteUser(id)

        if (result) {
            return MESSAGE.SUCESS_DELETE_ITEM
        }
    }
}

function validarDados(produto_excluido) {
    if (
        typeof produto_excluido.id !== "number" || produto_excluido.id <= 0 ||
        typeof produto_excluido.usuario_id !== "number" || produto_excluido.usuario_id <= 0 ||
        typeof produto_excluido.produto_id !== "number" || produto_excluido.produto_id <= 0
    ) {
       return false
    }else{
        return true
    }


}


module.exports = {
    listarProdutosExcluidos,
    inserirProdutoExcluido,
    atualizarProdutoExcluido,
    deletarProdutoExcluido
}