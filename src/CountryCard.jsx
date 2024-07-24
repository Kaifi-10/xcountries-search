import React from 'react'
import styles from './Country.module.css'

function CountryCard({flagName, flagImage, alt}) {
  return (
    <div className={styles.card}>
        <img src={flagImage} alt={alt} width={64}/>
        <h2>{flagName}</h2>
    </div>
  )
}

export default CountryCard