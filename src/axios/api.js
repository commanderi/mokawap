import axios from './index.js'

// 登录
export const MemberLogin = params => { return axios.post('/login/login', params).then(res => res).catch(err => err) }
// 注册
export const Register = params => { return axios.post('/login/register', params).then(res => res).catch(err => err) }
//  玩法说明
export const GetPlayRule = params => { return axios.post('/index/get_play_rule', params).then(res => res).catch(err => err) }
//  获取在线客服地址
export const GetKefu = params => { return axios.post('/login/get_kefu', params).then(res => res).catch(err => err) }

// 获取购彩大厅
export const getHotCate = params => { return axios.post('/index/get_hot_cate', params).then(res => res).catch(err => err) }

// 获取第三方连接地址
export const GetThirdUrl = params => { return axios.post('/index/get_third_url', params).then(res => res).catch(err => err) }
// 获取首页banner图接口
export const GetBanners = params => { return axios.post('/index/get_banners', params).then(res => res).catch(err => err) }
// 获取优惠活动
export const GetFavourableActivity = params => { return axios.post('/index/get_favourable_activity', params).then(res => res).catch(err => err) }
// 获取优惠活动详情
export const ActiveDetail = params => { return axios.post('/index/active_detail', params).then(res => res).catch(err => err) }
// 获取弹窗轮播公告消息
export const GetNotice = params => { return axios.post('/index/get_notice', params).then(res => res).catch(err => err) }
// 获取最新中奖榜
export const GetLatestWinnersList = params => { return axios.post('/index/get_latest_winners_list', params).then(res => res).catch(err => err) }
// 获取所有彩种
export const GetCates = params => { return axios.post('/index/get_cates', params).then(res => res).catch(err => err) }
// 获取转盘列表
export const getRedList = params => { return axios.post('/money/get_red_list', params).then(res => res).catch(err => err) }
// 获取可以转转盘的次数
export const getRobTimes = params => { return axios.post('/money/get_rob_times', params).then(res => res).catch(err => err) }
// 转转盘
export const doRobRed = params => { return axios.post('/money/do_rob_red', params).then(res => res).catch(err => err) }
// 我的转盘记录
export const getMyRed = params => { return axios.post('/money/get_my_red', params).then(res => res).catch(err => err) }


// 获取我的资料
export const GetPersonalInfo = params => { return axios.post('/personal/get_personal_info', params).then(res => res).catch(err => err) }
// 用户签到
export const SignIn = params => { return axios.post('/personal/sign_in', params).then(res => res).catch(err => err) }
// 个人投注记录
export const BettingRecord = params => { return axios.post('/lottery/betting_record', params).then(res => res).catch(err => err) }
// 个人获取投注记录详情
export const BettingRecordDetail = params => { return axios.post('/lottery/betting_record_detail', params).then(res => res).catch(err => err) }
// 获取AG游戏记录
export const GetAgBettingDetail = params => { return axios.post('/lottery/get_ag_betting_detail', params).then(res => res).catch(err => err) }
// 获取沙巴体育游戏记录
export const GetIbcBettingDetail = params => { return axios.post('/lottery/get_ibc_betting_detail', params).then(res => res).catch(err => err) }
// 开元棋牌游戏记录
export const getKyBetting_detail = params => { return axios.post('/lottery/get_ky_betting_detail', params).then(res => res).catch(err => err) }
// 传奇电子游戏记录
export const getCqBetting_detail = params => { return axios.post('/lottery/get_cq_betting_detail', params).then(res => res).catch(err => err) }
// JDB游戏记录
export const getJdbBetting_detail = params => { return axios.post('/lottery/get_jdb_betting_detail', params).then(res => res).catch(err => err) }
// 获取某个彩种的赔率
export const getLotteryOdds = params => { return axios.post('/lottery/get_lottery_odds', params).then(res => res).catch(err => err) }
// 获取最近10期的开奖结果
export const getLastOpenNumber = params => { return axios.post('/lottery/get_last_open_number', params).then(res => res).catch(err => err) }
// 获取下一期的开奖时间和期数
export const getNextTimeStage = params => { return axios.post('/lottery/get_next_time_stage', params).then(res => res).catch(err => err) }
// 获取上一期开奖号码
export const getLastOneNumber = params => { return axios.post('/lottery/get_last_one_number', params).then(res => res).catch(err => err) }
// 投注接口
export const postbetting = params => { return axios.post('/lottery/betting', params).then(res => res).catch(err => err) }
// 取消投注 撤销订单
export const CancelOrder = params => { return axios.post('/lottery/cancel_order', params).then(res => res).catch(err => err) }


