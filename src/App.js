import url from 'url';

import React, { Component } from 'react';
import Player from './Player';
import './App.css';

import load_files from './load_files';
import settings from './settings';

class App extends Component {
  constructor() {
    super();
    this.state = {
      song_src: null,
      files: []
    };

    settings((err, conf) => {
      if (err) {
        return console.log(err);
      }
      load_files(conf.song_root, (err, files) => {
        this.setState({ files: files });
        this.onPlayerNext();
      });
    });


    this.history = [];
  }
  onSongDone(src) {
    this.onPlayerNext();
  }
  onPlayerNext() {
    if (this.state.song_src) {
      this.history.push(this.state.song_src);
    }

    var song;
    do {
      song = this.state.files[Math.floor(Math.random() * this.state.files.length)];
    } while (this.history.length > 0 && this.history[history.length - 1] === song);

    this.setState({
      song_src: song
    });
  }
  onPlayerPrev() {
    this.setState({
      song_src: this.history.pop()
    });
  }
  render() {
    var current_song;
    if (this.state.song_src) {
      var path_parts = url.parse(this.state.song_src).path.split('/');
      current_song = decodeURIComponent(path_parts[path_parts.length - 1]);
    }
    return (
      <div className="app">
        <div className="title">Music Box</div>
        <Player
          src={this.state.song_src}
          onDone={this.onSongDone.bind(this)}
          onNext={this.onPlayerNext.bind(this)}
          onPrev={this.onPlayerPrev.bind(this)}
        />
        <div className="current-song">{current_song}</div>
      </div>
    );
  }
}

export default App;
