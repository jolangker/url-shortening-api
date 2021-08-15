module.exports = {
  mode: "jit",
  purge: ["index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif;",
      },
      colors: {
        mermaid: "#2acfcf",
        violet: "#3b3054",
        silver: "#bfbfbf",
        colorado: "#9e9aa7",
        witches: "#35323e",
        raisin: "#232127",
      },
      backgroundImage: (theme) => ({
        "shorten-mobile": "url('../assets/images/bg-shorten-mobile.svg')",
        "shorten-desktop": "url('../assets/images/bg-shorten-desktop.svg')",
        "boost-mobile": "url('../assets/images/bg-boost-mobile.svg')",
        "boost-desktop": "url('../assets/images/bg-boost-desktop.svg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
