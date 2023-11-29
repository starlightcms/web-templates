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

type HeaderSingleton = {
  logo: MediaField;
  button_label: StringField;
  link_1_label: StringField;
  link_2_label: StringField;
  link_3_label: StringField;
};

type HeroSingleton = {
  title: StringField;
  description: TextField;
  main_button_label: TextField;
  second_button_label: TextField;
  image: MediaField;
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

type FeatureCardsSingleton = {
  card_1_icon: MediaField;
  card_1_title: StringField;
  card_1_text: TextField;
  card_1_button: StringField;
  card_2_icon: MediaField;
  card_2_title: StringField;
  card_2_text: TextField;
  card_2_button: StringField;
  card_3_icon: MediaField;
  card_3_title: StringField;
  card_3_text: TextField;
  card_3_button: StringField;
};

type FeaturesLeftSingleton = {
  title: StringField;
  description: TextField;
  image: MediaField;
  card_1_title: StringField;
  card_1_text: TextField;
  card_1_button: StringField;
  card_2_title: StringField;
  card_2_text: TextField;
  card_2_button: StringField;
};

type PricingSingleton = {
  title: StringField;
  sign_up: StringField;
  plans: RelationField<Collection<Entry<Plan>>>;
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
  website_logo: MediaField;
  year: StringField;
  company_name: StringField;
  developed_by: StringField;
  starlight_logo: MediaField;
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
