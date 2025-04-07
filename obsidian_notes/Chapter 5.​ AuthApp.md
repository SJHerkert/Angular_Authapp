==5_AuthApp==

"In practically all the applications that we develop, we must provide the registration and user login functionality." -Victor Hugo Garcia

---
*Start date: 10.3.2025*

AuthO -*done*
Creating an Account -*done*
Our New App -*done*
AuthService -*done*
NavbarComponent -*done*
Routing -*done*
Auth0 Settings -*done*
Local Storage -*done*
Securing Routes -*done*
AuthGuard -*done*
Getting the User’s Profile -*done*

---

New app
Creating new project named authapp

Using powershell, or any other terminal than the angular cli inside workspace
set execution policies to access commands properly
next brows to the folder you want to create your new authapp to, in this case c:/personaldevprojects/angular

ng new authapp

new app created
next:
install bootstrap, jQuery, and popper

install bootstrap using npm
npm i bootstrap@5.3.3  

install jquery using npm
npm install jquery --save

install popper
npm install popper.js --save
-- in tutorial this is depreciated version-heres is new
npm i @popperjs/core

install authO

npm install --save auth0-js

PS C:\PersonalDevProjects\Angular\authapp> npm install --save auth0-js
npm warn deprecated superagent@7.1.6: Please upgrade to v9.0.0+ as we have fixed a public vulnerability with formidable dependency. Note that v9.0.0+ requires Node.js v14.18.0+. See https://github.com/ladjs/superagent/pull/1800 for insight. This project is supported and maintained by the team at Forward Email @ https://forwardemail.net

added 21 packages, and audited 961 packages in 4s

160 packages are looking for funding
  run `npm fund` for details
->
npm install superagent@latest
->
npm list superagent
->
found 0 vulnerabilities
PS C:\PersonalDevProjects\Angular\authapp> npm list superagent
authapp@0.0.0 C:\PersonalDevProjects\Angular\authapp
├─┬ auth0-js@9.28.0
│ └── superagent@7.1.6
└── superagent@10.1.1
->
 npm install auth0-js@latest
 ->
 up to date, audited 964 packages in 3s
 ->
  node -v
  ->
  v22.14.0

Will leave the vulnerability as is for now.

---


COPILOT CHAT:
hmm, i have the latest tstable node, v22.14.0, this baffles me if i have the latest autho package installed, then note that update the superagent, but it still uses the old version superagent, why

Great observation, Simon! The reason you're seeing the older version of `superagent` still being used is because of **nested dependencies**. Here's how it works:

- When you installed `auth0-js@latest`, it brought its own set of dependencies, including `superagent@7.1.6`. Even though you have `superagent@10.1.1` installed at the root of your project, `auth0-js` is still relying on its own specific version, which is `7.1.6`. This happens because every package can define its own dependencies, and npm installs those separately under `node_modules` unless there's a direct match with your root-level dependency.
    

To address this:

1. **Check if** `auth0-js` **Supports the Latest** `superagent`**:** It’s possible that `auth0-js@9.28.0` has not yet updated its internal dependencies to use `superagent@10.x`. Unfortunately, this depends on the maintainers of `auth0-js`.
    
2. **Force Resolution of** `superagent`**:** You can attempt to override the nested dependency by adding a `resolutions` field to your `package.json`. Here’s how:
    
    json
    
    ```
    {
      "resolutions": {
        "superagent": "^10.1.1"
      }
    }
    ```
    
    After adding this, run:
    
    bash
    
    ```
    npm install
    ```
    
    Note: This works best with `yarn`, but there’s also an npm equivalent called `overrides` (available in npm v8.3.0+). For npm, add this instead:
    
    json
    
    ```
    {
      "overrides": {
        "superagent": "^10.1.1"
      }
    }
    ```
    
3. **Monitor Updates:** Keep an eye on the release notes or GitHub repository for `auth0-js`. If the maintainers update its dependencies to use `superagent@10.x`, you can simply update to the latest `auth0-js` version when it's available.
---
angular.json, corresponding references in the scripts array.

"scripts": [    "node_modules/popper.js/dist/umd/popper.min.js",    "node_modules/jquery/dist/jquery.slim.min.js",    "node_modules/bootstrap/dist/js/bootstrap.min.js",    
"node_modules/auth0-js/dist/auth0.js"
]

---

AuthService

->
In authO use quickstart guide
->
install auth0 angular SDK

(The SDK's idea -> login/logout handled @ auth0 endpoint, and then user is returned with tokens to their page, in this tutorial im assuming we're building a local login forms, and then that will talk with the auth0= service)

