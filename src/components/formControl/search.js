import * as styles from './search.module.css'
import React from 'react'
import IMGS_URL from '../../config.json'
const { search, input, btn, icon } = styles

const Search = () => {


    return (
        <div className={search}>
            <input className={input}></input>
            <button className={btn}>
                <img className={icon} src={`$IMGS_URL/magnifier.svg`} />
            </button>
        </div>
    )
}

export default Search