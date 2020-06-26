import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import CryptoJS from 'crypto-js';

const PRIV_KEY = '1bc525f89c934f61fe4679ec7a96bdfa93277338';
const PUBLIC_KEY = 'facb99c203ad0c73c797d2b65c78b2c2';

const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

const Index = () => {
  const [people, setPeople] = useState();
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
      {people.data.results.map((character, index) => (
        <li key={index}>
          <Link href={`/character/${character.name}`}>
            <a>{character.name}</a>
          </Link>
        </li>
      ))}
    </div>
  );
};
export default Index;
