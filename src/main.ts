// import { bootstrapApplication } from '@angular/platform-browser';
// import { SearchMovieComponent } from './app/search-movie/search-movie.component';
// import { importProvidersFrom } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';

// bootstrapApplication(SearchMovieComponent, {
//   providers: [importProvidersFrom(ReactiveFormsModule)]
// }).catch(err => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { SearchMovieComponent } from './app/search-movie/search-movie.component';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(SearchMovieComponent, {
  providers: [importProvidersFrom(ReactiveFormsModule)]
}).catch(err => console.error(err));



