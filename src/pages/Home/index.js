import React, {useEffect, useState} from 'react'
import OpenNotificationWithIcon from '../../components/Notificacao'
import 'antd/dist/antd.css';
import api from '../../services/api';
import Pagination from 'react-js-pagination'
import Lixeira from "../../assets/lixeira.svg";
import Editar from "../../assets/editar.svg";
import Aprovar from "../../assets/aprovar.svg";
import Cancelar from "../../assets/cancelar.svg";
import PrevPagination from "../../assets/prev-pagination.svg";
import NextPagination from "../../assets/next-pagination.svg";
import { ContainerCadGames, ContainerListaGames, ButtonCadastro, ConteudoGames, InputEdit} from './styles'
import'./styles.css';

function Home() {

  const [dadosForm, setDadosForm] = useState({descricao:''})
  const [gamesList, setGamesList] = useState([])
  const [descricaoEdit, setDescricaoEdit] = useState('')
  const [descricaoSelected, setDescricaoSelected] = useState('')

  const [paginaAtual, setPaginaAtual] = useState(1)
  const [limite] = useState(7)
  const [total, setTotal] = useState(0)

  useEffect(()=>{
    getDados(1) 
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 

  async function getDados(pagina){

    const offset = pagina === 1 ? 0 : (pagina - 1) * limite
   
    await api.get(`/games/listar/${limite}/${offset}`)
    .then(resp => {
      setGamesList(resp.data.data)
      setTotal(Number(resp.data.totalCount))
    })
    .catch(err => {
      console.log(err)
    })
  }

  function carregarPaginaNova (pagina){
    setPaginaAtual(pagina)
    getDados(pagina)
  }

  async function handleSave(){
   
    await api.post(`/games/cadastrar`, dadosForm)
    .then(resp => {

        if(resp.status === 200){
          OpenNotificationWithIcon('success',`${resp.data.msg}`,'')
          setDadosForm({descricao:''})
          getDados()
        }else{
          OpenNotificationWithIcon('error','Erro ao cadastrar!','')
        }
     

    })
    .catch(err => {
      console.log(err)
    })
  }

  async function handleDelete(id){
   
    await api.delete(`/games/excluir/${id}`)
    .then(resp => {

      if(resp.status === 200){
        OpenNotificationWithIcon('success',`${resp.data.msg}`,'')
        getDados()
      }else{
        OpenNotificationWithIcon('error','Erro ao tentar excluir!','')
      }
     

    })
    .catch(err => {
      console.log(err)
    })
  }

  function handleEdit(id, descricaoDefault){   
    setDescricaoSelected(id)    
    setDescricaoEdit(descricaoDefault)
  }

  async function handleApprove(){

    const data = {
        descricao: descricaoEdit
    }
   
    await api.put(`/games/editar/${descricaoSelected}`, data )
    .then(resp => {

      if(resp.status === 200){
        OpenNotificationWithIcon('success',`${resp.data.msg}`,'')
        getDados()
        setDescricaoSelected('')
        setDescricaoEdit('')
      }else{
        OpenNotificationWithIcon('error','Erro ao tentar atualizar!','')
      }

    

    })
    .catch(err => {
      console.log(err)
      
    })
  }

  function handleCancelEdit(event){
      setDescricaoSelected('')
      setDescricaoEdit('')
  }

  function handleChangeEdit(event){
    setDescricaoEdit(event.target.value)
  }

  function handleChange(event){
      setDadosForm({
        ...dadosForm,
        [event.target.name] : event.target.value
        
    })
  }

 


  return (

          <div className="container-fluid overflow-hidden">
            <div className="row">
              <ContainerCadGames className="col-xs-12 col-sm-12 col-md-12 col-lg-12">                
                  <input 
                      name='descricao'
                      type='text' 
                      placeholder='exemplo: Call of Duty'
                      value={dadosForm.descricao}
                      onChange={handleChange}
                  />
                  <ButtonCadastro onClick={handleSave}>Cadastrar</ButtonCadastro>     
              </ContainerCadGames>
            </div>

            <div className="row">
              <ContainerListaGames className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                {
                   gamesList !== undefined 
                    ?
                      gamesList.map((item,index) =>{
                            return(
                                    <ConteudoGames className="col-xs-12 col-sm-12 col-md-8 col-lg-8" key={index}>
                                     
                                     { descricaoSelected !== item.id 
                                      
                                       ? 
                                          <>
                                            <span>{item.descricao}</span>

                                            <div>                      
                                              <img src={Editar} alt="Editar" onClick={ () => handleEdit(item.id, item.descricao) }></img>
                                              <img src={Lixeira} alt="Excluir" onClick={ () => handleDelete(item.id) }></img>                 
                                            </div>

                                          </>
                                       : 

                                          <>
                                            <InputEdit 
                                                name='descricao'
                                                type='text' 
                                                placeholder=''
                                                value={descricaoEdit}
                                                onChange={handleChangeEdit}
                                               
                                            />

                                            <div>                      
                                              <img src={Aprovar} alt="Aprovar" onClick={ () => handleApprove(item.id) }></img>
                                              <img src={Cancelar} alt="Cancelar" onClick={ () => handleCancelEdit() }></img>                 
                                            </div>

                                          </>
                                     }
                                       

                                      
                                    
                                    </ConteudoGames>
                            )
                      })
                    : null
                }

                <Pagination
                  activePage={paginaAtual}
                  itemsCountPerPage={limite}
                  totalItemsCount={total}
                  pageRangeDisplayed={7}
                  hideFirstLastPages={true}
                  onChange={carregarPaginaNova}
                  prevPageText={<div className="prev-page"><img src={PrevPagination} alt="prev-page"/></div>}
                  nextPageText={<div className="next-page"><img src={NextPagination} alt="prev-page"/></div>}
                />
                               
              </ContainerListaGames>
            </div>
           
        </div>
  )
}

export default Home;