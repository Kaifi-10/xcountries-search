import React, { useEffect, useState } from 'react'
import './Country.css'

function Country() {
    const URL = "https://restcountries.com/v3.1/all"
    
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL)
                const data = await res.json()
                setData(data)
                setFilterData(data)
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        }
        fetchData()
    }, [])
    
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase()
        setSearch(searchTerm)
        
       
        const filtered = data.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm)
        )
        setFilterData(filtered)
    }
    
    const CountryCard = ({ flagName, flagImage, alt }) => {
        return (
            <div className="countryCard">  
                <img src={flagImage} alt={alt} />
                <h2>{flagName}</h2>
            </div>
        )
    }
    
    return (
        <div className="container">  
            <input 
                type='text'
                placeholder="Search for a country..." 
                value={search} 
                onChange={handleSearch} 
                className="searchBox"  
            />
            <div className="countryContainer">  
                {filterData.map((country) => (
                    <CountryCard 
                        key={country.cca3} 
                        flagName={country.name.common} 
                        flagImage={country.flags.png} 
                        alt={country.flags.alt}
                    />
                ))}
            </div>
        </div>
    )
}

export default Country