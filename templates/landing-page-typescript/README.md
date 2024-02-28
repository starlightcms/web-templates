# Landing Page Boilerplate

This is a landing page boilerplate template, which includes a pre-configured [Starlight SDK](https://react.sdk.starlight.sh/)
client, a functional single-page layout with header and footer menus, mobile-first styles using Bootstrap and a few
pre-created sections that show you how to request Starlight content using the SDK client.

This template is part of the [Web Templates](https://github.com/starlightcms/web-templates) repository, a collection of 
open-source starter templates for web applications created by the [Starlight](https://www.starlight.sh/) team.

## Using this template

The easiest way to bootstrap this template is by using the Starlight CLI:

```shell
npx @starlightcms/cli create landing-page
```

The CLI will clone this template locally and set-up the Starlight SDK for you.

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Development

This template uses [Next.js](https://nextjs.org/) and was made in a way in which it's easy to remove any unwanted section
and add new ones.

### Styling

For its styling, this template uses Next.js' 
[CSS modules](https://nextjs.org/docs/pages/building-your-application/styling/css-modules#example),
[Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/), 
[React Bootstrap](https://react-bootstrap.github.io/docs/getting-started/introduction) and 
[SCSS](https://sass-lang.com/documentation/). 

#### Bootstrap

Inside its sections, this template uses a few React Bootstrap components, such as 
[Container](https://react-bootstrap.github.io/docs/layout/grid/#container),
[Accordion](https://react-bootstrap.github.io/docs/components/accordion),
[Button](https://react-bootstrap.github.io/docs/components/buttons)
and [Carousel](https://react-bootstrap.github.io/docs/components/carousel).

An SCSS file was created in `src/styles/customBootstrap.scss`, in which we import Bootstrap to add custom variables and
edit existing ones in its environment, namely colors, font sizes and margin/padding sizes.

##### Colors

A few colors were added in the `customBootstrap.scss` file: some "Brand" colors (a main color based on Bootstrap's
Indigo colors) and 3 Gray colors. If you want to change or add colors, just modify the `$custom-colors` map.

##### Other variables

A few margin and padding sizes were also added in `customBootstrap.scss`, along with a new font size. In the same vein 
as the colors, if you want to add sizes or other variables, just modify the maps provided or create a new one, merging
it with Bootstrap using the `map-merge` function.

### Sections

TODO!
