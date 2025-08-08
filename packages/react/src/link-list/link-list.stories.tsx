import type { Meta } from '@storybook/react';
import {
  UNSAFE_LinkList as LinkList,
  UNSAFE_LinkListItem as LinkListItem,
} from './link-list';

const meta: Meta<typeof LinkList> = {
  title: 'LinkListItemList',
  component: LinkList,

  tags: ['autodocs'],
};

export default meta;

export const Default = () => (
  <LinkList>
    <LinkListItem href="/">Home</LinkListItem>
    <LinkListItem href="/about">About</LinkListItem>
    <LinkListItem href="/services">Services</LinkListItem>
  </LinkList>
);

export const Download = () => (
  <LinkList>
    <LinkListItem download href="/">
      Medlemsvilkår
    </LinkListItem>
    <LinkListItem download href="/about">
      Samtykke
    </LinkListItem>
  </LinkList>
);
export const ExternalLinkListItems = () => (
  <LinkList>
    <LinkListItem href="https://www.example.com" isExternal>
      External LinkListItem
    </LinkListItem>
    <LinkListItem href="/internal-page">Internal LinkListItem</LinkListItem>
  </LinkList>
);

export const InMultipleColumns = () => (
  <LinkList className="md:grid-cols-2 lg:grid-cols-3">
    <LinkListItem href="/">Home</LinkListItem>
    <LinkListItem href="/about">About</LinkListItem>
    <LinkListItem href="/services">Services</LinkListItem>
    <LinkListItem href="/">Home</LinkListItem>
    <LinkListItem href="/about">About</LinkListItem>
    <LinkListItem href="/services">Services</LinkListItem>
    <LinkListItem href="/">Home</LinkListItem>
    <LinkListItem href="/about">About</LinkListItem>
    <LinkListItem href="/services">Services</LinkListItem>
  </LinkList>
);
