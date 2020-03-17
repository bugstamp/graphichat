// fix bug with react-facebook-login lib
export const fixReactFacebookLoginBug = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);
};
