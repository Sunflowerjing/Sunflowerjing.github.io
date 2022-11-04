# sku 联动处理


```js
import React, { useState, useEffect } from 'react';
import { Toast, Button, Modal } from '@myfe/myui-mobile';
import './index.less';

const skuBase = {
    "props": [
        {
            "hasImage": "true",
            "name": "颜色分类",
            "nameDesc": "（2）",
            "pid": "1627207",
            "values": [
                {
                  "name": "白色",
                  "sortOrder": "0",
                  "vid": "28320"
                },
                {
                  "name": "黑色",
                  "sortOrder": "4",
                  "vid": "28341"
                }
            ]
        },
        {
            "hasImage": "false",
            "name": "尺码",
            "pid": "20509",
            "values": [
                {
                    "name": "S",
                    "sortOrder": "1",
                    "vid": "28314"
                },
                {
                    "name": "M",
                    "sortOrder": "2",
                    "vid": "28315"
                },
                {
                    "name": "L",
                    "sortOrder": "3",
                    "vid": "28316"
                }
            ]
        }
    ],
    "skus": [
        {
            "propPath": "1627207:28320;20509:28314",
            "skuId": "4522013280750"
        },
        {
            "propPath": "1627207:28320;20509:28315",
            "skuId": "4522013280752"
        },
        {
            "propPath": "1627207:28320;20509:28316",
            "skuId": "4522013280754"
        },
        {
            "propPath": "1627207:28341;20509:28314",
            "skuId": "4522013280751"
        },
        {
            "propPath": "1627207:28341;20509:28315",
            "skuId": "4522013280753"
        },
        {
            "propPath": "1627207:28341;20509:28316",
            "skuId": "4522013280755"
        }
    ],
    "skusMapAll": {
      "1627207:28320;20509:28314": "4522013280750",
      "1627207:28320;20509:28315": "4522013280752",
      "1627207:28320;20509:28316": "4522013280754",
      "1627207:28341;20509:28314": "4522013280751",
      "1627207:28341;20509:28315": "4522013280753",
      "1627207:28341;20509:28316": "4522013280755",
    },
    "skusMap": {
      "28320;28314": "4522013280750",
      "28320;28315": "4522013280752",
      "28320;28316": "4522013280754",
      "28341;28314": "4522013280751",
      "28341;28315": "4522013280753",
      "28341;28316": "4522013280755",
    }
};

const skuCore = {
    "sku2info": {
        "0": {
            "moreQuantity": "true",
            "price": {
                "priceMoney": "4980",
                "priceText": "49.8"
            },
            "quantity": "200",
            "quantityText": "有货"
        },
        "4522013280754": {
            "moreQuantity": "true",
            "price": {
                "priceMoney": "4980",
                "priceText": "49.8"
            },
            "quantity": "200",
            "quantityText": "有货"
        },
        "4522013280755": {
            "moreQuantity": "false",
            "price": {
                "priceMoney": "4980",
                "priceText": "49.8"
            },
            "quantity": "102",
            "quantityText": "有货"
        },
        "4522013280752": {
            "moreQuantity": "true",
            "price": {
                "priceMoney": "4980",
                "priceText": "49.8"
            },
            "quantity": "200",
            "quantityText": "有货"
        },
        "4522013280753": {
            "moreQuantity": "true",
            "price": {
                "priceMoney": "4980",
                "priceText": "49.8"
            },
            "quantity": "200",
            "quantityText": "有货"
        },
        "4522013280750": {
            "moreQuantity": "true",
            "price": {
                "priceMoney": "4980",
                "priceText": "49.8"
            },
            "quantity": "200",
            "quantityText": "有货"
        },
        "4522013280751": {
            "moreQuantity": "false",
            "price": {
                "priceMoney": "4980",
                "priceText": "49.8"
            },
            "quantity": "108",
            "quantityText": "有货"
        }
    },
    "skuItem": {
        "itemStatus": "0",
        "renderSku": "true",
        "unitBuy": "1"
    }
};

export default function SKU() {
  //属性集合
  const [skuNameList, setSkuNameList] = useState([]); // 将当前选中的 sku 名字(白色-M), 存储到 skuNameList
  const [skuIdList, setSkuIdList] = useState([]); // 将当前选中的 skuId, 存储到 skuIdList
  const [skuTypeList, setSkuTypeList] = useState({}); // 未选中的 sku 类别(例如: 请选择 颜色分类 尺码)
  const [currentSkuInfo, setCurrentSkuInfo] = useState({}); // 将当前选中的 sku, 存储到 currentSkuInfo
  const [curNum, setcurNum] = useState(1);

  useEffect(() => {
    const allType = skuBase.props.map(item => item.name);
    setSkuTypeList({
      type: allType,
      length: allType.length
    });
  }, []);

  const handleClick = (e, { skuBaseItme, skuBaseIndex, skusItem, skusIndex }) => {
    console.log(skuTypeList, '-----', skuBaseIndex);

    const skuType = skuBase.props[skuBaseIndex].name;

    // 对type进行处理
    console.log('skuType', skuType);
    if (skuTypeList.type.includes(skuType)) {
      skuTypeList.type.splice(skuBaseIndex, 1);
    } else {
      skuTypeList.type[skuBaseIndex] = skuType;
    }
    setSkuTypeList(skuTypeList);



    // 当前选中的 sku 以及 取消选中 sku 的逻辑
    const skuInfo = skuBase.props[skuBaseIndex].values[skusIndex];
    const val = e.currentTarget.innerText;
    if (skuNameList.includes(skusItem.name)) {
      skuNameList.splice(skuBaseIndex, 1);
      skuIdList.splice(skuBaseIndex, 1);
    } else {
      skuNameList[skuBaseIndex] = val;
      skuIdList[skuBaseIndex] = skuInfo.vid;
    }
    setSkuNameList([...skuNameList]);
    setSkuIdList([...skuIdList]);

    // 将当前选中的sku信息, 存储到currentSkuInfo
    const currentSkuKey = skuIdList.join(';');
    if (skuBase.skusMap[currentSkuKey]) {
      const currentSkuId = skuBase.skusMap[currentSkuKey];
      const curSkuInfo = {
        ...skuCore.sku2info[currentSkuId],
        currentSkuId
      };
      setCurrentSkuInfo(curSkuInfo);
    } else {
      setCurrentSkuInfo({});
    }
  };

  const changeNum = param => {

    if (param === 'minus' && curNum === 1) { // 数量为1
      Toast.info('已经达到最低限制了~');
      return;
    }

    if (param === 'add') { // 加号
      setcurNum(curNum + 1);
    } else if (param === 'minus') { // 减号
      setcurNum(curNum - 1);
    }
  };

  return (
    <div className="sku">
      {
        skuBase.props.map((skuBaseItme, skuBaseIndex) => {
          return (
            <div>
              {
                skuBaseItme.name
              }
              <div className="sort">
                {
                  skuBaseItme.values.map((skusItem, skusIndex) => {
                    return (
                      <div
                        // className="sortSku"
                        className={skuNameList.includes(skusItem.name) ? 'bagColor' : 'sortSku'}
                        onClick={e => handleClick(e, { skuBaseItme, skuBaseIndex, skusItem, skusIndex })}
                      >
                        {skusItem.name}
                      </div>
                    );
                  })
                }
              </div>
            </div>
          );
        })
      }
      <div>
        skuId:
        {currentSkuInfo.currentSkuId || 0}
      </div>
      <div>
        价钱:
        {currentSkuInfo?.price?.priceMoney}
      </div>
      <div>
        名字:
        {currentSkuInfo.currentSkuId && skuNameList.join('-')}
      </div>
      {/* <div>
        skuInfo:
        {JSON.stringify(currentSkuInfo)}
      </div> */}
      <div className="num">
        数量:
        <div onClick={() => changeNum('add')}>+</div>
        <div className="cur-num">{curNum}</div>
        <div onClick={() => changeNum('minus')}>-</div>
      </div>
      <div>{JSON.stringify(skuTypeList)}</div>
    </div>
  );
}

```



```css
.sku {
  .sort {
    display: flex;
    align-items: center;
    justify-content: center;
    .sortSku {
      width: 40px;
      margin-right: 5px;
      height: 20px;
      padding: 0 5px;
      border-radius: 10px;
      background: #E8E8E8;
      text-align: center;
    }
    .bagColor {
      width: 40px;
      margin-right: 5px;
      height: 20px;
      padding: 0 5px;
      border-radius: 10px;
      background-color: #F03D37;
      text-align: center;
    }
  }
  .num {
    display: flex;
    div {
      width: 20px;
      height: 20px;
      background-color: #CCCCCC;
      margin: 0 5px;
      text-align: center;
    }
    .cur-num {
      background-color: #fff;
    }
  }
}
```