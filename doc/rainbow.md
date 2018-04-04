    接口说明
版本2018-03-21
新增协议9,10
修改了订阅协议 2

websocket接口
ws://47.91.202.19:12345

约定uuid为32位字符串
请求包结构为 uuid + json协议
返回结果为 uuid + json协议
注意： 一下协议说明省略uuid

Ip: 47.91.202.19
PORT: 12345
约定：
hope ： 委托方
Rainbow：  聚合服务器
hope与rainbow的协议


备注：
•	手续费   交易手续费。（扣除收取到的资产）
	Okex   %0.1
	Huopro  %0.2
	Binance  %0.1
币种说明
[BTCUSDT  比特币对USDT]
[ETHUSDT  以太坊对USDT]
[ETHBTC    以太坊对BTC]
//约定lp是为交易所
// 参数说明 所有的lp都是小写  所有的交易对都是大写
okex huopro binance
BTCUSDT ETHUSDT ETHBTC



# hope与rainbow的协议
hope与rainbow的协议
# 1.登录请求-login

## 请求命令(hope)

```
{
    "cmd":"login",
    "data":{"login": 60114459,"password":"abc123" }
}
```
### 返回结果（rainbow）

```
{
    "cmd":"login",
    "code":0,
    "message":""
    “data”:{“token”:”1245353463”},
}
```
# 2.深度推送-subscribeall

## 请求命令(hope)
  //不传symbol 默认btcusd  lp {okex,huopro,binance}
```
{
    "cmd":"subscribeall",
    "data": {"subsribeTick":true} }
}
```
### 返回结果（rainbow）
   //ask5 参数 price,amount
```
{
    "cmd":"subscribeall",
    "code":0,
    "data":{
        "channel":"depth",
        "depth":{
            "asks":[             //ask1 ask2...
                [8470.000000000000000000,0.135300000000000000],[8471.400000000000000000,0.192500000000000000]...
             ],
            "bids":[              //bid1 bid2...
                [8469.000000000000000000,0.135300000000000000],[8468.400000000000000000,0.192500000000000000]...
             ]
        },
        "ts":1520906229530
        "lp":"okex",
        "symbol":"BTCUSDT"
    },
    "message":""
}
{
    "cmd":"subscribeall",
    "code":0,
    "data":{
        "channel":"tick",
        "tick":{
			"amount":0.40000000000000002,
			"price":9108.2924999999996
		},
        "ts":1520906229530,
        "lp":"okex",
        "symbol":"BTCUSDT"
    },
    "message":""
}
```
# 3.帐户查询 -balance

## 请求命令(hope)

```
{
    "cmd":"qryTradingAccount",
    "data":{
        "lp":"okex"
        "token":"123"
    }
}
```
### 返回结果（rainbow）

```
{
    "cmd":"qryTradingAccount",
    "code":0,
    "message":""
    “data”:{
        "lp":"okex",
        "balance":{"btc":"0","usdt":"0"}
    },
}
```
# 4.下单-order

## 请求命令(hope)

```
{
    "cmd":"insertOrder",
    "data":{
        "token":"123",
        "lp":"okex",
        "params": {
            "symbol" : "BTCUSDT",
            "side" : "sell",          //sell 卖btc , buy 买btc
            "amount" : 0.001 }
    }
}
```
### 返回结果（rainbow）

```
{
    "cmd":"insertOrder",
    "code":0,
    "message":""
    “data”:{
        "orderStatus":"0",  //
        “trade”：{
            "rqtime": "2017-12-14 17:00:15", //请求时间
            "lp": "okex",
            "symbol": "BTCUSDT",     //
            "amount": "0.001",          //下单手数
            "price": "15495.51",               //下单资金
            "side": "buy_market",     //交易类型  buy shell
            "type":"buy",                //lp 交易类型
            "order_id": "44711303",        //lp返回订单号
            "avg_price": "15495.45000000",  //成交均价 double
            "deal_amount": 0.001,     //成交手数  double
            "create_time": "2017-12-14 17:00:15.147",         //lp返回的成交日期 long
            "status":"2" //lp 交易状态
            "orderStatus": "0"        //同code
        }
    },
}
orderStatus 字段说明
    trade_err = -1,//内部错误
	trade_ok = 0, //交易成功
	trade_no_banlance = 1, //交易金额大于余额
	trade_prams_err = 2, //参数不对
	trade_value_err = 3 //小于最小交易值
```
# 5.查询-queryOrder

## 请求命令(hope)

```
{
    "cmd":"queryOrder",
    "data":{
        "token":"123",
        "uuid":"01234567890123456789010123456789"
    }
}
```
### 返回结果（rainbow）

```
{
    "cmd":"queryOrder",
    "code":0,
    "message":""
    “data”:{
        "trade":{
            "uuid": "01234567890123456789012345678912",
            "rqtime": "2017-12-14 17:00:15", //请求时间
            "lp": "okex",
            "symbol": "BTCUSDT",     //
            "amount": "0.001",          //下单手数
            "price": "15495.51",               //下单资金
            "side": "buy_market",     //交易类型  buy shell
            "type":"buy",                //lp 交易类型
            "order_id": "44711303",        //lp返回订单号
            "avg_price": "15495.45000000",  //成交均价 double
            "deal_amount": 0.001,     //成交手数  double
            "create_time": "2017-12-14 17:00:15.147",         //lp返回的成交日期 long
            "status":"2" //lp 交易状态
            "orderStatus": "0"        //同code
        },
        "uuid":"01234567890123456789010123456789"
    },
}
```

# 6.下单(限价单)-insertOrder_limit

