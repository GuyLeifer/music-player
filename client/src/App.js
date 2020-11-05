import React from 'react';
import './App.css';

//packages
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//components
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import HomePage from './components/HomePage';
import About from './components/about/About';
import Account from './components/account/Account';
import Footer from './components/footer/Footer';
import GenericNotFound from './components/genericNotFound/GenericNotFound';

import TopSongs from './components/songs/TopSongs';
import TopArtists from './components/artists/TopArtists';
import TopAlbums from './components/albums/TopAlbums';
import TopPlaylists from './components/playlists/TopPlaylists';

import SongId from './components/songs/SongId';
import ArtistId from './components/artists/ArtistId';
import AlbumId from './components/albums/AlbumId';
import PlaylistId from './components/playlists/PlaylistId';
import UserId from'./components/users/UserId';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Header />
        <Switch>
          <Route path="/" exact component = {HomePage} />
          <Route path="/about" exact component = {About} />
          <Route path="/account" exact component = {Account} />
          <Route path="/top_songs" exact component = {TopSongs} />
          <Route path="/top_artists" exact component = {TopArtists} />
          <Route path="/top_albums" exact component = {TopAlbums} />
          <Route path="/top_playlists" exact component = {TopPlaylists} />
          <Route path="/artist/:id" component = {ArtistId}/>
          <Route path="/album/:id" component = {AlbumId}/>
          <Route path="/song/:id" component = {SongId}/>
          <Route path="/playlist/:id" exact component = {PlaylistId}/>
          <Route path="/user/:id" component = {UserId}/>
          <Route path='*' exact={true} status={404} component={GenericNotFound}/>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
