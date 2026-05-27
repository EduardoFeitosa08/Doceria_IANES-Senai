const knex = require('knex')
const database = require("../database.js")

const getSelectAllProductsExcluidos = async () => {
    try {
        const result = await database('vw_produtos_excluidos_por_usuario').orderBy('id_produto_excluido')

        if(result.length > 0)
            return result
        else
            return false
    } catch (error) {
        
    }
}

const setInsertProdutoExcluido = async (produto_excluido) => {
    try {
        const result = await database('tbl_produto_excluido').insert({
            id_usuario: id_usuario,
            id_produto: produto.id_produto
        })

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateProdutoExcluido = async function(produto_excluido) {
    try {
        const result = await database('tbl_produto_excluido').where('id_produto_excluido', produto_excluido.id).update({
            id_produto: id_produto,
            id_usuario: id_usuario
        })
        if(result > 0)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteProdutoExcluido = async function(id) {
    try {
        const result = await database('tbl_produto_excluido').where('id_produto_excluido', id).del()
        if(result > 0)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}


module.exports = {
    setDeleteProdutoExcluido,
    setInsertProdutoExcluido,
    setUpdateProdutoExcluido,
    getSelectAllProductsExcluidos
}