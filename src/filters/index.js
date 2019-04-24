// set function parseTime,formatTime to filter
export {
  parseTime,
  formatTime
}
from '@/utils'

import V from '../main'
import zhCN from 'element-ui/lib/locale/lang/zh-CN';

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [{
      value: 1E18,
      symbol: 'E'
    },
    {
      value: 1E15,
      symbol: 'P'
    },
    {
      value: 1E12,
      symbol: 'T'
    },
    {
      value: 1E9,
      symbol: 'G'
    },
    {
      value: 1E6,
      symbol: 'M'
    },
    {
      value: 1E3,
      symbol: 'k'
    }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function objectDic(num) {
  if (num) {
    return V.$store.state.dic.code[num] ? V.$store.state.dic.code[num] : num
  }
  return num
}

//浮点数计算
export function add(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

//千字符格式化
export function qianzifuFilter(num) {
  var reg = /\d{1,3}(?=(\d{3})+$)/g;
  return (num + '').replace(reg, '$&,');
}

//表名获取中文
export function getCnNameFilter(str) {
  let z = str.match(/[\u4e00-\u9fa5|\（|\）]+$/gi)
  if (z) {
    z = z[0]
  } else {
    z = str
  }
  return z
}
//表名获取英文
export function getNameFilter(str) {
  let e = str.match(/^[a-z|A-Z|\_|\d]+/gi)
  if (e) {
    e = e[0]
  }
  return e
}
//库名拼接
export function getKuNameFilter(str) {
  let z = str.split('（')[1]
  let e = str.split('（')[0]
  z = z.substr(0, z.length - 1)

  return z 
}
