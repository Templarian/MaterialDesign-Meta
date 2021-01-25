const util = require('@mdi/util')

const version = util.getVersion()
const meta = util.getMeta(true)

const iconIds = []
const icons = {
  iconIds,
  byIconId: {},
}

const authorIds = []
const authors = {
  authorIds,
  byAuthorId: {},
  byIconId: {},
}

const tagIds = []
const iconTags = {
  tagIds,
  byTagId: {},
  byIconId: {},
}

const aliasIds = []
const iconAliases = {
  aliasIds,
  byAliasId: {},
  byIconId: {},
}

function buildId(authorName) {
  return String(authorName ?? 'none')
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z0-9_-\s]/g, '')
    .replace(/\s+/g, '-')
}

meta.forEach((icon) => {
  const { name, path, author, tags, aliases } = icon
  const authorId = buildId(author)
  const iconId = String(name)

  // Setup path data
  iconIds.push(iconId)
  icons.byIconId[iconId] = path

  // Setup aliases
  if (Array.isArray(aliases)) {
    aliases.forEach((aliasId) => {
      aliasIds.push(aliasId)
      iconAliases.byAliasId[aliasId] = iconId
      iconAliases.byIconId[iconId] = {
        ...iconAliases.byIconId[iconId],
        [aliasId]: true,
      }
    })
  }

  // Setup tags
  if (Array.isArray(tags)) {
    tags.forEach((tagName) => {
      const tagId = buildId(tagName)

      // Ensure tagId is present in allIds
      if (!tagIds.some((i) => i === tagId)) {
        tagIds.push(tagId)
        iconTags.byTagId[tagId] = {
          name: String(tagName),
          icons: {},
        }
      }

      iconTags.byTagId[tagId].icons = {
        ...iconTags.byTagId[tagId].icons,
        [iconId]: true,
      }
      iconTags.byIconId[iconId] = {
        ...iconTags.byIconId[iconId],
        [tagId]: true,
      }
    })
  }

  // Setup author
  if (!authorIds.some((i) => i === authorId)) {
    authorIds.push(authorId)
    authors.byAuthorId[authorId] = {
      name: String(author),
      icons: {},
    }
  }
  // Append icon to existing author
  authors.byAuthorId[authorId].icons = {
    ...authors.byAuthorId[authorId].icons,
    [iconId]: true,
  }
  authors.byIconId[iconId] = authorId
})

const files = [
  {
    filename: 'icons',
    exportName: 'icons',
    data: icons,
  },
  {
    filename: 'authors',
    exportName: 'authors',
    data: authors,
  },
  {
    filename: 'icon-tags',
    exportName: 'iconTags',
    data: iconTags,
  },
  {
    filename: 'icon-aliases',
    exportName: 'iconAliases',
    data: iconAliases,
  },
]

const generateFile = (data, minify = false) => {
  const contents = JSON.stringify(data.data, null, minify ? null : 2)
  const filename = `./json/${data.filename}${minify ? '.min' : ''}.json`
  console.log('Generating filename', filename)
  util.write(filename, contents)
}

files.forEach((data) => {
  generateFile(data)
  generateFile(data, true)
})
console.log(`\u2714 Generated icons for mdi build v${version}`)
