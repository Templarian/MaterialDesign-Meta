export const iconIds = ["account-alert", "alarm", "account"]

export const icons = {
    allIconIds: iconIds,
    byIconId: {
        "alarm": "M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z",
        "account": "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z",
    },
}

export const authorIds = [
        "{githubUserId123?}",
        "{githubUserId456?}",
    ]

export const authors = {
    allAuthorIds: authorIds,
    byAuthorId: {
        "{githubUserId123?}": {
            "name": "Michael Irigoyen",
            "added": 1611132797,
        },
    },
}

export const iconAuthors = {
    allIconsIds: iconIds,
    byIconId: {
        "account-alert": "{githubUserId123?}",
    },
}

export const authorIcons = {
    allAuthorIds: authorIds,
    byAuthorId: {
        "{githubUserId123?}":{
             "account-alert": true,
             "user-alert": true,
        },
    },
}

export const aliasIds = [
        "user-alert",
        "account-warning",
        "user-warning",
    ]

export const aliases = {
    allAliasIds: aliasIds,
    byAliasId: {
        "user-alert": "account-alert",
        "account-warning": "account-alert",
        "user-warning": "account-alert",
    },
}

export const iconAliases = {
    allIconIds: iconIds,
    byIconId: {
        "account-alert": {
            "user-alert": true,
            "account-warning": true,
            "user-warning": true,
        }
    }
}

export const tagIds = ["{tagId123}", "{tagId456}"]

export const tags = {
    allTagIds: tagIds
    byTagId: {
        "{tagId123}": {
               "name": "Account User",
               "description: "........",
               "count": 11,
         },
    },
}

export const iconTags = {
    allIconIds: iconIds,
    byIconId: {
        "account-alert": {
            "{tagId123}": true,
            "{tagId456}": true,
        }
    }
}

export const tagIcons = {
    allTagIds: tagIds,
    byTagId: {
        "{tagId123}": {
            "account-alert": true,
            "alert": true,
        }
    }
}

/* ... continued ...  */


export enum Detail {
    SIMPLE,
    FULL
}

export interface Author<D extends Detail = null>  {
    id: string
    name: string
    icons?: D extends Detail ? (D extends Detail.FULL ? Icon : D extends Detail.SIMPLE ? string : never)[] : undefined
}

export interface Icon<D extends Detail = null> {
    Id: string
    uuid: string // Probably not necessary?
    path: string
    author?: D extends Detail ? (D extends Detail.FULL ? Author : D extends Detail.SIMPLE ? string : never) : undefined
    aliases?: D extends Detail ? (D extends Detail.FULL ? Alias : D extends Detail.SIMPLE ? string : never)[] : undefined
}

export const getIconPath = (id: string): string => {
    return icons.byName[id]
}

export const getIconAuthorId = (id: string): string => {
    return iconAuthors.byIconId[id]
}

export const getIconAuthor = (id: string): Author => {
    return authors.byAuthorId[getIconAuthorId(id)]
}

export const getIconTagIds = (id: string): string[] {
     return Object.keys(iconTags.byIconId[id])
}

export const getTag = (id: string): Tag[] {
     return tags.byTagId[id]
}

export const getIconTags = (id: string): Tag[] {
     return getIconTagIds(id).map(getTag)
}

export const getIconTags = (id: string): Tag[] {
     return getIconTagIds(id).map(getTag)
}

export enum MetaType {
    Icon = 'icon,
    Author = 'author',
    Alias = 'alias',
    Tag = 'tag,
}

export type ExcludeData = {
    icon?: boolean,
    author?: boolean,
    tag?: boolean,
    alias?: boolean,
}
export type AggregatedMetadata<T extends MetaType, D extends Detail = any> = T extends MetaType ? (
   L extends Detail ? (
        T extends MetaType.Icon ? Icon<D> 
        : T extends MetaType.Author ? Author<D> 
        : T extends MetaType.Alias ? Alias<D> 
        : T extends MetaType.Tag ? Tag<D> 
        : never
   ) : (
        T extends MetaType.Icon ? Icon
        : T extends MetaType.Author ? Author
        : T extends MetaType.Alias ? Alias 
        : T extends MetaType.Tag ? Tag
        : never 
   )
) : never

export const aggregateMetadata = (type: MetaType, id:string, level: Detail = Detail.SIMPLE, excludes?: ExcludeData): null | AggregatedMetadata<typeof type, typeof level> => {
    if (!iconIds.some(i=>i===id)) {
        return null
    }
    const metadata = { id }
    const {  author, alias, tag } = excludes ?? {}
    const simple = level === Detail.FULL

   if (type === MetaType.Icon && metadata as Icon) {
      /* ..... */
      !author && metadata.author = simple ? getIconAuthorId(id) : getIconAuthor(id)
      !alias && metadata.alias = simple ? getIconAliasIds(id) : getIconAliases(id)
      /* ..... */
   } else if (type === MetaType.Author && metadata as Author) {
       /* ... */
      !icon && metadata.icon = simple ? getAuthorIconIds(id) : getAuthorIcons(id)
       /* ... */
   }

    return metadata
}
    
export const searchIcons = (query: string, iconIds: string[]) => {
      const data = iconIds.map(iconId=>{
           const aliases = getIconAliasIds(iconId).map(id=>({id, ...getAlias(id)}))
           const tags = getIconTagIds(iconId).map(id=>({id, ...getTag(id)}))
           return ({
                  iconId,
                  aliases,
                  tags
           })
      })
      return data.filter(({iconId, aliases, tags}) =>
            iconId.includes(query)
            || aliases.some(alias=>alias.name.includes(...))
            || tags..... 
      ).map(i=>i.id)
   }

export const searchAuthors (query: string, authorIds: string[]) => {
      const data = authorIds.map(authorId=>{
           const authorName = getAuthor(authorId).name
           const authorIconIds = getAuthorIconIds(authorId)
           return ({
                  authorId,
                  authorName,
                  authorIconIds
           })
      })
      return data.filter(({name, authorId, authorIconIds}) =>
            authorId.includes(query)
            || aliases.some(alias=>alias.name.includes(...))
            || searchIcons(query, authorIconIds)
            || tags..... 
      ).map(i=>i.id)
   }

export const search = (text: string, tagId?: string, type: MetaType = MetaType.Icon): string[] {
    const filterTag = tagId && tagIds.some(i=>i===tagId)
    const query = String(text).trim()
    
    if (filterTag) {
        switch(type) {
            case MetaType.Tag:
                 return /* ...... */
            case MetaType.Author:
                 return /* ...... */
            case MetaType.Icon:
            default:
                 return filterIcons(getTagIconIds(tagId))
        }
    } 
    return ........
}
