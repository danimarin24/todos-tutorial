const config = {
  appName: "Supabase Todos App",
  appDescription:
    "Supabase Todos App is a full-stack app that uses Supabase for the backend and React for the frontend.",
  domainName:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://localhost:3000",
};

export default config;
