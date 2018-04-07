import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      searchResults: [
        //name: "Song 2",
        //artist: "Blur",
      //  album: "Self-titled"
      ],
      playlistName: `New Playlist`,
      playlistTracks: [`SexyBack`] //, 'Bootylicious', 'Daddy']
                     };


    //name: 'Thriller' , artist: 'MJ' , album: 'Me'
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

savePlaylist()
  {
    const uris = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, uris)
      .then(() =>
        {
          this.setState({ playlistTracks: [] })
        }
      );
  }


search(term){
  Spotify.search(term).then(results => this.setState({ searchResults: results }));
}


addTrack(track)
     {
       if(!this.state.playlistTracks.find(t => t.name === track.name))
       {
        let tempList = this.state.playlistTracks.slice();
         tempList.push(track);
         this.setState({playlistTracks: tempList});
     }
      }

removeTrack(track)
       {
         let tracks = this.state.playlistTracks
         tracks = tracks.filter(t => t.id !== track.id);
         this.setState({ playlistTracks: tracks });
       }

updatePlaylistName(name)
      {
        this.setState({playlistName: name});
       }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch = {this.search} />
          <div className="App-playlist">
            <SearchResults  searchResults = {this.state.searchResults} onAdd = {this.addTrack} />
            <Playlist playlistName = {this.state.playlistName}
                     playlistTracks = {this.state.playlistTracks}
                     onRemove = {this.state.removeTrack}
                     onNameChange = {this.updatePlaylistName}
                     onSave = {this.savePlaylist}
             />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
