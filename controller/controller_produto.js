const produto_model = require('../model/produto.js')

const { response } = require('express')

const MESSAGE_DEFAULT = require('./messages.js')

const listarProdutos = async () => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        let result = await produto_model.getSelectAllProducts()
        // console.log(result)
        if (result) {
            if (result.length > 0) {
                MESSAGE.REQUEST_SUCESS.result = result
                console.log(MESSAGE.REQUEST_SUCESS)
                return MESSAGE.REQUEST_SUCESS
            }
        }
    } catch (error) {
        return false
    }
}

const atualizarProduto = async (produto, id, contentType) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            produto.id = id
            // const validarDados = validarDados(produto)

            // if (validarDados) {
            let result = await produto_model.setUpdateProduct(produto)
            // console.log(result);
            if (result) {
                MESSAGE.SUCESS_UPDATE_ITEM.result = result
                return MESSAGE.SUCESS_UPDATE_ITEM
            }
            // }
        }
    } catch (error) {
        return false
    }
}


const inserirProduto = async (produto, contentType) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    // console.log(MESSAGE.SUCESS_CREATED_ITEM)
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // const validarDados = validarDados(produto)
            // if (validarDados) {
            let result = await produto_model.setInsertProduct(produto)
            if (result) {
                MESSAGE.SUCESS_CREATED_ITEM
                return MESSAGE.SUCESS_CREATED_ITEM
            }
            //     let result = await produto_model.setInsertProduct(produto)
            //     console.log(result)
            // }
        }
    } catch (error) {
        return false
    }
}

const deletarProduto = async (id) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    if (typeof id !== "number" || id <= 0) {
        let result = await produto_model.setDeleteProduct(id)
        console.log(result)
        if (result) {
            return MESSAGE.SUCESS_DELETE_ITEM
        }
    }
}

function validarDados(produto) {

    if (
        typeof produto.id !== "number" || produto.id <= 0 ||
        !produto.nome || produto.nome.trim().length < 3 ||
        typeof produto.recheio !== "string" || !produto.recheio.trim() ||
        typeof produto.cobertura !== "string" || !produto.cobertura.trim() ||
        typeof produto.massa !== "string" || !produto.massa.trim() ||
        typeof produto.peso !== "number" || produto.peso <= 0 ||
        produto.numero_porcoes < 1 ||
        !produto.data_de_vencimento || isNaN(new Date(produto.data_de_vencimento).getTime()) || new Date(produto.data_de_vencimento) <= new Date()
    ) {
        return false
    } else {
        return true
    }
}

module.exports = {
    listarProdutos,
    inserirProduto,
    atualizarProduto,
    deletarProduto
}