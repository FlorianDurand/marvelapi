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
    const res = await fetch(url);
    const data = await res.json();
    setPeople(data);
    setLoaded(true);
  };
  useEffect(() => {
    characters();
  }, []);
  if (!loaded) return <div>Loading.............</div>;
  let itemsToShow = [];
  itemsToShow.push(...people.data.results);
  if (filtered.length >= 1) { itemsToShow = filtered; }
  return (
    <div>
      <div className={styles.header}>
        <p>List of characters</p>
        <input type="search" placeholder="Rechercher..." onChange={handleSearchChange} />
      </div>
      <div id="blue" className={styles.list}>
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

  function handleSearchChange(e) {
    let currentList = [];

    let newList = [];
    // If the search bar isn't empty
    if (e.target.value !== '') {
      currentList = itemsToShow;
      newList = currentList.filter((item) => {
        const lc = item.name.toLowerCase();
        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = people.data.results;
    }
    setFiltered(newList);
  }
};
export default Index;
