const imageContext = require.context(
  "../../../static/images",
  true,
  /^\.\/.*\.(jpe?g|png|gif)$/i
);

export class ImageContextValueConverter {
  toView(name) {
    const key = imageContext.keys().find(k => k.includes(name));
    return imageContext(key);
  }
}
