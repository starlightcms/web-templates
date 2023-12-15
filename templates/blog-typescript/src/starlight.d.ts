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

// TODO! ALL THE TYPES
type HeaderSingleton = {
  logo: MediaField;
  tech: StringField;
  science: StringField;
  entertainment: StringField;
  categories: StringField;
  newsletter: StringField;
};

type Post = {
  title: StringField;
  image: MediaField;
  description: StringField;
  content: VisualField;
};

type ClientsSingleton = {
  label: TextField;
  client_logos: RelationField<Collection<MediaObject>>;
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

type Plan = {
  title: StringField;
  slug: StringField;
  description: TextField;
  most_popular: BooleanField;
  plan_items: VisualField;
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

type TestimonialsSingleton = {
  title: StringField;
  testimonials: RelationField<Collection<Entry<Testimonial>>>;
};

type Testimonial = {
  description: TextField;
  icon: MediaField;
  name: StringField;
  company: StringField;
  slug: StringField;
};

type SignupSingleton = {
  image: MediaField;
  title: StringField;
  description: TextField;
  email_placeholder: TextField;
  button_label: StringField;
  footnote: TextField;
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
    posts: Post;
  }
}
