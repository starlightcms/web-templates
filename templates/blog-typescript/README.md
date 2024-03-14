# Blog Boilerplate

This is a blog boilerplate template, which includes a pre-configured [Starlight SDK](https://react.sdk.starlight.sh/)
client, a functional layout with header and footer menus, mobile-first styles using Bootstrap and a few
pre-created pages and components that show you how to request Starlight content using the SDK client.

This template is part of the [Web Templates](https://github.com/starlightcms/web-templates) repository, a collection of 
open-source starter templates for web applications created by the [Starlight](https://www.starlight.sh/) team.

## Using this template

The easiest way to bootstrap this template is by using the Starlight CLI:

```shell
npx @starlightcms/cli create blog-typescript
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

This template uses [Next.js](https://nextjs.org/) and was made in a way in which it's easy to remove any unwanted page or section
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

A couple of SCSS files were created in `src/styles`, in which we import Bootstrap to add custom variables and edit
existing ones in its environment, such as colors, font sizes and margin/padding sizes. Some components and pages also
have their own SCSS files, to add specific styles that aren't possible through Bootstrap.

##### Colors

A few colors were added in the `customBootstrap.scss` file: some "Brand" primary and secondary colors - main colors
based on Bootstrap's Indigo and Pink colors, respectively. If you want to change or add colors, just modify the
`$custom-colors` map and/or the `variables.scss` file.

##### Other variables

A few margin and padding sizes were also added in `customBootstrap.scss`, along with a new font size and focus box
shadow colors. In the same vein  as the colors, if you want to add sizes or other variables, just modify the maps
provided or create a new one, merging it with Bootstrap using the `map-merge` function.

------ TODO ------ TALK ABOUT FOOTER AND HEADER?
------ TODO ------ RE-READ FROM HERE AND LINK COMPONENT SECTIONS!!!

### Pages

#### Home

The main page of the application containing links to various articles, with a Hero component displaying the featured
article and lists of other articles below (using FeaturedContent, ArticlesPage and PopularArticles components). This
also serves as the first index page of the list of all articles, with a PageSelector at the bottom. At the very end of
the page, above the footer, there is a Signup call to action component. 

Component file: [src/pages/index.tsx](src/pages/index.tsx)

#### Article

The page of a single article, containing its title, description, metadata (author and date), sharing buttons, the main
image and the article content. Next to and below the article content, there are lists of other articles 
(PopularArticles and FeaturedContent components).

Component file: [src/pages/article/\[slug\].tsx](src/pages/article/[slug].tsx)

#### Category home

The first index page of articles from a specific category. Similar to the [Home](#home) page, but with no featured
article.

Component file: [src/pages/\[category\].tsx](src/pages/[category].tsx)

#### Index page

Any index page of articles aside from the first one, either from a specific category or all the articles - the page's
logic will understand when a category is selected via the route (`/page/3` is the third index page of all articles,
while `/tech/3` is the third page of the tech category articles). Almost identical to the
[Category home](#category-home) page.

Component file: [src/pages/\[category\]/\[page\].tsx](src/pages/[category]/[page].tsx)

#### About

The page for the about section of the website. Simply displays the About singleton.

Component file: [src/pages/about/index.tsx](src/pages/about/index.tsx)

#### Not Found (404)

The "not found" page. Used when the user tries to access a page that doesn't exist. For instance, if there are only 3
pages of articles in the "tech" category, if a user tries to access page 4 (or beyond) via the URL, then they'll be
redirected to this page.

Component file: [src/pages/404.tsx](src/pages/404.tsx)

### Components

There are reusable components in a few pages of this template.

#### ArticlesPage

A page of articles (as Cards) with a small title label and a page selector at the bottom. Requires a label, a list of 
articles to be displayed, its category (being "page" or a category name), the current page number and the last page
number as props.

Component file: [src/components/ArticlesPage/index.tsx](src/components/ArticlesPage/index.tsx)

#### Card

A card that contains a post and its information. For its props, you can send an article, booleans for creating a "small"
and/or "horizontal" card and a number for the "post rank" among the popular posts (that appears on the top-left).

Component file: [src/components/Card/index.tsx](src/components/Card/index.tsx)

#### FeaturedContent

Renders 3 Cards as "featured content". It's supposed to be used in the home page and in the Article page.

Component file: [src/components/FeaturedContent/index.tsx](src/components/FeaturedContent/index.tsx)

#### Footer

A footer with the website logo, a set columns with navigation links and some credits/copyright information.

Component file: [src/components/Footer/index.tsx](src/components/Footer/index.tsx)

#### Header

A top-fixed header with a logo, a link list and a button list. On mobile, a "burger" icon is rendered, which allows the
user to open and close a mobile sidebar with the link and button lists.

Component file: [src/components/Header/index.tsx](src/components/Header/index.tsx)

#### Hero

The topmost component of the home page with the picture, title, description and information of the featured article.

Component file: [src/components/Hero/index.tsx](src/components/Hero/index.tsx)

#### Layout

The main website layout with the Header, Footer and Search components. Inside it, you should have the "Hero" content of
your page (the one with a colored background) and a <Main> tag that has the page content inside it.

Component file: [src/components/Layout/index.tsx](src/components/Layout/index.tsx)

#### Main

Renders the main content of the page (below the colored background) and places its children inside a Container
component.

Component file: [src/components/Main/index.tsx](src/components/Main/index.tsx)

#### PageSelector

A simple page selector to help users navigate between pages of articles. It is included only in the ArticlesPage
component. It receives a category name, the current page and the last page as props.

Component file: [src/components/PageSelector/index.tsx](src/components/PageSelector/index.tsx)

#### PopularArticles

A list of small Cards that will serve as a list of the most viewed articles. It receives a label (that will be rendered
at the top of the component) and the list of articles to be displayed.

Component file: [src/components/PopularArticles/index.tsx](src/components/PopularArticles/index.tsx)

#### Search

A search popup that lets the user search for a specific entry. It only receives an isOpen state and its setter as props.
This component is only used in the Header and has a few other subcomponents inside it.

Component file: [src/components/Search/index.tsx](src/components/Search/index.tsx)

#### SearchContext

A context to change and acquire the opened state of the Search popup. Used on the Header, the Search component and in
the Not Found page

Component file: [src/components/SearchContext/index.tsx](src/components/SearchContext/index.tsx)

#### Signup

A signup (to newsletter) call to action, with an image, some text, an email input and a "Sign up" button.

Component file: [src/components/Signup/index.tsx](src/components/Signup/index.tsx)

#### Title

Doesn't render anything, but simplifies the process of creating the page title and adds a suffix (" — Web Templates")
to all titles.

Component file: [src/components/Title/index.tsx](src/components/Title/index.tsx)