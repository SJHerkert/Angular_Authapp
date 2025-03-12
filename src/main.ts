import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AuthService, provideAuth0 } from '@auth0/auth0-angular';
import { AuthService as CustomAuthService } from './app/services/auth.service';
import { AppRoutingModule, routes } from './app/app.routes';
import { RouterModule, provideRouter } from '@angular/router';




bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [ 
    provideAuth0({
      domain: 'dev-aatwfgws2rf2xof2.eu.auth0.com',
      clientId: 'sq1KG865zPgcrTLb5jR7oqD6YpZlO20k',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },      
    }),  
    provideRouter(routes),
    CustomAuthService,
  ],
  
}).catch((err) => console.error(err));