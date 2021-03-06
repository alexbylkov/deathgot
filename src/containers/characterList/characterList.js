import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {characters, characterDelete} from '../../redux/actions/characterList'
import {characterFormChange} from '../../redux/actions/characterForm'
import CharactersTable from '../../components/charactersTable'
import {Input} from 'antd'
import AltMassage from '../../components/UI/altMessage'
import Spinner from '../../components/UI/spinner'

const CharacterList = ({characters, list, characterDelete, characterFormChange, loading}) => {
    useEffect(() => {characters()},[characters])
    const [search, setSearch] = useState('')

    const changeSearch = value => list.filter(({id, ...item}) => {
        let arr = []
        const itemKeys = Object.keys(item)
        let chekItem = false
        itemKeys.forEach(key => arr.push(item[key].toLowerCase().indexOf(value.toLowerCase())))
        arr.forEach(arrItem => arrItem > -1 ? chekItem = true : null)
        return chekItem ? {id, ...item} : null
    })

    return (
        loading ? 
        <Spinner/> :
        list === null ?
        null :
        list.length ?
        <>
            <Input.Search
            placeholder="Введите поисковый запрос"
            onChange={e => setSearch(e.target.value)}
            style={{ width: 300 }}
            />
            <CharactersTable 
            data={changeSearch(search)} 
            characterDelete={characterDelete} 
            characterFormChange={characterFormChange} />
        </> : 
        <AltMassage/>
    )
}

const mapStateToProps = state => {
	return {
        list: state.characterList.list,
        loading: state.characterList.loading
	}
}

export default connect(mapStateToProps, {characters, characterDelete, characterFormChange})(CharacterList)