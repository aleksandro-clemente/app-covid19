import React,{ memo, useState,useCallback, useEffect } from 'react';
import Api from '../../api';
import Board from './components/Board'
import Panel from './components/Panel'
import { ContainerStyled } from './style'

function Main(){
    const[data,setData] = useState({});
    const[country,setCountry] = useState('brazil')
    const updateAt = new Date().toLocaleDateString()
    const getCovidData = useCallback((country) =>{
        Api.getCountry(country)
        .then(data => setData(data))
    },[])

    useEffect(() =>{
        getCovidData(country)
    }, [getCovidData,country])

    const handleChange = ({ target}) =>{
        const country = target.value
        setCountry(country)
    }
    return(
        <div>
            <ContainerStyled>
                <div className="mb-2">
                    <Panel
                        data={data}
                        updateAt={updateAt}
                        onChange={handleChange}
                        country={country}
                        getCovidData={getCovidData}
                    />                 
                    <Board data={data} />
                </div>
            </ContainerStyled>
        </div>
    )
}
export default memo(Main)