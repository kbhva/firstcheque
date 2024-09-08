interface navOptions {
    title: string;
    route: string;
  }
const withAuthOptions: navOptions[] = [
    { title: "Dashboard", route: "/" },
  { title: "Discover", route: "/discover" },
  { title: "ChatBot", route: "/chat" },
]
const withoutAuthOptions: navOptions[] = [
    { title: "Home", route: "/" },
  { title: "Discover", route: "/discover" },
]
export {withAuthOptions,withoutAuthOptions};

