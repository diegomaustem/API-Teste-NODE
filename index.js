const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ecomercejet',
    port:3306
});


db.connect(err=>{
    if(err) {console.log(err,'dberr');}
    console.log('connected database');
})


// Lista todos os produtos :: 
app.get('/produtos',(require, response)=>{

    let query = `select * from produtos`;

    db.query(query, (error, result)=>{
        
        if(error) { console.log(err, 'errs'); }

        if(result.length > 0)
        {
            response.send({
                message: 'Produtos listados com sucesso.',
                data:result
            });
        }
    });

});

// Lista o produto :: 
app.get('/produto/:id',(require, response)=>{

    let id = require.params.id;

    let query = `select * from produtos where id = ${id}`;

    db.query(query, (error, result)=>{
        
        if(error) { console.log(err); }

        if(result.length > 0)
        {
            response.send({
                message: 'Produto encontrado.',
                data:result
            });
        }
        else
        {
            response.send({
                message: 'Produto não encontrado.'
            });
        }
    });

});

// Cadastra o produto :: 
app.post('/produto',(require, response)=>{

    console.log(require.body, 'registerproduct');

    let nome      = require.body.nome;
    let imagem    = require.body.imagem;
    let descricao = require.body.descricao;
    let estoque   = require.body.estoque;
    let status    = require.body.status;
    let preco     = require.body.preco;

    let query = `insert into produtos (nome, imagem, descricao, estoque, status, preco) 
                 values ('${nome}', '${imagem}', '${descricao}', '${estoque}', '${status}', '${preco}')`;

    db.query(query, (error, result)=>{
        
        if(error) { console.log(err); }
        console.log(result, 'result')
        response.send({
            message: 'Produto inserido com sucesso.'
        });
           
    });

});

// Atualiza o produto :: 
app.put('/produto/:id',(require, response)=>{

    console.log(require.body, 'updateproducts');

    let id        = require.params.id;
    let nome      = require.body.nome
    let imagem    = require.body.imagem
    let descricao = require.body.descricao
    let estoque   = require.body.estoque
    let status    = require.body.status
    let preco     = require.body.preco

    let query = `update produtos set nome = '${nome}', imagem = '${imagem}', descricao = '${descricao}', estoque = '${estoque}',
     status = '${status}', preco = '${preco}' where id = ${id}`;

    db.query(query, (error, result)=>{
        
        if(error) { console.log(err); }
      
        response.send({
            message: 'Produto alterado com sucesso.'
        });
           
    });

});

// Deleta o produto ::
app.delete('/produto/:id',(require, response)=>{

    let id = require.params.id;

    let query = `delete from produtos where id = '${id}' `;

    db.query(query,(error, results)=>{
        if(error) { console.log(error); }
        
        response.send(
            {
                message: 'Produto deletado com sucesso.'
            }
        )

    });
});


app.listen(3000,()=>{
    console.log('server running');
})