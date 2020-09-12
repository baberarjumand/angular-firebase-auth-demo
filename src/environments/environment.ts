// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    authDomain: '<YOUR-PROJECT-ID>.firebaseapp.com',
    databaseURL: 'https://<YOUR-PROJECT-ID>.firebaseio.com',
    projectId: '<YOUR-PROJECT-ID>',
    storageBucket: '<YOUR-PROJECT-ID>.appspot.com',
    messagingSenderId: 'XXXXXXXXXXXX',
    appId: '1:XXXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXX',
    measurementId: 'G-XXXXXXXXXX',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