## 请求命令(hope)

```
{
    "cmd":"insertOrder_limit",
    "data":{
        "token":"395461B5A793F89d52b2baa08b612755a94cb636754e9a1",
        "lp":"okex",
        "params": {
            "symbol" : "BTCUSDT",          //币种
            "side" : "sell_limit",         //sell_limit 卖btc , buy_limit 买btc
            "amount" : 0.001，             //委托数量
            "price" : 999999               //委托价格
		}
    }
}

```
### 返回结果（rainbow）

```
{
    "cmd":"insertOrder_limit",
    "code":0,                       // 0 下单成功
    "comment":"",
    "data":{
        "trade":{
            "amount":0.001,             //委托数量
            "lp":"okex",                //交易所代号
            "orderStatus":0,            //0 下单成功
            "order_id":"296602407",     //订单ID
            "price":999999,             //委托价格
            "result":true,
            "rqtime":"2018-02-23 09:54:18",  //请求时间
            "side":"sell_limit",             //买卖(限价单)
            "symbol":"BTCUSDT"               //币种
        }
    },
    "message":""
}
```
# 7.查询(限价单)-queryOrder_limit

## 请求命令(hope)

```
{
    "cmd":"insertOrder_limit",
    "data":{
        "token":"395461B5A793F89d52b2baa08b612755a94cb636754e9a1",
        "lp":"okex",
        "params": {
            "symbol" : "BTCUSDT",             //币种
            "order_id":"296602407"           //订单ID
		}
    }
}

```
### 返回结果（rainbow）

```
{
    "cmd":"queryOrder_limit",
    "code":0,                          //0 查询成功
    "comment":"",
    "data":{
        "orderStatus":0,   // 0 未成交 //1部分成交 //2完全成交
        "trade":{
            "amount":0.001,             //委托数量
            "avg_price":0,              //平均成交价
            "deal_amount":0,            //成交数量
            "lp":"okex",                //交易所
            "order_id":"296602407",     //订单ID
            "price":999999,             //委托价格
            "queryRes":0,               //0 查询成功
            "symbol":"btc_usdt",
            "type":"sell"
        }
    },
    "message":""
}
```

# 8.撤销订单(限价单)-cancelOrder_limit

## 请求命令(hope)

```
{
    "cmd":"cancelOrder_limit",
    "data":{
        "token":"395461B5A793F89d52b2baa08b612755a94cb636754e9a1",
        "lp":"okex",
          "params": {
            "symbol" : "BTCUSDT",   //币种
            "order_id":"296600046"  //订单ID
            }
    }
}

```
### 返回结果（rainbow）

```
{
    "cmd":"cancelOrder_limit",
    "code":0,                          //0 撤销订单成功  -1订单不存在或者其他错误
    "comment":"",
    "data":{
        "trade":{
            "cancelRes":0,
            "lp":"okex",
            "order_id":"296602407",    //订单ID
            "result":true,
            "symbol":"BTCUSDT"         //币种
        }
    },
    "message":""
}
```

# 9.同步限价订单(限价单)-insertOrder_limit_sync

## 请求命令(hope)

```
{
"cmd":"insertOrder_limit_sync" ,
        "data":{"lp":"huopro",
            "login": 60114459,
            "token":"90C5AB894152163e933bfe219d355e0dd5ea4602e86",
        "params": {
            "price":99,              //委托价格
            "symbol" : "BTCUSDT",   //交易对
            "side" : "buy_limit",  //buy_limit   买  sell_limit 卖
            "amount" : 0.001,    //委托手数
            "synctime" : 50, //ms   //委托请求同步时间
            }
}}

```
### 返回结果（rainbow）

```
{
　　"cmd":"insertOrder_limit_sync",
　　"code":0,
　　"comment":"",
　　"data":{
　　　　"orderStatus":0,   // 0 未成交 //1部分成交 //2完全成交
　　　　"trade":{
　　　　　　"amount":0.001,     //委托手数
　　　　　　"avg_price":0,        //成交均价
　　　　　　"cash_amount":0,
　　　　　　"create_date":"2018-03-19 16:09:21.501",  //
　　　　　　"deal_amount":0,     //成交手数
　　　　　　"fees":0,
　　　　　　"lp":"huopro",        //交易所代号
　　　　　　"orderStatus":0,
　　　　　　"order_id":"2504082734",    //订单号
　　　　　　"price":99,					//委托价格
　　　　　　"queryRes":0,
　　　　　　"side":"buy_limit",            //
　　　　　　"state":"submitted",
　　　　　　"status":0,
　　　　　　"symbol":"BTCUSDT",
　　　　　　"synctime":50
　　　　}
　　},
　　"message":""
}
```
# 10.获取持仓信息(限价单)-queryOrderHistoryList_limit

## 请求命令(hope)

```
{
    "cmd":"queryOrderHistoryList_limit" ,
    "data":
        {
            "lp":"huopro",
            "token":"90C5AB894152163e933bfe219d355e0dd5ea4602e86" ,
            "params":
                {
                    "symbol" : "BTCUSDT"
                }
        }
}
```
### 返回结果（rainbow）

```
{
    "cmd":"queryOrderHistoryList_limit",
    "code":0,
    "comment":"",
    "data":
        {
               "trade"：
 ["2509392896","2509346131","2509334321","2509228059","2509203052","2509190450","2509177242","2509122301","2509098440","2509087583","2509032270","2509009253","2508986432","2508985630","2508930360","2508929596","2508883264","2508871450","2508860190","2508860102","2508829532"]
         },
     "message":""}

```