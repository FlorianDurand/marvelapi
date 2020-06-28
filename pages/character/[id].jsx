import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import CryptoJS from 'crypto-js';

import { Container } from '@material-ui/core';

import Header from '@/components/Header';
import List from '@/components/List';

const { PRIV_KEY } = process.env;// next does not allowed process.env to be destructured
const { PUBLIC_KEY } = process.env;

const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

const characterPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState();
  const [loaded, setLoaded] = useState(false);
  const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

  const characters = async () => {
    const { data: { results } } = await (await fetch(url)).json();
    setCharacter(results[0]);
    setLoaded(true);
  };

  useEffect(() => {
    if (id) characters();
  }, [id]);

  if (!loaded) return <div>Loading.............</div>;

  const {
    name, description, comics, series, stories, thumbnail,
  } = character;

  return (
    <div>
      <Header name={name} />
      <Container>
        <h1>{name}</h1>
        <p>{description}</p>
        <img src={`${thumbnail.path}/portrait_medium.${thumbnail.extension}`} alt={name} />
        <List value={comics} name={name} type="comics" />
        <List value={series} name={name} type="series" />
        <List value={stories} name={name} type="stories" />
      </Container>
    </div>
  );
};

export default characterPage;
