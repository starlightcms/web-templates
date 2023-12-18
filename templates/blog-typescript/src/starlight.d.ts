import "@starlightcms/react-sdk";
import {
  MediaField,
  RelationField,
  VisualField,
  Collection,
  StringField,
  TextField,
  BooleanField,
  MediaObject,
} from "@starlightcms/next-sdk";

// TODO! REVIEW ALL THE TYPES
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

type FeaturesRightSingleton = {
  title: StringField;
  description: TextField;
  image: MediaField;
  card_1_icon: MediaField;
  card_1_text: TextField;
  card_2_icon: MediaField;
  card_2_text: TextField;
};

type FAQSingleton = {
  title: StringField;
  faq_items: RelationField<Collection<Entry<FAQItem>>>;
};

type FAQItem = {
  question: StringField;
  answer: TextField;
  slug: StringField;
};

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
