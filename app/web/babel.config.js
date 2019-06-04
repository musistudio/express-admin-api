module.exports = {
  presets: ["@vue/app"],
  plugins: [
    // 按需引入ant-design-vue
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
};
