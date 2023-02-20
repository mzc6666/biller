/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-01-12 10:13:25
 * @LastEditors: mzc
 * @LastEditTime: 2023-01-12 14:20:17
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ['react-native-reanimated/plugin'],
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src',
            rootPathPrefix: '@/', // 使用 ~/  代替 ./src (~指向的就是src目录)
          },
        ],
      },
    ],
  ],
};
