module.exports = {
  purge: ["./**/*.js"],
  theme: {
    extend: {
      spacing: {
        "50": "12.5rem",
        "80": "20rem",
        "96": "24rem",
        "116": "28rem",
        "128": "32rem",
      },
    },
  },
  variants: {
    backgroundColor: [
      "even",
      "responsive",
      "hover",
      "group-hover",
      "focus",
      "active",
    ],
    textColor: ["responsive", "hover", "group-hover", "focus", "active"],
    boxShadow: ["responsive", "hover", "group-hover", "focus", "active"],
    borderColor: ["group-hover", "hover", "focus"],
    opacity: [
      "responsive",
      "hover",
      "group-hover",
      "focus",
      "active",
      "group-focus",
    ],
    translate: ["responsive", "hover", "group-hover", "focus"],
    padding: ["responsive", "hover", "group-hover", "focus"],
    scale: ["responsive", "hover", "group-hover", "focus", "active"],
    display: ["responsive", "hover", "group-hover", "focus", "active"],
    rotate: ["responsive", "hover", "group-hover", "focus", "active"],
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/ui")],
};
