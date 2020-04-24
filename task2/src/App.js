import React from 'react';
import UserTable from './components/userTable';
import AlbumTable from './components/albumTable';
import PhotosGallery from './components/photoGallery/photoGallery';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import Header from './components/header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <Router>
      <Header />
      <div id='mainSheet'>
        <Switch>
          <Route path="/" exact strict render={props => <UserTable {...props} />} />
          <Route path="/albums/" exact strict render={props => <AlbumTable {...props} />} />
          <Route path="/albums/photos/" exact strict render={props => <PhotosGallery {...props} />} />
          <Route
            path="*"
            render={props => (
              <NotFoundPage
                errorText="Страница не найдена"
                errorCaption="404"
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
