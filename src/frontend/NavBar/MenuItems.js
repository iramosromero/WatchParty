export const MenuItems = [
  {
    title: 'Home',
    url: '/',
    cName: 'nav-links',
  },
  {
    title: 'Sport',
    url: '/Sports',
    cName: 'nav-links',
  },
  {
    title: 'Chat',
    url: '/Chat',
    cName: 'nav-links',
    loginRequired: true,
  },
  {
    title: 'Forum',
    url: '/Forum',
    cName: 'nav-links',
    loginRequired: true,
  },
  {
    title: 'Sign in',
    url: '/sign-in',
    cName: 'nav-links',
    hideWhenLoggedIn: true,
  },
  {
    title: 'Sign out',
    url: '/sign-out',
    cName: 'nav-links',
    loginRequired: true,
  },
  {
    title: 'Sign up',
    url: '/sign-up',
    cName: 'nav-links',
    hideWhenLoggedIn: true,
  },
];

export default MenuItems;
