/*
github：https://github.com/Ariszy/script
boxjs：https://raw.githubusercontent.com/Ariszy/Private-Script/master/Ariszy.boxjs.json
转载留个名字，谢谢
邀请码：8025524531
我的--输入邀请码，立得一元，直接提现，谢谢
作者：执意Ariszy
目前包含：
签到
修改步数，获取金币
看视频（自测）
脚本初成，非专业人士制作，欢迎指正
#签到获取signheader and signcookie（已签到获取不到应该）
#走路修改步数，提前之前需要重新获取ck，不然提交失败，进一次任务界面就可
#看一个视频弹出金币获取readheader and readkey
[mitm]
hostname = *.amemv.com
#圈x
[rewrite local]
luckycat/aweme/v1/task/sign_in/detail? url script-request-header https://raw.githubusercontent.com/jim114042/quanx/main/js/dyjsb.js

luckycat/aweme/v1/task/done/read? url script-request-header https://raw.githubusercontent.com/jim114042/quanx/main/js/dyjsb.js

luckycat/aweme/v1/task/walk/step_submit? url script-request-header https://raw.githubusercontent.com/jim114042/quanx/main/js/dyjsb.js

luckycat/aweme/v1/task/done/excitation_ad_treasure_box? url script-request-header https://raw.githubusercontent.com/jim114042/quanx/main/js/dyjsb.js

luckycat/aweme/v1/task/done/treasure_task? url script-request-header https://raw.githubusercontent.com/jim114042/quanx/main/js/dyjsb.js

luckycat/aweme/v1/task/page? url script-request-header https://raw.githubusercontent.com/jim114042/quanx/main/js/dyjsb.js

luckycat/aweme/v1/task/done/excitation_ad? url script-request-header https://raw.githubusercontent.com/jim114042/quanx/main/js/dyjsb.js


*/
const jsname = '抖音极速版'
const $ = Env(jsname)
const notify = $.isNode() ? require('./sendNotify') : '';
$.idx = ($.idx = ($.getval("dyjsbcount") || "1") - 1) > 0 ? `${$.idx + 1}` : ""; // 账号扩展字符
const signheaderArr = [],
    signcookieArr = []
const stepheaderArr = [],
    stepkeyArr = []
const walkheaderArr = [],
    walkkeyArr = []
const readheaderArr = [],
    readkeyArr = []
const bx1headerArr = [],
    bx1keyArr = []
const bx2headerArr = [],
    bx2keyArr = []
const taskheaderArr = [],
    taskkeyArr = []
const xxheaderArr = [],
    xxkeyArr = []
const pretimeArr = []

let signheader = $.getdata('signheader')
let signcookie = $.getdata('signcookie')

let stepheader = $.getdata('stepheader')
let stepkey = $.getdata('stepkey')

let readheader = $.getdata('readheader')
let readkey = $.getdata('readkey')

let bx1header = $.getdata('bx1header')
let bx1key = $.getdata('bx1key')

let bx2header = $.getdata('bx2header')
let bx2key = $.getdata('bx2key')

let taskheader = $.getdata('dyjsb_taskheader')
let taskkey = $.getdata('dyjsb_taskkey')

let walkheader = $.getdata('walkheader')
let walkkey = $.getdata('walkkey')

let xxheader = $.getdata('dyjsb_xxheader')
let xxkey = $.getdata('dyjsb_xxkey')

let pretime = $.getdata('dyjsb_pretime') || 0

let dyhost = $.getdata('dyhost')
let dyjsbaccount, dyjsbzcaccount, dyjsbzcname;
let tz = ($.getval('tz') || '1'); //0关闭通知，1默认开启
const invite = 1; //新用户自动邀请，0关闭，1默认开启
const logs = 0; //0为关闭日志，1为开启
let cash = 1
let coins;
var hour = ''
var minute = ''
const readbody = `{
  "in_sp_time": 0,
  "task_key": "read"
}`
if ($.isNode()) {
    hour = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getHours();
    minute = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getMinutes();
} else {
    hour = (new Date()).getHours();
    minute = (new Date()).getMinutes();
}
//CK运行

