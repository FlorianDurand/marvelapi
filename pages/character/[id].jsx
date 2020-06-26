import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import CryptoJS from 'crypto-js';

import Header from '../../components/Header';

const { PRIV_KEY } = process.env;
const { PUBLIC_KEY } = process.env;

const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

const characterPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState();
  const [loaded, setLoaded] = useState(false);
  const url = `http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

  const characters = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setCharacter(data.data.results[0]);
    setLoaded(true);
  };

  useEffect(() => {
    id ? characters() : null;
  }, [id]);

  if (!loaded) return <div>Loading.............</div>;
  console.log(character);
  const {
    name, description, comics, series, stories, thumbnail,
  } = character;
  return (
    <div>
      <Header />
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={`${thumbnail.path}/portrait_medium.${thumbnail.extension}`} alt={name} />
      <h2>
        Here you can find all then comics where
        {' '}
        {name}
        {' '}
        appears :
        {' '}
      </h2>
      {comics.items.map((comic, index) => (
        <li key={index}>
          <p>{comic.name}</p>
        </li>
      ))}
      <h2>
        Here you can find all the series where
        {' '}
        {name}
        {' '}
        appears :
        {' '}
      </h2>
      {series.items.map((serie, index) => (
        <li key={index}>
          <p>{serie.name}</p>
        </li>
      ))}
      <h2>
        Here you can find all the stories where
        {' '}
        {name}
        {' '}
        appears :
        {' '}
      </h2>
      {stories.items.map((storie, index) => (
        <li key={index}>
          <p>{storie.name}</p>
        </li>
      ))}
    </div>
  );
};

export default characterPage;