npm install @auth0/auth0-angular

Register and providing Auth0

npm i --save-dev @types/auth0-js

(error in importing auth0 in auth.service.ts ,due to some file declarations probably, this fixed the issue, probably added some line in the json files. 

At current moment i have both the jauth and auth0 sdk installed, lets see how this goes.

Navbar, lets create the buttons for login and logout(and perhaps more)
Everythings a component, we create the component

ng g c components/navbar

and the following:
ng g c components/home
ng g c components/about
ng g c components/private

Next is routing:

in app.routes.ts, a typo the const was not export const, so it never was exported to routes, as in in app.config.ts i import the routes but it cannot do anything with it as its just declared.

---

Auth0

Issues: Null error in chrome, in debug, no error in terminal or cli. Solution:

main.ts

From->:

`import { bootstrapApplication, BrowserModule } from '@angular/platform-browser'; import { appConfig } from './app/app.config'; import { AppComponent } from './app/app.component'; import { AuthService, provideAuth0 } from '@auth0/auth0-angular'; import { AppRoutingModule } from './app/app.routes'; import { RouterModule } from '@angular/router'; bootstrapApplication(AppComponent, { ...appConfig, providers: [ provideAuth0({ domain: 'dev-aatwfgws2rf2xof2.eu.auth0.com', clientId: 'sq1KG865zPgcrTLb5jR7oqD6YpZlO20k', authorizationParams: { redirect_uri: window.location.origin, }, }), ], imports: [ RouterModule, ], }).catch((err) => console.error(err));`

To->

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideRouter, Routes } from '@angular/router';

// Define your routes
const routes: Routes = [
  { path: '', component: HomeComponent }, // Replace HomeComponent with your actual component
  { path: 'callback', component: CallbackComponent }, // Replace CallbackComponent with your actual callback handler
];

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
    provideRouter(routes), // Use provideRouter to set up your application's routes
  ],
}).catch((err) => console.

---

In the tutorial the writer has provided the methods for auth, but in other case i can also use the auth0 SDK that has all methods for auth. Which is better, probaly the SDK, from security, mainetenance, and efficiency aspect.

---

Local Storage

"With these modifications made, our application will keep the session status started even when we refresh the page.

It is debatable if it is a good practice to keep variables in localStorage. A more secure alternative would be to perform the session management in the backend, for example, through a service developed in NodeJ"

"After logging in, we can see how the variables are stored in the localStorage using the Google developer tools"

---

Securing Routes

using isAuthenicated() function from auth.service.ts to define if some links are visible, ngIf in .html, 

->AuthGuard
ng g guard services/auth

using authGuard functions to validate if user authenticated then route is possible for user.

---

Checking the auth.guard.ts, callbacl.component.ts, and the auth.service.ts code to match with the tutorial. -> In tutorial the auth.guard.ts has extra functions, it has been manually set to include some methods, by installing the authGuard using the terminal.

I'm leaving the ts file as is, as it seems to be working In the tutorial many methods are created manually and then  wrapped in a component and then this component is used in other parts. I think this is just to show the way to write the code yourself.
-> modified to fit the tutorial code, as when clicking the private link, a token error arised.
->Note: In the tutorial same naming is used as other third party auth= namings, so check for dubbel names as well.

"NoteThe route guards are only for the UI. They do not provide protection against access to an API. We must always force authentication and authorization in our APIs."

[What is User Authentication, and Why is it Important? - GeeksforGeeks](https://www.geeksforgeeks.org/what-is-user-authentication-and-why-is-it-important/)

[What is Authentication? | IBM](https://www.ibm.com/think/topics/authentication)

"Authentication processes can also confirm the identities of nonhuman users such as servers, web applications and other machines and workloads."

---

Summary:
"In this chapter, we have seen how to use auth0 to add authentication and authorization to our application. Although auth0 has a cost, it is well worth it if we take into account the robustness and security, as well as saving time by avoiding writing large amounts of code. In addition, we have obtained other tools such as sandbox, administration board, etc. We have thus acquired a fantastic tool for our arsenal as developers. And we have not seen anything yet. In the next chapters, we will develop applications with complex layouts, which interact with APIs to perform CRUD operations." - Victor Hugo Garcia

---
Getting the User's profile

Ideas:
It would be easier to use the auth0 SDK stuff, tutorial is based on old version of angular, and based on non stand-alone setting, in auth0 docs using the AuthService and its modern implementations perhaps have easier ways to adapt to a new app.

The tutorial code has some bugs, perhaps the creator has tried to create a bigger package by deliberately introducing errors, or little things? So the reader will have to expose him/herself to the debugging of the code?