if ($.isNode()) {
    //sign
    if (process.env.SIGNHEADER && process.env.SIGNHEADER.indexOf('#') > -1) {
        signheader = process.env.SIGNHEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.SIGNHEADER && process.env.SIGNHEADER.indexOf('\n') > -1) {
        signheader = process.env.SIGNHEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        signheader = process.env.SIGNHEADER.split()
    };
    if (process.env.SIGNCOOKIE && process.env.SIGNCOOKIE.indexOf('#') > -1) {
        signcookie = process.env.SIGNCOOKIE.split('#');
    } else if (process.env.SIGNCOOKIE && process.env.SIGNCOOKIE.split('\n').length > 0) {
        signcookie = process.env.SIGNCOOKIE.split('\n');
    } else {
        signcookie = process.env.SIGNCOOKIE.split()
    };
    //step
    if (process.env.STEPHEADER && process.env.STEPHEADER.indexOf('#') > -1) {
        stepheader = process.env.STEPHEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.STEPHEADER && process.env.STEPHEADER.indexOf('\n') > -1) {
        stepheader = process.env.STEPHEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        stepheader = process.env.STEPHEADER.split()
    };
    if (process.env.STEPKEY && process.env.STEPKEY.indexOf('#') > -1) {
        stepkey = process.env.STEPKEY.split('#');
    } else if (process.env.STEPKEY && process.env.STEPKEY.split('\n').length > 0) {
        stepkey = process.env.STEPKEY.split('\n');
    } else {
        stepkey = process.env.STEPKEY.split()
    };
    //read
    if (process.env.READHEADER && process.env.READHEADER.indexOf('#') > -1) {
        readheader = process.env.READHEADER.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.READHEADER && process.env.READHEADER.indexOf('\n') > -1) {
        readheader = process.env.READHEADER.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        readheader = process.env.READHEADER.split()
    };
    if (process.env.READKEY && process.env.READKEY.indexOf('#') > -1) {
        readkey = process.env.READKEY.split('#');
    } else if (process.env.READKEY && process.env.READKEY.split('\n').length > 0) {
        readkey = process.env.READKEY.split('\n');
    } else {
        readkey = process.env.READKEY.split()
    };
    //sign
    Object.keys(signheader).forEach((item) => {
        if (signheader[item]) {
            signheaderArr.push(signheader[item])
        }
    });
    Object.keys(signcookie).forEach((item) => {
        if (signcookie[item]) {
            signcookieArr.push(signcookie[item])
        }
    });
    //step
    Object.keys(stepheader).forEach((item) => {
        if (stepheader[item]) {
            stepheaderArr.push(stepheader[item])
        }
    });
    Object.keys(stepkey).forEach((item) => {
        if (stepkey[item]) {
            stepkeyArr.push(stepkey[item])
        }
    });
    //read
    Object.keys(readheader).forEach((item) => {
        if (readheader[item]) {
            readheaderArr.push(readheader[item])
        }
    });
    Object.keys(readkey).forEach((item) => {
        if (readkey[item]) {
            readkeyArr.push(readkey[item])
        }
    });
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
} else {
    signheaderArr.push($.getdata('signheader'))
    signcookieArr.push($.getdata('signcookie'))
    stepheaderArr.push($.getdata('stepheader'))
    stepkeyArr.push($.getdata('stepkey'))
    walkheaderArr.push($.getdata('walkheader'))
    walkkeyArr.push($.getdata('walkkey'))
    readheaderArr.push($.getdata('readheader'))
    readkeyArr.push($.getdata('readkey'))
    bx1headerArr.push($.getdata('bx1header'))
    bx1keyArr.push($.getdata('bx1key'))
    bx2headerArr.push($.getdata('bx2header'))
    bx2keyArr.push($.getdata('bx2key'))

    taskheaderArr.push($.getdata('dyjsb_taskheader'))
    taskkeyArr.push($.getdata('dyjsb_taskkey'))
    xxheaderArr.push($.getdata('dyjsb_xxheader'))
    xxkeyArr.push($.getdata('dyjsb_xxkey'))
    pretimeArr.push($.getdata('dyjsb_pretime') || 0)

    let dyjsbcount = ($.getval('dyjsbcount') || '1');
    for (let i = 2; i <= dyjsbcount; i++) {
        signheaderArr.push($.getdata(`signheader${i}`))
        signcookieArr.push($.getdata(`signcookie${i}`))
        stepheaderArr.push($.getdata(`stepheader${i}`))
        stepkeyArr.push($.getdata(`stepkey${i}`))
        walkheaderArr.push($.getdata(`walkheader${i}`))
        walkkeyArr.push($.getdata(`walkkey${i}`))
        readheaderArr.push($.getdata(`readheader${i}`))
        readkeyArr.push($.getdata(`readkey${i}`))
        bx1headerArr.push($.getdata(`bx1header${i}`))
        bx1keyArr.push($.getdata(`bx1key${i}`))
        bx2headerArr.push($.getdata(`bx2header${i}`))
        bx2keyArr.push($.getdata(`bx2key${i}`))


        taskheaderArr.push($.getdata(`dyjsb_taskheader${i}`))
        taskkeyArr.push($.getdata(`dyjsb_taskkey${i}`))
        xxheaderArr.push($.getdata(`dyjsb_xxheader${i}`))
        xxkeyArr.push($.getdata(`dyjsb_xxkey${i}`))
        pretimeArr.push($.getdata(`dyjsb_pretime${i}`) || 0)
    }
}
!(async () => {
    let isGetCookie = typeof $request !== 'undefined'
    if (isGetCookie) {
        GetCookie();
        return
    }

    if (!signheaderArr[0]) {
        $.msg($.name, '【提示】请先获取抖音极速版一cookie')
        return;
    }
    console.log(`------------- 共${signheaderArr.length}个账号----------------\n`)
    for (let i = 0; i < signheaderArr.length; i++) {
        if (signheaderArr[i]) {
            message = ''
            signheader = signheaderArr[i];
            signcookie = signcookieArr[i];
            stepheader = stepheaderArr[i];
            stepkey = stepkeyArr[i];
            walkheader = walkheaderArr[i];
            walkkey = walkkeyArr[i];
            readheader = readheaderArr[i];
            readkey = readkeyArr[i];
            bx1header = bx1headerArr[i];
            bx1key = bx1keyArr[i];
            bx2header = bx2headerArr[i];
            bx2key = bx2keyArr[i];

            taskheader = taskheaderArr[i];
            taskkey = taskkeyArr[i];
            xxheader = xxheaderArr[i];
            xxkey = xxkeyArr[i];
            pretime = pretimeArr[i];

            dyjsbaccount = $.getval(`dyjsbaccount${i}`)
            dyjsbzcaccount = $.getval(`dyjsbzcaccount${i}`)
            dyjsbzcname = $.getval(`dyjsbzcname${i}`)
            $.index = i + 1;
            console.log(`\n开始【抖音极速版${$.index}】`)

            let yck = Math.floor(Math.random() * 180)
            if (false && Math.floor(Math.random() * 20) < 4) { //大概30次中3次看视频
                console.log(`延迟${yck}秒看视频`)
                await $.wait(yck * 1000)
                var t = Math.floor(Math.random() * 6)
                console.log(`看${t}个视频`)
                for (var i3 = 0; i3 < t; i3++) {
                    let t1 = Math.floor(Math.random() * 20) + 30
                    if (i3 != 0) {
                        console.log(`等待${t1}秒看下一个`)
                        await $.wait(t1 * 1000)
                    }
                    await watch_video()
                }
            } else {
                yck = -1
            }

            function RT(minNum, maxNum) {
                switch (arguments.length) {
                    case 1:
                        return parseInt(Math.random() * minNum + 1, 10);
                        break;
                    case 2:
                        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                        break;
                    default:
                        return 0;
                        break;
                }
            }

            function canrun(){
              if (Math.floor(Math.random() * 20) >= 15) { //大概10次中5次跳过
                return true
              }
              return false
            }

            // if (new Date().getTime() - pretime < 20 * 60 * 1000) {
            //     await showmsg();
            //     return;
            // }
            
            if (!canrun()) { //大概10次中5次跳过
                $.log('跳过')
                return;
            }

            await $.wait(RT(1000, 300000))

            

            if (invite == 1) {
                await invitation();
                await $.wait(1000)
            }

            // await $.wait(1000)
            const tks = await tasklist()
            if (tks.err_no != 0) {
                $.msg($.name, ``, `获取任务列表失败 ${tks.err_tips}`)
                return
            }

            // 签到 203
            var tk = tks.data.task_list.find(p => p.profit_desc == '签到')
            if (tk && !tk.completed) {
                await sign_in()
            }

            // 走路 1091
            tk = tks.data.task_list.find(p => p.profit_desc == '走路集音符奖励')
            if(tk && !tk.completed && hour > 13){
              let sps = await step_getdata();
              if(sps && sps.err_no == 0){                
                  // let spn = 0;
                  // for(let n=0;n<sps.data.stage_step_reward.length;n++){
                  //   if(sps.data.stage_step_reward[n].step>sps.data.today_step){
                  //     if(n<sps.data.stage_step_reward.length-1){
                  //       spn =RT(sps.data.stage_step_reward[n].step+10, sps.data.stage_step_reward[n+1].step-10)
                  //     }else{
                  //       spn =RT(sps.data.stage_step_reward[n].step, sps.data.stage_step_reward[n].step + 500)
                  //     }
                  //   }
                  // }
                  // if(spn>0){
                  //   await step_submit(spn);
                  //   await step_reward();
                  // }
                  if(sps.data.today_step < 10000){
                    await step_submit();
                    await $.wait(1000)
                    await step_reward();
                    await $.wait(1000)
                  }             
              }
            }

            // 限时任务 111
            tk = tks.data.task_list.find(p => p.profit_desc == '看视频赚海量金币')
            if (tk && !tk.completed) {
                let s1 = JSON.parse(tk.status_extra)
                if(s1 && !s1.completed && tk.action_desc == '去领取'){
                  await $.wait(RT(30000,40000))
                  await xxrw()
                  await $.wait(1000)
                }
            
            }

            if(tks.data.treasure_box.treasure_stats.cur_time>tks.data.treasure_box.treasure_stats.next_time){
              await watch_bx1()
              await $.wait(RT(30000,40000))
              await watch_bx2()
              // await $.wait(RT(30000,40000))
            }

            


            //await control()

            //await profit()

            // var ptime = new Date().getTime() + ""
            // if (i == 0) {
            //     $.setdata(ptime, `dyjsb_pretime`)
            // } else {
            //     $.setdata(ptime, `dyjsb_pretime${i}`)
            // }
            // if (yck >= 0) {
            //     await $.wait((yck - 4) * 1000)
            // }
            
            await showmsg();
        }
    }
})()
.catch((e) => $.logErr(e))
    .finally(() => $.done())

