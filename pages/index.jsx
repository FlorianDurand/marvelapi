import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import CryptoJS from 'crypto-js';

import styles from './Index.module.scss';

const { PRIV_KEY } = process.env;
const { PUBLIC_KEY } = process.env;

const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
let offset = 0;
let url = `http://gateway.marvel.com/v1/public/characters?offset=${offset}ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [people, setPeople] = useState();
  const [filtered, setFiltered] = useState(Array);

  const handleScroll = () => {
    const scroll = document.getElementById('blue').getBoundingClientRect();
    if (scroll.bottom < scroll.height) {
      offset += 20;
      url = `http://gateway.marvel.com/v1/public/characters?offset=${offset}ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
      console.log(url);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const characters = async () => {
    const { data: { results } } = await (await fetch(url)).json();
    setPeople(results);
    setLoaded(true);
  };
  useEffect(() => {
    characters();
  }, []);

  if (!loaded) return <div>Loading.............</div>;
  let itemsToShow = [];
  itemsToShow.push(...people);
  if (filtered.length >= 1) { itemsToShow = filtered; }

  function handleSearchChange({ target: { value } }) {
    setFiltered(value
      ? itemsToShow.filter((item) => {
        const lc = item.name.toLowerCase();
        const filter = value.toLowerCase();

        return lc.includes(filter);
      })
      : people);
  }

  return (
    <div>
      <div className={styles.header}>
        <p>List of characters</p>
        <input type="search" placeholder="Rechercher..." onChange={handleSearchChange} />
      </div>
      <div className={styles.list}>
        {itemsToShow.map((character, index) => (
          <li key={index}>
            <Link href={`/character/${character.id}`}>
              <a>
                <p>{character.name}</p>
                <img src={`${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`} alt="" />
              </a>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};
export default Index;
