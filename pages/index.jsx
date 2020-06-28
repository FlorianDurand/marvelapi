import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import CryptoJS from 'crypto-js';

import {
  AppBar, Typography, InputBase, Toolbar, GridList, GridListTileBar, GridListTile,
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

// material UI Template
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '65%',
    minHeight: '95vh',
    overflow: 'visible',
  },
  loading: {
    width: '100%',
    flexGrow: 2,
  },
}));

const { PRIV_KEY } = process.env;// next does not allowed process.env to be destructured
const { PUBLIC_KEY } = process.env;

const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
let offset = 0;
let url = `https://gateway.marvel.com/v1/public/characters?offset=${offset}ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [people, setPeople] = useState([]);
  const [filtered, setFiltered] = useState();
  const [update, setUpdate] = useState();
  let itemsToShow;

  function useHookWithRefCallback() {
    const ref = useRef(null);
    const setRef = useCallback((node) => {
      ref.current = node;

      const observer = new IntersectionObserver(((observables) => {
        observables.forEach((observable) => {
          if (observable.intersectionRatio > 0.5) {
            offset += 20;
            url = `https://gateway.marvel.com/v1/public/characters?offset=${offset}ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
            setUpdate(offset);
          }
        });
      }), { threshold: [0.5] });

      observer.observe(ref.current);
    }, []);

    return [setRef];
  }

  const [loader] = useHookWithRefCallback();

  const characters = async () => {
    const { data: { results } } = await (await fetch(url)).json();
    setPeople([...people, ...results]);
    setLoaded(true);
  };

  useEffect(() => {
    characters();
  }, [update]);
  const classes = useStyles();

  if (!loaded) return <div>Loading.............</div>;

  function handleSearchChange({ target: { value } }) {
    setFiltered(value
      ? people.filter((item) => {
        const lc = item.name.toLowerCase();
        const filter = value.toLowerCase();

        return lc.includes(filter);
      })
      : false);
  }
  if (filtered) itemsToShow = filtered; else itemsToShow = people;
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h3" noWrap>
            Marvel&apos;s characters
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Filter....."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.list}>
        <GridList cellHeight={250} className={classes.gridList} cols={3}>
          {itemsToShow.map((character, index) => (
            <GridListTile key={index}>
              <Link href={`/character/${character.id}`}>
                <a>
                  <img src={`${character.thumbnail.path}/landscape_incredible.${character.thumbnail.extension}`} alt={character.name} />
                  <GridListTileBar title={character.name} />
                </a>
              </Link>
            </GridListTile>
          ))}
        </GridList>
      </div>

      <div ref={loader} className={classes.loading}>Loading...</div>
    </div>
  );
};
export default Index;
