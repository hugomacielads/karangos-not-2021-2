/*

    Esta prova consiste em acrescentar um novo componente/página ao projeto Karangos.

    1. Copie este arquivo para a pasta src/routed.

    2. Copie o arquivo "some-cars.png" para a pasta src.

    3. Altere o arquivo "Apps.js" e adicione um novo Route, com o valor path="/". Assegure-se de que esse novo Route seja POSICIONADO ANTES de todos os outros. Faça com que o componente Startpage seja carregado pelo novo Route. Dessa forma, o componente será exibido logo no início.

    4. No componente Startpage, crie uma variável de estado de objeto contendo duas            propriedades:
        - about (valor inicial: string vazia)
        - figVisible (valor inicial: false)
    Crie também as respectivas variáveis avulsas usando desestruturação.
    
    5. Recupere as informações de https://api.faustocintra.com.br/about/1 e armazene-as na
       propriedade da variável de estado "about".

    6. Faça as modificações necessárias na tag <img> para que a imagem "some-cars.png" seja exibida.

    7. Adicione um componente Toolbar imediatamente antes da div com a imagem.

    8. Dentro da Toolbar, adicione um botão com as seguintes props:
        - cor: secondary
        - variante: contained
        - texto interno: Surpresa!

    9. Ao clicar no botão criado no passo anterior, a propriedade da variável de estado
    "figVisible" deve inverter seu valor (ou seja, de true para false ou de false para true).
    Dessa forma, a imagem da div logo abaixo será exibida se estiver oculta, e será ocutada 
    se estiver sendo exibida. Veja as imagens RESULTADO1.png e RESULTADOO2.png para referência.

    10. Aplique as classes de estilo definidas em useStyles nos lugares apropriados.

    10. Coloque os arquivos "App.js" e "Startpage.js" em um ZIP para fazer a entrega da prova.

*/

import React from 'react'
import axios from 'axios'

import { makeStyles } from '@mui/styles'
import FiguraCarros from '../some-cars.png'
import { Toolbar, Button } from '@mui/material'

const useStyles = makeStyles({
    figura: {
        display: 'block',
        margin: '0 auto',
        transition: 'opacity 1s linear'
    },
    toolbar: {
        justifyContent: 'space-around'
    },
    div: {
        textAlign: 'center'
    }

})

export default function Startpage() {
    const classes = useStyles()

    // Criando variáveis de estado e as tornando avulsas com desestruturação.
    const [state, setState] = React.useState(() => ({
        about:"",
        figVisible:false
    }))

    const { about, figVisible } = state

    // Recuperando informações da API e armazenando na variável de estado "about."
    function getData(params = state){
        axios.get('https://api.faustocintra.com.br/about/1')
        .then(
            response => {
                setState({
                    ...params, 
                    about: response.data
            })
        })
    }

    // Renderizando os dados da API para serem exibidas no "about"
    React.useEffect(() =>{
        getData()
    }, [])

    // Função que permite que a Figura seja alternada a cada clique na ToolBar.
    function mostraFigura(){
        if (figVisible === false) {
            setState({...state, figVisible:true})
        } else {
            setState({...state, figVisible:false})
        }
    }    

    return (
        <>
            <h1>Sobre o projeto Karangos</h1>

            <div dangerouslySetInnerHTML={{__html: about.info}} />

            {/*
                Adicionando o ToolBar que será utilizado como botão para
                alternar entre a exibição ou não da Figura dos carros.          
            */}
            <Toolbar className={classes.toolbar}>

                <Button
                    color="secondary"
                    variant="contained"
                    onClick={mostraFigura}
                    >
                    Surpresa!
                </Button>
                
            </Toolbar>

            <div className={classes.div}>

                {/* Modificando o componente de imagem para some-cars.png */}
                <img 
                    src={FiguraCarros} 
                    className={classes.figura} 
                    style={{opacity: figVisible ? '1' : '0', height: figVisible ? '591px': '0'}} 
                />

            </div>
        </>
    )
}