function GetCookie() {
    if ($request && $request.url.indexOf("aweme" && "sign_in") >= 0) {
        const signheader = $request.url.split(`?`)[1]
        if (signheader) $.setdata(signheader, `signheader${$.idx}`)
        $.log(`[${jsname}] 获取sign请求: 成功,signheader: ${signheader}`)
        $.msg(`获取signheader: 成功🎉`, ``)
        const signcookie = $request.headers['Cookie']
        if (signcookie) $.setdata(signcookie, `signcookie${$.idx}`)
        $.log(`[${jsname}] 获取sign请求: 成功,signcookie: ${signcookie}`)
        $.msg(`获取signcookie: 成功🎉`, ``)
    }
    if ($request && $request.url.indexOf("aweme" && "step_submit") >= 0) {
        const stepheader = $request.url.split(`?`)[1]
        if (stepheader) $.setdata(stepheader, `stepheader${$.idx}`)
        $.log(`[${jsname}] 获取step请求: 成功,stepheader: ${stepheader}`)
        $.msg(`获取stepheader: 成功🎉`, ``)
        const stepkey = JSON.stringify($request.headers)
        if (stepkey) $.setdata(stepkey, `stepkey${$.idx}`)
        $.log(`[${jsname}] 获取step请求: 成功,stepkey: ${stepkey}`)
        $.msg(`获取stepkey: 成功🎉`, ``)
    }
    if ($request && $request.url.indexOf("aweme" && "done/read") >= 0) {
        const readheader = $request.url.split(`?`)[1]
        if (readheader) $.setdata(readheader, `readheader${$.idx}`)
        $.log(`[${jsname}] 获取read请求: 成功,readheader: ${readheader}`)
        $.msg(`获取readheader: 成功🎉`, ``)
        const readkey = JSON.stringify($request.headers)
        if (readkey) $.setdata(readkey, `readkey${$.idx}`)
        $.log(`[${jsname}] 获取read请求: 成功,readkey: ${readkey}`)
        $.msg(`获取readkey: 成功🎉`, ``)
        const dyhost = $request.headers['Host']
        if (dyhost) $.setdata(dyhost, 'dyhost')

        $.log(`[${jsname}] 获取host请求: 成功,host: ${host}`)
    }
    if ($request && $request.url.indexOf("aweme" && "done/treasure_task") >= 0) {
        const readheader = $request.url.split(`?`)[1]
        if (readheader) $.setdata(readheader, `bx1header${$.idx}`)
        $.log(`[${jsname}] 获取bx1请求: 成功,bx1header: ${readheader}`)
        $.msg(`获取bx1header: 成功🎉`, ``)
        const readkey = JSON.stringify($request.headers)
        if (readkey) $.setdata(readkey, `bx1key${$.idx}`)
        $.log(`[${jsname}] 获取bx1请求: 成功,bx1key: ${readkey}`)
        $.msg(`获取bx1key: 成功🎉`, ``)
        const dyhost = $request.headers['Host']
        if (dyhost) $.setdata(dyhost, 'dyhost')
        $.log(`[${jsname}] 获取host请求: 成功,host: ${host}`)
    }
    if ($request && $request.url.indexOf("aweme" && "done/excitation_ad_treasure_box") >= 0) {
        const readheader = $request.url.split(`?`)[1]
        if (readheader) $.setdata(readheader, `bx2header${$.idx}`)
        $.log(`[${jsname}] 获取bx2请求: 成功,bx2header: ${readheader}`)
        $.msg(`获取bx2header: 成功🎉`, ``)
        const readkey = JSON.stringify($request.headers)
        if (readkey) $.setdata(readkey, `bx2key${$.idx}`)
        $.log(`[${jsname}] 获取bx2请求: 成功,bx2key: ${readkey}`)
        $.msg(`获取bx2key: 成功🎉`, ``)
        const dyhost = $request.headers['Host']
        if (dyhost) $.setdata(dyhost, 'dyhost')
        $.log(`[${jsname}] 获取host请求: 成功,host: ${host}`)
    }

    if ($request && $request.url.indexOf("aweme" && "/task/page?") >= 0) {
        const readheader = $request.url.split(`?`)[1]
        if (readheader) $.setdata(readheader, `dyjsb_taskheader${$.idx}`)
        $.log(`[${jsname}] 获取task请求: 成功,taskheader: ${readheader}`)
        $.msg(`获取taskheader: 成功🎉`, ``)
        const readkey = JSON.stringify($request.headers)
        if (readkey) $.setdata(readkey, `dyjsb_taskkey${$.idx}`)
        $.log(`[${jsname}] 获取task请求: 成功,taskkey: ${readkey}`)
        $.msg(`获取taskkey: 成功🎉`, ``)
        const dyhost = $request.headers['Host']
        if (dyhost) $.setdata(dyhost, 'dyhost')
        $.log(`[${jsname}] 获取host请求: 成功,host: ${host}`)
    }

    if ($request && $request.url.indexOf("aweme" && "/task/done/excitation_ad?") >= 0) {
        const readheader = $request.url.split(`?`)[1]
        if (readheader) $.setdata(readheader, `dyjsb_xxheader${$.idx}`)
        $.log(`[${jsname}] 获取xx请求: 成功,xxheader: ${readheader}`)
        $.msg(`获取xxheader: 成功🎉`, ``)
        const readkey = JSON.stringify($request.headers)
        if (readkey) $.setdata(readkey, `dyjsb_xxkey${$.idx}`)
        $.log(`[${jsname}] 获取xx请求: 成功,xxkey: ${readkey}`)
        $.msg(`获取xxkey: 成功🎉`, ``)
        const dyhost = $request.headers['Host']
        if (dyhost) $.setdata(dyhost, 'dyhost')
        $.log(`[${jsname}] 获取host请求: 成功,host: ${host}`)
    }

    if ($request && $request.url.indexOf("aweme" && "/task/walk/page?") >= 0) {
        const walkheader = $request.url.split(`?`)[1]
        if (walkheader) $.setdata(walkheader, `walkheader${$.idx}`)
        $.log(`[${jsname}] 获取walk请求: 成功,walkheader: ${walkheader}`)
        $.msg(`获取walkheader: 成功🎉`, ``)
        const walkkey = JSON.stringify($request.headers)
        if (walkkey) $.setdata(walkkey, `walkkey${$.idx}`)
        $.log(`[${jsname}] 获取walk请求: 成功,walkkey: ${walkkey}`)
        $.msg(`获取walkkey: 成功🎉`, ``)
    }

}
async function control() {
    if (stepheader && hour == 12 && minute <= 30) {
        await step_submit();
        await step_reward();
    }
    if (invite == 1) {
        await invitation();
    }
    coins = 0
    if (cash == 1) {
        if (dyjsbaccount || dyjsbzcaccount) {
            await profit()
        }
    }
    if (cash == 1 && coins >= 30) {
        await withdraw()
    }
}

