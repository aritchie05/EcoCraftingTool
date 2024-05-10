const fs = require('fs')

fs.readFile('src/index.html', 'utf8', (err, data) => {
  if (err) {
    return
  }

  const robotsContentValue = process.env.ROBOTS_TAG_VALUE;
  const newMetaTag = '<meta name="robots" content="' + robotsContentValue + '">'
  const result = data.replace(/<meta name="robots" content="all">/g, `<meta name="robots" content="${robotsContentValue}">`);

  fs.writeFile('src/index.html', result, 'utf8', (err) => {})
})
