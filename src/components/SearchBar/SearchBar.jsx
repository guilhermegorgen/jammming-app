import { useState, useCallback } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = (props) => {
    const [term, setTerm] = useState("");
    
    const handleTermChange = useCallback(({target}) => {
        setTerm(target.value);
    });

    const search = useCallback(() => {
        props.onSearch(term);
    }, [props.onSearch, term]);

    return (
        <>
            <div className={styles.form}>
                <input className={styles.inputText} onChange={handleTermChange} placeholder={term} />
                <button className={styles.inputSubmit} onClick={search}>
                    SEARCH
                </button>
            </div>
        </>
    );
}

export default SearchBar;