//任务列表
function tasklist() {
    return new Promise((resolve, reject) => {
        let profiturl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/page?${taskheader}`,
            headers: JSON.parse(taskkey),
        }
        $.get(profiturl, async (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            resolve(result)
        })
    })
}

//签到
function sign_in() {
    return new Promise((resolve, reject) => {
        let sign_inurl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/sign_in?${signheader}`,
            headers: {
                Cookie: signcookie,
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.12 (KHTNL, like Gecko) Mobile/15E148'
            }
        }
        $.post(sign_inurl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣签到\n'
            if (result.err_no == 10006) {
                message += result.err_tips + '\n'
            } else {
                message += '⚠️异常' + result.err_tips + '\n'
            }
            resolve()
        })
    })
}
//获取走路信息
function step_getdata(){
  return new Promise((resolve, reject) => {
        let step_rewardurl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/walk/page?${stepheader}`,
            headers: JSON.parse(stepkey)
        }
        $.get(step_rewardurl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣获取步数\n'
            if (result.err_no == 0) {
                message += result.err_tips + "今日步数:" + result.data.today_step + '\n'
            } else {
                message += '⚠️异常' + result.err_tips + '\n'
            }
            resolve(result)
        })
    })
}
//提交步数
function step_submit() {
    const steps = Math.round(Math.random() * (11000 - 10001) + 10001);
    // const steps = spn
    const time = Math.round(new Date().getTime() / 1000).toString();
    return new Promise((resolve, reject) => {
        let step_submiturl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/walk/step_submit?${stepheader}`,
            headers: JSON.parse(stepkey),
            body: `{"step" : ${steps}, "submit_time" :${time}, "in_sp_time" : 0}`
        }

        $.post(step_submiturl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣提交步数\n'
            if (result.err_no == 0) {
                message += result.err_tips + "今日步数:" + result.data.today_step + '\n'
            } else {
                message += '⚠️异常' + result.err_tips + '\n'
            }
            resolve()
        })
    })
}
//获取走路金币
function step_reward() {
    return new Promise((resolve, reject) => {
        let step_rewardurl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/walk/receive_step_reward?${stepheader}`,
            headers: JSON.parse(stepkey),
            body: `{"in_sp_time":0}`
        }
        $.post(step_rewardurl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣获取奖励\n'
            if (result.err_no == 0) {
                message += result.err_tips + "获得:" + result.data.reward_amount + '\n'
            } else {
                message += '⚠️异常' + result.err_tips + '\n'
            }
            resolve()
        })
    })
}
//看视频
function watch_video() {
    return new Promise((resolve, reject) => {
        let watch_videourl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/read?${readheader}`,
            headers: JSON.parse(readkey),
            body: `{"in_sp_time" : 0, "task_key" : "read"}`
        }
        $.post(watch_videourl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣看视频\n'
            if (result.err_no == 0) {
                $.log('看视频OK')
                message += '🎉' + result.err_tips + '获得:' + result.data.score_amount + "\n"
            } else if (result.err_no == 10006) {
                $.log('看视频Error')
                message += '⚠️异常:已经读过了\n'
            } else {
                $.log('看视频Error')
                message += '⚠️异常:' + result.err_tips + '\n' + '请重新获取readkey\n'
                let other = '⚠️异常:' + result.err_tips + '请重新获取readkey\n'
                $.msg(jsname, '', other)
            }
            resolve()
        })
    })
}
//时段宝箱1
function watch_bx1() {
    return new Promise((resolve, reject) => {
        let watch_videourl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/treasure_task?${bx1header}`,
            headers: JSON.parse(bx1key),
            body: `{ "in_sp_time" : 0 }`
        }
        $.post(watch_videourl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣时段宝箱1\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + '获得:' + result.data.amount + "\n"
            } else if (result.err_no == 10006) {
                message += '⚠️异常:已经读过了\n'
            } else {
                message += '⚠️异常:' + result.err_tips + '\n' + '请重新获取bx1key\n'
                let other = '⚠️异常:' + result.err_tips + '请重新获取bx1key\n'
                $.msg(jsname, '', other)
            }
            resolve()
        })
    })
}
//时段宝箱2
function watch_bx2() {
    return new Promise((resolve, reject) => {
        let watch_videourl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/excitation_ad_treasure_box?${bx2header}`,
            headers: JSON.parse(bx2key),
            body: ``
        }
        $.post(watch_videourl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣时段宝箱2\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + '获得:' + result.data.amount + "\n"
            } else if (result.err_no == 10006) {
                message += '⚠️异常:已经读过了\n'
            } else {
                message += '⚠️异常:' + result.err_tips + '\n' + '请重新获取bx2key\n'
                let other = '⚠️异常:' + result.err_tips + '请重新获取bx2key\n'
                $.msg(jsname, '', other)
            }
            resolve()
        })
    })
}


