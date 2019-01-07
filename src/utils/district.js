import { pca } from './pca'

function parsePca() {
  const data = []
  for (const p in pca) {
    const province = {
      value: p,
      label: p,
      children: []
    }
    for (const c in pca[p]) {
      const citie = {
        value: c,
        label: c,
        children: []
      }
      if (Array.isArray(pca[p][c])) {
        const areas = pca[p][c]
        const len = areas.length
        for (let i = 0; i < len; i++) {
          citie.children.push({
            value: areas[i],
            label: areas[i],
            children: []
          })
        }
      }
      province.children.push(citie)
    }
    data.push(province)
  }
  return [data]
}

export const district = parsePca()
