# Landing Page Boilerplate

This is a landing page boilerplate template, which includes a pre-configured [Starlight SDK](https://react.sdk.starlight.sh/)
client, a functional single-page layout with header and footer menus, mobile-first styles using Bootstrap and a few
pre-created sections that show you how to request Starlight content using the SDK client.

This template is part of the [Web Templates](https://github.com/starlightcms/web-templates) repository, a collection of 
open-source starter templates for web applications created by the [Starlight](https://www.starlight.sh/) team.

## Using this template

The easiest way to bootstrap this template is by using the Starlight CLI:

```shell
npx @starlightcms/cli create landing-page-typescript
```

The CLI will clone this template locally and set up the Starlight SDK for you.

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
[Button](https://react-bootstrap.github.io/docs/components/buttons),
[Carousel](https://react-bootstrap.github.io/docs/components/carousel), among others.

An SCSS file was created in `src/styles/customBootstrap.scss`, in which we import Bootstrap to add custom variables and
edit existing ones in its environment, namely colors, font sizes and margin/padding sizes. Some components and sections
also have their own SCSS files, to add specific styles that aren't possible through Bootstrap.

##### Colors

A few colors were added in the `customBootstrap.scss` file: some "Brand" colors (a main color based on Bootstrap's
Indigo colors) and 3 Gray colors. If you want to change or add colors, just modify the `$custom-colors` map.

##### Other variables

A few margin and padding sizes were also added in `customBootstrap.scss`, along with a new font size. In the same vein 
as the colors, if you want to add sizes or other variables, just modify the maps provided or create a new one, merging
it with Bootstrap using the `map-merge` function.

### Sections

This template is composed of a single page divided into sections.

#### Hero 

The topmost component of the page with basic information, introducing the website with a few short texts, buttons and an
image.

Component file: [src/sections/Hero/index.tsx](src/sections/Hero/index.tsx)

#### Clients

Renders the client logos. If the logos don't fit the browser window, it renders a customized
[Bootstrap Carousel](https://react-bootstrap.github.io/docs/components/carousel) that cycles around to show all of them.

Component file: [src/sections/Clients/index.tsx](src/sections/Clients/index.tsx)

#### FeaturesRight

Renders the first details and information on the page. It has an image, a title, some text and 2 (borderless)
[Cards](#card). It is named as such because the information will be displayed on the right part of the screen while
on desktop. In smaller pages the image will simply be above the texts.

Component file: [src/sections/FeaturesRight/index.tsx](src/sections/FeaturesRight/index.tsx)

#### FeatureCards

Renders some more details and information on the page using three bordered [Cards](#card).

Component file: [src/sections/FeatureCards/index.tsx](src/sections/FeatureCards/index.tsx)

#### FeaturesLeft

Renders the last few details and information on the page. It is similar to [FeaturesRight](#featuresright), except
having 2 bordered [Cards](#card) (rather than having 3 borderless ones) and its information displayed on the left while
on desktop.

Component file: [src/sections/FeaturesLeft/index.tsx](src/sections/FeaturesLeft/index.tsx)

#### Pricing

Renders 3 [Plan](#plan) components with pricing and benefit information on payment plans for your app.

Component file: [src/sections/Pricing/index.tsx](src/sections/Pricing/index.tsx)

#### FAQ

Renders an FAQ using the [Bootstrap Accordion](https://react-bootstrap.github.io/docs/components/accordion) component.
Each item has a title (the question) and a description (the answer).

Component file: [src/sections/FAQ/index.tsx](src/sections/FAQ/index.tsx)

#### Testimonials

Renders 2 [Testimonial](#testimonial) components with testimonials from your app's clients.

Component file: [src/sections/Testimonials/index.tsx](src/sections/Testimonials/index.tsx)

#### Signup

Renders a signup (to newsletter) call to action, with an image, some text, an email input and a "Sign up" button.

Component file: [src/sections/Signup/index.tsx](src/sections/Signup/index.tsx)

### Components

There are reusable components in a few sections of this template.

#### Card

A custom Card component (i.e. not the standard [Bootstrap Card](https://react-bootstrap.github.io/docs/components/card))
to which you can send an icon, a title, a text description, a button label and a borderless boolean (defaulted as false)
as props.

Component file: [src/components/Card/index.tsx](src/components/Card/index.tsx)

#### Footer

A footer with the website logo, a set columns with navigation links and some credits/copyright information.

Component file: [src/components/Footer/index.tsx](src/components/Footer/index.tsx)

#### Header

A top-fixed header with a logo, a link list and a button list. On mobile, a "burger" icon is rendered, which allows the
user to open and close a mobile sidebar with the link and button lists.

Component file: [src/components/Header/index.tsx](src/components/Header/index.tsx)

#### Layout

The main website layout with its children inside a
[Bootstrap Container](https://react-bootstrap.github.io/docs/layout/grid/#container) component. The layout includes the
[Header](#header) and [Footer](#footer) assets.

Component file: [src/components/Layout/index.tsx](src/components/Layout/index.tsx)

#### MobileProvider

Doesn't render anything, but wraps around the application and adds a hook so the developer can request the screen width
and a boolean stating if the screen is a mobile screen (under 768 pixels) or not. Used by the [Clients](#clients)
section.

Component file: [src/components/MobileProvider/index.tsx](src/components/MobileProvider/index.tsx)

#### Plan

A Card-like component with payment plans for your website. As props, you can send a title, a description, a list of
features (strings), a signup link and a boolean that defines the most popular plan (with a different border color and
a [Bootstrap Badge](https://react-bootstrap.github.io/docs/components/badge)).

Component file: [src/components/Plan/index.tsx](src/components/Plan/index.tsx)

#### Testimonial

A Card-like component with testimonials from your website's users. As props, you can send text (the testimonial), the
person's icon, their name and their job information (company and position).

Component file: [src/components/Testimonial/index.tsx](src/components/Testimonial/index.tsx)