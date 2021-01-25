export interface IconsJson {
  iconIds: string[]
  byIconId: {
    [iconId: string]: string // SVG path string
  }
}

export interface AuthorsJson {
  authorIds: string[]
  byAuthorId: {
    [authorId: string]: {
      name: string,
      icons: {
        [iconId: string]: boolean
      }
    }
  }
  byIconId: {
    [iconId: string]: string // Author ID
  }
}

export interface TagsJson {
  tagIds: string[]
  byTagId: {
    [tagId: string]: {
      name: string,
      icons: {
        [iconId: string]: boolean
      }
    }
  }
  byIconId: {
    [iconId: string]: {
      [tagId: string]: boolean
    }
  }
}

export interface AliasesJson {
  aliasIds: string[]
  byAliasId: {
    [aliasId: string]: string // Icon ID
  }
  byIconId: {
    [iconId: string]: {
      [aliasId: string]: boolean
    }
  }
}