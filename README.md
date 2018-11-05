# Oskari frontend Paikkatietoikkuna

These are bundles for kartta.paikkatietoikkuna.fi

## Setup

The application build process assumes that this repository, the main oskari-frontend repository, and oskari-frontend-contrib are located side by side on your filesystem.

## Building Paikkis

 Check out the right branches in the above repos and make sure you have run `npm install` in all three (this one included). Then you can build the app with `npm run build -- --env.appdef=1.48:applications/paikkatietoikkuna.fi`. The output will be under `dist/`. See the main [oskari-frontend repo](https://github.com/oskariorg/oskari-frontend#readme) for detailed instructions about the build parameters.
 