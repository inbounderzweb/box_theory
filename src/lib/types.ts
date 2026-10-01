export type NavItem = {
  label: string;
  href: string;
};

export type Capability = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type WhyItem = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type Industry = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type ProcessStep = {
  id: string;
  step: string;
  title: string;
  description: string;
};

export type Solution = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type FutureItem = {
  id: string;
  title: string;
  description: string;
};

export type ServiceDetail = {
  slug: string;
  title: string;
  shortDescription: string;
  heroDescription: string;
  whatItIncludes: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  href: string;
};

export type MarqueeWord = {
  text: string;
};
