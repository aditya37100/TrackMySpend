import logo from "../assets/budgeting.gif";
export function FooterComponent() {
  return (
    <footer class="w-full bg-gray-50 dark:bg-gray-900 py-6 mt-[40 px]">
      <div className="max-w-6xl mx-auto px-4 text-center pt-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <a
            href="https://flowbite.com"
            className="inline-flex items-center mb-4 sm:mb-0"
          >
            <img
              src={logo}
              alt="Flowbite Logo"
              className=" w-12 h-12 mr-3"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TrackMySpend
            </span>
          </a>

          {/* Links */}
          <ul className="flex flex-wrap justify-center space-x-4">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Licensing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2025{" "}
          
            Made with ❤️ by <a href="https://github.com/Blitzkrieg28" className="hover:underline">Blitzkreig28</a>
          
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
