!(async ()=>{    
    var sleep = (ms) => {
      // Unit is ms
      return new Promise(resolve => setTimeout(resolve, ms))
    }
    var msgs = []
    var msg = (m)=>{
        msgs.push(m)
        if(msgs.length>5){
            msgs.shift()
        }        
        document.querySelector('#zcjd').innerHTML = msgs.join('<br>')
    }
    
    await sleep(10000)

    var zcjd = document.createElement('div')
    zcjd.id = "zcjd"
    zcjd.style.position="absolute"
    zcjd.style.backgroundColor="#fff"
    zcjd.style.color="#000"
    zcjd.style.top=0
    zcjd.style.width="100%"
    zcjd.style.height="500px"
    // zcjd.style.fontSize="12px"
    // zcjd.style.lineHeight="14px"
    zcjd.style.padding="5px"
    zcjd.style.boxSizing="border-box"
    zcjd.style.overflow="hidden"
    document.querySelector('body').appendChild(zcjd);

    msg(location.href)
    var btn1 = document.querySelector('.home-btn-task')
    if(btn1){
        msg('点击任务按钮')
       btn1.click() 
    }else{
        msg('未找到任务按钮')
    }

    await sleep(2000)
    msg('开始任务')
    var hastask = true
    var loopnum = 0
    while(hastask && loopnum<100){
        hastask = false
        loopnum++
        msg('第' + loopnum + '遍开始任务')
        var task = document.querySelectorAll('.home_task_panel_list')

        for(var i=0;i<task.length;i++){
            var text = task[i].innerText
            msg(text)
            if(text.indexOf('邀请')!=-1){
                continue;
            }
            if(text.indexOf('浏览并关注8s')!=-1){
                var b1 = task[i].querySelector('.task_panel_btn')
                if(b1.className.indexOf('jmdd_react_task_panel_list_btn_done')!=-1){
                    continue
                }
                b1.click()
                await sleep(10000)
                hastask=true
                history.go(-1)
            }
            if(text.indexOf('浏览8S')!=-1){
                var b1 = task[i].querySelector('.task_panel_btn')
                if(b1.className.indexOf('jmdd_react_task_panel_list_btn_done')!=-1){
                    continue
                }
                b1.click()
                await sleep(10000)
                hastask=true
                history.go(-1)
            }
            if(text.indexOf('去浏览')!=-1){
                var b1 = task[i].querySelector('.task_panel_btn')
                if(b1.className.indexOf('jmdd_react_task_panel_list_btn_done')!=-1){
                    continue
                }
                b1.click()
                await sleep(10000)
                hastask=true
                history.go(-1)
            }
            if(text.indexOf('浏览可得')!=-1){
                var b1 = task[i].querySelector('.task_panel_btn')
                if(b1.className.indexOf('jmdd_react_task_panel_list_btn_done')!=-1){
                    continue
                }
                b1.click()
                await sleep(3000)
                hastask=true
                history.go(-1)
            }
        }
    }
})()
