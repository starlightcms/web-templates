import "@starlightcms/react-sdk";
import {
  MediaField,
  VisualField,
  StringField,
  TextField,
  BooleanField,
} from "@starlightcms/next-sdk";

type HeaderSingleton = {
  logo: MediaField;
  tech: StringField;
  science: StringField;
  entertainment: StringField;
  categories: StringField;
  newsletter: StringField;
};

type AboutSingleton = {
  description: StringField;
  text: VisualField;
};

type Article = {
  title: StringField;
  image: MediaField;
  description: StringField;
  content: VisualField;
};

// TODO! SIGNUP SINGLETON

type FooterSingleton = {
  logo: MediaField;
  categories: StringField;
  tech: StringField;
  science: StringField;
  entertainment: StringField;
  starlight: StringField;
  website: StringField;
  features: StringField;
  knowledge_center: StringField;
  documentation: StringField;
  development_guide: StringField;
  sdk_docs: StringField;
};

declare module "@starlightcms/react-sdk" {
  export interface DefaultModelDefinition {
    articles: Article;
  }
}
