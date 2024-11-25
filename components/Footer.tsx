export const Footer = () => {
  return (
    <footer className="bg-primary py-4 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p className="text-gray-200">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://danimarin.dev"
            className="text-blue-500 hover:text-blue-500/90 hover:underline"
          >
            Daniel Marín
          </a>
        </p>
        <p className="text-gray-200 mt-2">
          Thanks to{" "}
          <a
            href="https://www.youtube.com/watch?v=A6-56miVA_0"
            className="text-blue-500 hover:text-blue-500/90 hover:underline "
            target="_blank"
          >
            Jolly Coding
          </a>
        </p>
      </div>
    </footer>
  );
};