//限时任务
function xxrw() {
    return new Promise((resolve, reject) => {
        let watch_videourl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/excitation_ad?${xxheader}`,
            headers: JSON.parse(xxkey),
            body: ``
        }
        $.post(watch_videourl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            message += '📣限时任务\n'
            if (result.err_no == 0) {
                message += '🎉' + result.err_tips + '获得:' + result.data.amount + "\n"
            } else if (result.err_no == 10006) {
                message += '⚠️异常:已经读过了\n'
            } else {
                message += '⚠️异常:' + result.err_tips + '\n' + '请重新获取xxkey\n'
                let other = '⚠️异常:' + result.err_tips + '请重新获取xxkey\n'
                $.msg(jsname, '', other)
            }
            resolve()
        })
    })
}


function invitation() {
    return new Promise((resolve, reject) => {
        let invitatonurl = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/post_invite_code?${signheader}`,
            headers: JSON.parse(readkey),
            body: JSON.stringify({ "in_sp_time": 0, "invite_code": "8507344418" })
        }

        $.post(invitatonurl, (error, response, data) => {
            const result = JSON.parse(data)
            resolve()
        })
    })
}
//profit page
function profit() {
    return new Promise((resolve, reject) => {
        let profiturl = {
            url: `https://${dyhost}/luckycat/aweme/v1/wallet/profit_detail_page?income_type=1&offset=0&num=50&share_page=profits_detail_page&key=coin&${readheader}`,
            headers: JSON.parse(readkey),
        }
        $.get(profiturl, async (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            let time = Math.round(new Date(new Date().toLocaleDateString()).getTime() / 1000)
            coins = result.data.income_data.cash_balance
            resolve()
        })
    })
}
//withdraw alipay 0.3
function withdraw() {
    return new Promise((resolve, reject) => {
        let withdrawurl = {
            url: `https://${dyhost}/luckycat/aweme/v1/wallet/take_cash?task_key=jiao_take_cash&${signheader}`,
            headers: JSON.parse(readkey),
            body: `{ "account" : "${dyjsbzcaccount}", "take_cash_type" : 3, "tab_type" : "alipay", "in_sp_time" : 0, "cash_amount" : -30, "name" : "${dyjsbzcname}"}`
        }

        $.post(withdrawurl, (error, response, data) => {
            const result = JSON.parse(data)
            if (logs) $.log(data)
            if (result.err_no == 0) {
                console.log(result.err_tips + '提现0.3元\n')
                message += result.err_tips + '提现0.3元\n'
            } else {
                console.log(result.err_tips)
            }
            resolve()
        })
    })
}
async function showmsg() {
    if (tz == 1) {
        if ($.isNode()) {
            if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
                await notify.sendNotify($.name, message)
            } else {
                $.log(message)
            }
        } else {
            if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
                $.msg(jsname, '', message)
            } else {
                $.log(message)
            }
        }
    } else {
        $.log(message)
    }
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch {}
            return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } };
                this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => {})) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => {!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t;
                e(s, i, i && i.body) })) } post(t, e = (() => {})) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => {!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t));
            else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t;
                this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                    e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t;
                    e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