// ===============开奖大厅
// 某个彩种开奖详情
export const GetNewOpenNumberDetail = params => { return axios.post('/index/get_new_open_number_detail', params).then(res => res).catch(err => err) }
// 获取最近一期的开奖结果
export const GetNewOpenNumber = params => { return axios.post('/index/get_new_open_number', params).then(res => res).catch(err => err) }




// 充值记录
export const RechargeRecord = params => { return axios.post('/money/recharge_record', params).then(res => res).catch(err => err) }
// 提现记录
export const WithdrawRecord = params => { return axios.post('/money/withdraw_record', params).then(res => res).catch(err => err) }
// 转帐记录
export const TransferDetail = params => { return axios.post('/money/transfer_detail', params).then(res => res).catch(err => err) }
// 账户明细
export const AccountDetail = params => { return axios.post('/money/account_detail', params).then(res => res).catch(err => err) }
// 个人报表
export const GetPersonalReport = params => { return axios.post('/personal/get_personal_report', params).then(res => res).catch(err => err) }
// 修改用户信息
export const EditPersonal = params => { return axios.post('/personal/edit_personal', params).then(res => res).catch(err => err) }
// 修改登陆密码
export const ModifyLoginPassword = params => { return axios.post('/personal/modify_login_password', params).then(res => res).catch(err => err) }
// 修改提现密码
export const ModifyMoneyPassword = params => { return axios.post('/personal/modify_money_password', params).then(res => res).catch(err => err) }
// 获取我的消息
export const GetMyMessage = params => { return axios.post('/personal/get_my_message', params).then(res => res).catch(err => err) }
// 获取意见反馈内容
export const GetFeedBackList = params => { return axios.post('/personal/get_feed_back_list', params).then(res => res).catch(err => err) }
// 添加意见反馈
export const AddFeedBack = params => { return axios.post('/personal/feed_back', params).then(res => res).catch(err => err) }
// 获取第三方游戏余额
export const GetGameMoney = params => { return axios.post('/personal/get_game_money', params).then(res => res).catch(err => err) }

// =========充值相关

// 获取所有的充值方式
export const GetRechargeWays = params => { return axios.post('/money/get_recharge_ways', params).then(res => res).catch(err => err) }
// 充值
export const DoCharge = params => { return axios.post('/money/do_charge', params).then(res => res).catch(err => err) }
// 获取线上支付参数
export const BeforeRecharge = params => { return axios.post('/money/before_recharge', params).then(res => res).catch(err => err) }
// 获取我的银行卡信息
export const GetWithdrawData = params => { return axios.post('/money/get_withdraw_data', params).then(res => res).catch(err => err) }
// 绑定银行卡
export const BangCard = params => { return axios.post('/personal/bang_card', params).then(res => res).catch(err => err) }
// 提现
export const DoWithdrawals = params => { return axios.post('/money/do_withdrawals', params).then(res => res).catch(err => err) }
// 第三方转帐
export const MoneyToGame = params => { return axios.post('/personal/money_to_game', params).then(res => res).catch(err => err) }




// =========代理相关

// 新增下级会员返点列表
export const GetBackRebates = params => { return axios.post('/agent/get_back_rebates', params).then(res => res).catch(err => err) }
// 生成邀请码
export const ProduceCode = params => { return axios.post('/agent/produce_code', params).then(res => res).catch(err => err) }
// 添加邀请码
export const AddProduceCode = params => { return axios.post('/agent/add_produce_code', params).then(res => res).catch(err => err) }
// 添加下级会员
export const MewMember = params => { return axios.post('/agent/new_member', params).then(res => res).catch(err => err) }
// 获取我的邀请码
export const GetPromotionLinks = params => { return axios.post('/agent/get_promotion_links', params).then(res => res).catch(err => err) }
// 修改邀请码
export const EditProduceCode = params => { return axios.post('/agent/edit_produce_code', params).then(res => res).catch(err => err) }
// 获取我的下级
export const GetMyJunior = params => { return axios.post('/agent/get_my_junior', params).then(res => res).catch(err => err) }
// 获取代理佣金
export const GetAgentMoney = params => { return axios.post('/agent/get_agent_money', params).then(res => res).catch(err => err) }
// 获取团队报表
export const GetTeamReport = params => { return axios.post('/agent/get_team_report', params).then(res => res).catch(err => err) }
// 代理转帐
export const Transfertolower = params => { return axios.post('/money/transfer_to_lower', params).then(res => res).catch(err => err) }
// 获取工资返点列表
export const Getwagerebates = params => { return axios.post('/agent/get_wage_rebates', params).then(res => res).catch(err => err) }
