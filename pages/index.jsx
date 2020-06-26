import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import CryptoJS from 'crypto-js';

const { PRIV_KEY } = process.env;
const { PUBLIC_KEY } = process.env;

const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

const Index = () => {
  const [people, setPeople] = useState({ data: { results: [] } });
  const characters = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setPeople(data);
  };
  useEffect(() => {
    characters();
  }, []);

  return (
    <div>
      <p>List of characters</p>
      {people.data.results.length === 0 ? 'loading....' : null}
      {people.data.results.map((character, index) => (
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
  );
};
export default Index;
