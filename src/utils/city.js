/*
    ## Address 字典数据
    字典数据来源 http://www.atatech.org/articles/30028?rnd=254259856
    国标 省（市）级行政区划码表
    华北   北京市 天津市 河北省 山西省 内蒙古自治区
    东北   辽宁省 吉林省 黑龙江省
    华东   上海市 江苏省 浙江省 安徽省 福建省 江西省 山东省
    华南   广东省 广西壮族自治区 海南省
    华中   河南省 湖北省 湖南省
    西南   重庆市 四川省 贵州省 云南省 西藏自治区
    西北   陕西省 甘肃省 青海省 宁夏回族自治区 新疆维吾尔自治区
    港澳台 香港特别行政区 澳门特别行政区 台湾省

    **排序**

    ```js
    var map = {}
    _.each(_.keys(REGIONS),function(id){
      map[id] = REGIONS[ID]
    })
    JSON.stringify(map)
    ```
*/
let DICT = {
  110000: 'DKI Jakarta',
  120000: 'Bali',
  130000: 'Bangka Belitung',
  140000: 'Banten',
  150000: 'DIY',
  160000: 'Gorontalo',
  170000: 'Jambi',
  180000: 'Jawa Barat',
  190000: 'Jawa Tengah',
  200000: 'Jawa Timur',
  210000: 'Kalimantan Barat',
  220000: 'Kalimantan Selatan',
  230000: 'Kalimantan Tengah',
  240000: 'Kalimantan Timur',
  250000: 'Kalimantan Utara',
  260000: 'Kep. Riau',
  270000: 'Lampung',
  280000: 'Maluku',
  290000: 'Maluku Tengah',
  300000: 'Maluku Tenggara Barat',
  310000: 'Maluku Utara',
  320000: 'Nanggroe Aceh Darussalam',
  330000: 'Nusa Tenggara Barat',
  340000: 'Nusa Tenggara Timur',
  350000: 'Papua',
  360000: 'Papua Barat',
  370000: 'Riau',
  380000: 'Sulawesi Barat',
  390000: 'Sulawesi Selatan',
  400000: 'Sulawesi Tengah',
  410000: 'Sulawesi Tenggara',
  420000: 'Sulawesi Utara',
  430000: 'Sumatra Barat',
  440000: 'Sumatra Selatan',
  450000: 'Sumatra Utara',
}

const tree = list => {
  let hashTable = Object.create(null)
  list.forEach(aData => (hashTable[aData.id] = { ...aData, children: [] }))
  let dataTree = []
  list.forEach(aData => {
    if (aData.pid) {
      if (hashTable[aData.pid])
        hashTable[aData.pid].children.push(hashTable[aData.id])
    } else dataTree.push(hashTable[aData.id])
  })
  return dataTree
}

let DICT_FIXED = (function() {
  let fixed = []
  for (let id in DICT) {
    if ({}.hasOwnProperty.call(DICT, id)) {
      let pid
      const tmpObj = { id, value: DICT[id], label: DICT[id] }
      if (id.slice(2, 6) !== '0000') {
        pid =
          id.slice(4, 6) === '00'
            ? `${id.slice(0, 2)}0000`
            : `${id.slice(0, 4)}00`
      }
      if (pid) tmpObj.pid = pid
      fixed.push(tmpObj)
    }
  }
  return tree(fixed)
})()

module.exports = DICT_FIXED
