import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import styles from './Country.module.css'

function Country() {
    const URL = "https://restcountries.com/v3.1/all"
    
    
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    useEffect( ()=>{
        const fetchData = async () =>{
            try {
                const res = await fetch(URL)
                const data = await res.json()
                setData(data)
                setFilterData(data)
            } catch (e) {
                console.error("Error fetching data: ",e);
            }
        }
        fetchData()
        console.log("country:",data)
    },[])
    
    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }

    useEffect(() =>{
        setFilterData(
            data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
        )
    },[search,data])

 

  return (
    <div className={styles.container}>
        <input type='text'
        placeholder="Search for a country..." 
        value={search} 
        onChange={handleSearch} 
        className={styles.searchBox}
        />
        <div className={styles.countryContainer}>
            
            {filterData.map( (country) =>(
                <CountryCard key={country.cca3} flagName={country.name.common} flagImage={country.flags.png} alt={country.flags.alt}/>
            ))}
            
        </div>

    </div>
    
  )
}

export default Country